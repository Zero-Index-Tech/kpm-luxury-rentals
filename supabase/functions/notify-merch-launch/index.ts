// Server-only. Invoke/schedule only after real Yoco checkout has been deployed.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { timingSafeEqual } from 'node:crypto'

Deno.serve(async request => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const expected = Deno.env.get('LAUNCH_NOTIFY_SECRET') ?? ''
  const supplied = request.headers.get('x-launch-secret') ?? ''
  const encoder = new TextEncoder()
  if (expected.length < 32 || encoder.encode(expected).length !== encoder.encode(supplied).length || !timingSafeEqual(encoder.encode(expected),encoder.encode(supplied))) return new Response('Unauthorized', { status: 401 })
  if (Deno.env.get('MERCH_CHECKOUT_LIVE') !== 'true') return new Response('Checkout is not live. No emails sent.', { status: 409 })
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const from = Deno.env.get('MERCH_EMAIL_FROM')
  const storeUrl = Deno.env.get('MERCH_STORE_URL')
  if (!apiKey || !from || !storeUrl || !/^https:\/\//.test(storeUrl)) return new Response('Email configuration incomplete', { status: 503 })
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data, error } = await client.rpc('claim_merch_launch_notifications')
  if (error) return new Response('Could not claim notifications', { status: 500 })
  let sent = 0
  let failed = 0
  for (const row of data ?? []) {
    try {
      // Recheck consent immediately before sending; never email an unverified user.
      const { data: profile, error: profileError } = await client.from('merch_profiles').select('notify_on_launch').eq('user_id',row.user_id).single()
      if (profileError) throw profileError
      if (!profile?.notify_on_launch) continue
      const response = await fetch('https://api.resend.com/emails', {
        method:'POST', headers: { Authorization:`Bearer ${apiKey}`, 'Content-Type':'application/json', 'Idempotency-Key':`kpmlxr-yoco-launch-v1-${row.user_id}` },
        body:JSON.stringify({ from, to:[row.email], subject:'Your next arrival is ready — KPMLXR payments are live',
          text:`You asked us to let you know when Yoco payments go live. You can now return to the KPMLXR merch store, review your saved bag and complete checkout.\n\n${storeUrl}\n\nPrices, delivery and availability will be confirmed at checkout. Your saved bag was not an order and no payment has been taken.\n\nThis is the one-time launch update you requested. You can manage your email preference in My account.\n\nKPMLXR · Luxury in Motion.`,
        }),
      })
      if (!response.ok) throw new Error('Email provider rejected request')
      const result = await response.json()
      const { error: markError } = await client.from('merch_launch_notifications').update({sent_at:new Date().toISOString(),provider_id:result.id,claimed_until:null}).eq('user_id',row.user_id)
      if (markError) throw markError
      sent++
    } catch { failed++ } // No email addresses or credentials in logs/responses.
    await new Promise(resolve => setTimeout(resolve,600))
  }
  return Response.json({ sent,failed },{status:failed ? 502 : 200})
})
