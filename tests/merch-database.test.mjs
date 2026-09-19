import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

test('merch accounts, private drafts, validated checkout and consent-gated email queue', async () => {
  const db = new PGlite()
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key, email text, raw_user_meta_data jsonb, email_confirmed_at timestamptz);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema public, auth to anon,authenticated,service_role;
      grant execute on function auth.uid() to anon,authenticated,service_role;
    `)
    await db.exec(await readFile(new URL('../supabase/migrations/202609190001_merch_store.sql',import.meta.url),'utf8'))
    const alice = '11111111-1111-4111-8111-111111111111'
    const bob = '22222222-2222-4222-8222-222222222222'
    const unverified = '33333333-3333-4333-8333-333333333333'
    for (const [id,email,verified,notify] of [[alice,'alice@example.test',true,true],[bob,'bob@example.test',true,false],[unverified,'pending@example.test',false,true]]) {
      await db.query('insert into auth.users values ($1,$2,$3,$4)',[id,email,JSON.stringify({display_name:'Test Customer',notify_on_launch:notify}),verified ? new Date().toISOString() : null])
    }
    const delivery = {fullName:'Test Customer',phone:'+27 81 409 3805',street:'1 Example Road',apartment:'',city:'Sandton',province:'Gauteng',postalCode:'2196'}
    const items = [{productId:'signature-tee-black',size:'M',quantity:2,price:1,paid:true}]
    async function as(role,id='') { await db.exec('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]); await db.exec(`set role ${role}`) }
    await as('authenticated',alice)
    assert.equal((await db.query('select * from public.merch_profiles')).rows.length,1)
    await db.query('select public.save_merch_checkout($1,$2,$3)',[JSON.stringify(items),JSON.stringify(delivery),true])
    const draft = (await db.query('select * from public.merch_checkout_drafts')).rows[0]
    assert.equal(draft.user_id,alice)
    assert.deepEqual(draft.items,[{productId:'signature-tee-black',size:'M',quantity:2}])
    await assert.rejects(db.query('select public.save_merch_checkout($1,$2,true)',[JSON.stringify([{...items[0],quantity:-2}]),JSON.stringify(delivery)]))
    await assert.rejects(db.query('select public.save_merch_checkout($1,$2,true)',[JSON.stringify([{...items[0],productId:'fake'}]),JSON.stringify(delivery)]))
    await assert.rejects(db.query('select public.save_merch_checkout($1,$2,true)',[JSON.stringify(items),JSON.stringify({...delivery,postalCode:'invalid'})]))
    await assert.rejects(db.query('select public.claim_merch_launch_notifications()'))
    await as('authenticated',bob)
    assert.equal((await db.query('select * from public.merch_checkout_drafts')).rows.length,0)
    assert.equal((await db.query('update public.merch_profiles set notify_on_launch=false where user_id=$1 returning *',[alice])).rows.length,0)
    await assert.rejects(db.query('update public.merch_checkout_drafts set items=$1',[JSON.stringify(items)]))
    await as('authenticated',unverified)
    await assert.rejects(db.query('select public.save_merch_checkout($1,$2,true)',[JSON.stringify(items),JSON.stringify(delivery)]))
    await as('anon')
    await assert.rejects(db.query('select * from public.merch_profiles'))
    await assert.rejects(db.query('select public.save_merch_checkout($1,$2,true)',[JSON.stringify(items),JSON.stringify(delivery)]))
    await as('service_role')
    const queue = (await db.query('select * from public.claim_merch_launch_notifications()')).rows
    assert.deepEqual(queue,[{user_id:alice,email:'alice@example.test'}])
    assert.equal((await db.query('select * from public.claim_merch_launch_notifications()')).rows.length,0,'in-flight notifications are not claimed twice')
    await db.query('update public.merch_launch_notifications set sent_at=now() where user_id=$1',[alice])
    assert.equal((await db.query('select * from public.claim_merch_launch_notifications()')).rows.length,0,'sent notifications are not resent')
  } finally { await db.close() }
})
