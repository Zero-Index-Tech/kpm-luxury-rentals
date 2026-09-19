# KPMLXR merch store

The store is available under `/c1/merch`, `/c2/merch` and `/c3/merch`. All concepts share the same eight products and browser bag. Product images and the Yoco logo come from `public/merch`. Prices are the preview prices already present in the project; confirm prices, sizing, stock, shipping and returns before taking payments.

## Enable registration and saved checkout

1. Create or select a Supabase project. Run `supabase/migrations/202609190001_merch_store.sql` in its SQL Editor, or link the CLI project and run `supabase db push`.
2. Copy `.env.example` to `.env.local`. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the project's API settings. Never put a service-role key in a `VITE_` variable. Add the same public variables to your hosting environment.
3. Enable email authentication and configure production SMTP in Supabase. Set the deployed website as the Site URL. Allow these redirect URLs for each deployed origin and the local development origin: `/c1/merch/account`, `/c2/merch/account`, `/c3/merch/account`, including the `?next=checkout` variants. For development, the Vite port is 3000.
4. Use the email magic-link template containing `{{ .ConfirmationURL }}`. Registration/sign-in emails are sent by Supabase. New users must follow the email link before saving a checkout. Existing users can use the Sign in tab. No password is collected by this site.
5. Restart the dev server, or rebuild and deploy. Verify registration, delivery of a real email, the return link, saving a checkout, signing out, and restoring the bag after signing in on a different browser.

Without these settings, the catalogue and bag work and the account page explicitly says registration is not available. It never pretends to create an account. Addresses are stored only in Supabase; browser storage contains product IDs, sizes and quantities, plus the Supabase-managed login session.

## Payment launch notifications

Registration and checkout have an unchecked, explicit opt-in to one Yoco launch email. Customers can change it in My account. The profile records the consent timestamp. Saving checkout and updating the email preference is one database transaction. Unverified users are never selected for launch emails.

The server-only `notify-merch-launch` Edge Function uses Resend to deliver the email. It is dormant until activated. Set these **server secrets** with the Supabase dashboard or CLI:

- `RESEND_API_KEY`: email provider key, with a verified sending domain.
- `MERCH_EMAIL_FROM`: approved sender, such as `KPMLXR <store@your-domain>`.
- `MERCH_STORE_URL`: deployed HTTPS merch-store URL.
- `LAUNCH_NOTIFY_SECRET`: a random secret of at least 32 characters, used only by your server/scheduler.
- `MERCH_CHECKOUT_LIVE`: leave unset or `false` until a real Yoco checkout is deployed and tested.

Deploy using `supabase functions deploy notify-merch-launch`. The included function config disables Supabase JWT verification because the function requires its own private `x-launch-secret` header; it accepts POST only. The service-role key supplied by Supabase stays in the function environment.

When real payments are ready, set `MERCH_CHECKOUT_LIVE=true` and invoke or schedule POST requests to `/functions/v1/notify-merch-launch` with the `x-launch-secret` header. It claims up to 20 verified, opted-in recipients at a time, uses locked claims to prevent concurrent duplicates, uses a fixed provider idempotency key per recipient, and records successful delivery. Retries wait for a ten-minute claim expiry and stop after five attempts. Inspect failed rows before resetting attempts; reconcile provider deliveries before retrying outside its idempotency window. Do not activate this during the coming-soon stage.

## Real Yoco payments — future activation

The current checkout deliberately has no card inputs, payment endpoint, paid-order status or active Pay button. Saving a checkout is a draft, not an order or stock reservation. Yoco is labelled “coming online soon” throughout.

Before activation, implement server-created Yoco checkouts using authoritative product prices and stock, server-calculated delivery, verified payment webhooks, idempotent order fulfilment and payment failure/cancellation screens. Keep the Yoco secret key on the server. Remove the coming-soon state only when that flow works; then enable the launch-email sender.

## Validation

`npm run test:merch` covers cart input validation, variant merging, totals, PostgreSQL migrations, profile isolation, draft isolation, malformed checkout rejection and the notification queue. The database tests run in isolated PGlite with a minimal Supabase Auth schema; they do not contact a real project. `npm run build` checks the app. Real email delivery and deployed Supabase integration still need verification with the owner's project.

Implementation references: [Supabase email authentication](https://supabase.com/docs/guides/auth/auth-email-passwordless), [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security), and [sending emails from Edge Functions](https://supabase.com/docs/guides/functions/examples/send-emails).
