-- Merch prelaunch accounts and saved checkout drafts. No paid orders are created.
create table public.merch_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 100),
  notify_on_launch boolean not null default false,
  notification_requested_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.merch_checkout_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 100),
  delivery jsonb not null check (jsonb_typeof(delivery) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.merch_profiles enable row level security;
alter table public.merch_checkout_drafts enable row level security;
revoke all on public.merch_profiles, public.merch_checkout_drafts from anon, authenticated;
grant select on public.merch_profiles, public.merch_checkout_drafts to authenticated;
grant select on public.merch_profiles to service_role;
grant update (display_name, notify_on_launch) on public.merch_profiles to authenticated;
create policy "Read own merch profile" on public.merch_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "Update own merch preferences" on public.merch_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Read own checkout" on public.merch_checkout_drafts for select to authenticated using ((select auth.uid()) = user_id);

create function public.create_merch_profile() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.merch_profiles(user_id, display_name, notify_on_launch, notification_requested_at)
  values (new.id, left(coalesce(new.raw_user_meta_data->>'display_name', ''), 100),
    coalesce(new.raw_user_meta_data->>'notify_on_launch', 'false') = 'true',
    case when new.raw_user_meta_data->>'notify_on_launch' = 'true' then now() end);
  return new;
end;
$$;
revoke all on function public.create_merch_profile() from public, anon, authenticated;
create trigger on_merch_user_created after insert on auth.users for each row execute function public.create_merch_profile();
-- Existing users may sign in to the merch store too. Never opt them in implicitly.
insert into public.merch_profiles(user_id, display_name)
select id, left(coalesce(raw_user_meta_data->>'display_name', ''),100) from auth.users on conflict do nothing;

create function public.track_merch_notification_consent() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.notify_on_launch is distinct from old.notify_on_launch then
    new.notification_requested_at := case when new.notify_on_launch then now() else null end;
  end if;
  return new;
end;
$$;
create trigger track_merch_consent before update on public.merch_profiles for each row execute function public.track_merch_notification_consent();

create function public.save_merch_checkout(p_items jsonb, p_delivery jsonb, p_notify boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  item jsonb;
  field_name text;
begin
  if owner_id is null or not exists (select 1 from auth.users where id = owner_id and email_confirmed_at is not null) then
    raise exception 'A verified account is required';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 100 then raise exception 'Invalid bag'; end if;
  for item in select * from jsonb_array_elements(p_items) loop
    if jsonb_typeof(item) <> 'object' or
       coalesce(item->>'productId','') not in ('signature-tee-black','worldwide-tee-sand','drive-different-tee','core-tracksuit-black','core-tracksuit-sand','signature-hoodie','signature-cap','crossbody-bag') or
       coalesce(item->>'quantity','') !~ '^([1-9]|10)$' then raise exception 'Invalid bag item'; end if;
    if item->>'productId' in ('signature-cap','crossbody-bag') then
      if coalesce(item->>'size','') <> 'One size' then raise exception 'Invalid size'; end if;
    elsif coalesce(item->>'size','') not in ('XS','S','M','L','XL','XXL') then raise exception 'Invalid size'; end if;
  end loop;
  if p_delivery is null or jsonb_typeof(p_delivery) <> 'object' then raise exception 'Invalid delivery details'; end if;
  foreach field_name in array array['fullName','phone','street','city','province','postalCode'] loop
    if char_length(trim(coalesce(p_delivery->>field_name,''))) not between 1 and 160 then raise exception 'Missing or invalid delivery field'; end if;
  end loop;
  if coalesce(p_delivery->>'postalCode','') !~ '^[0-9]{4}$' or
     coalesce(p_delivery->>'phone','') !~ '^\+?[0-9 ()-]{9,20}$' or
     coalesce(p_delivery->>'province','') not in ('Eastern Cape','Free State','Gauteng','KwaZulu-Natal','Limpopo','Mpumalanga','Northern Cape','North West','Western Cape') or
     char_length(coalesce(p_delivery->>'apartment','')) > 160 then raise exception 'Invalid delivery details'; end if;
  -- Persist only validated fields. Client prices, totals or payment flags are never stored.
  insert into public.merch_checkout_drafts(user_id, items, delivery) values (
    owner_id,
    (select jsonb_agg(jsonb_build_object('productId',x->>'productId','size',x->>'size','quantity',(x->>'quantity')::int)) from jsonb_array_elements(p_items) x),
    jsonb_build_object('fullName',p_delivery->>'fullName','phone',p_delivery->>'phone','street',p_delivery->>'street','apartment',coalesce(p_delivery->>'apartment',''),'city',p_delivery->>'city','province',p_delivery->>'province','postalCode',p_delivery->>'postalCode')
  ) on conflict (user_id) do update set items = excluded.items, delivery = excluded.delivery, updated_at = now();
  update public.merch_profiles set notify_on_launch = coalesce(p_notify,false) where user_id = owner_id;
end;
$$;
revoke all on function public.save_merch_checkout(jsonb,jsonb,boolean) from public, anon;
grant execute on function public.save_merch_checkout(jsonb,jsonb,boolean) to authenticated;

-- A private outbox for the future launch email. Not accessible from the browser.
create table public.merch_launch_notifications (
  user_id uuid primary key references auth.users(id) on delete cascade,
  sent_at timestamptz,
  claimed_until timestamptz,
  attempts integer not null default 0,
  provider_id text
);
alter table public.merch_launch_notifications enable row level security;
revoke all on public.merch_launch_notifications from public, anon, authenticated;
grant all on public.merch_launch_notifications to service_role;

create function public.claim_merch_launch_notifications() returns table(user_id uuid,email text)
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.merch_launch_notifications(user_id)
  select p.user_id from public.merch_profiles p join auth.users u on u.id=p.user_id
  where p.notify_on_launch and u.email_confirmed_at is not null
  on conflict do nothing;
  return query
  with batch as (
    select q.user_id from public.merch_launch_notifications q
    join public.merch_profiles p on p.user_id=q.user_id
    join auth.users u on u.id=q.user_id
    where q.sent_at is null and q.attempts < 5 and (q.claimed_until is null or q.claimed_until < now())
      and p.notify_on_launch and u.email_confirmed_at is not null
    order by q.user_id for update of q skip locked limit 20
  ), claimed as (
    update public.merch_launch_notifications q set claimed_until=now()+interval '10 minutes', attempts=attempts+1
    from batch b where q.user_id=b.user_id returning q.user_id
  ) select c.user_id,u.email::text from claimed c join auth.users u on u.id=c.user_id;
end;
$$;
revoke all on function public.claim_merch_launch_notifications() from public, anon, authenticated;
grant execute on function public.claim_merch_launch_notifications() to service_role;
