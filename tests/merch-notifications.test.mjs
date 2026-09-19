import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

test('launch sender refuses unauthorized or premature sending and honours consent', async () => {
  const env = { LAUNCH_NOTIFY_SECRET: 'test-secret-with-at-least-32-characters', MERCH_CHECKOUT_LIVE: 'false', RESEND_API_KEY: 'mock-key', MERCH_EMAIL_FROM: 'store@example.test', MERCH_STORE_URL: 'https://example.test/c1/merch' }
  let handler
  let queries = 0
  let emails = 0
  let marked = false
  let consent = true
  let providerOk = true
  const originalFetch = globalThis.fetch
  globalThis.Deno = { env: { get: key => env[key] }, serve: callback => { handler = callback } }
  globalThis.__merchTestClient = {
    rpc: async () => { queries++; return { data: [{ user_id: 'test-user', email: 'test@example.test' }], error: null } },
    from: () => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: { notify_on_launch: consent }, error: null }) }) }),
      update: () => ({ eq: async () => { marked = true; return { error: null } } }),
    }),
  }
  globalThis.fetch = async (_url, options) => {
    emails++
    assert.equal(options.headers['Idempotency-Key'], 'kpmlxr-yoco-launch-v1-test-user')
    return Response.json(providerOk ? { id: 'mock-delivery' } : { error: 'Unavailable' }, { status: providerOk ? 200 : 503 })
  }
  try {
    // Run the actual Edge handler with isolated Auth/database/email adapters.
    const source = (await readFile(new URL('../supabase/functions/notify-merch-launch/index.ts', import.meta.url), 'utf8'))
      .replace(/import \{ createClient \} from 'npm:[^']+'/, 'const createClient = () => globalThis.__merchTestClient')
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
    await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
    const request = authorized => new Request('https://example.test/notify', { method: 'POST', headers: authorized ? { 'x-launch-secret': env.LAUNCH_NOTIFY_SECRET } : {} })
    assert.equal((await handler(request(false))).status, 401)
    assert.equal((await handler(request(true))).status, 409)
    assert.equal(queries, 0)
    assert.equal(emails, 0, 'coming-soon mode must never send an email')
    env.MERCH_CHECKOUT_LIVE = 'true'
    consent = false
    await handler(request(true))
    assert.equal(emails, 0, 'withdrawn consent must be respected')
    consent = true
    assert.equal((await handler(request(true))).status, 200)
    assert.equal(emails, 1)
    assert.equal(marked, true)
    providerOk = false
    marked = false
    assert.equal((await handler(request(true))).status, 502)
    assert.equal(marked, false, 'failed delivery must remain retryable')
  } finally {
    globalThis.fetch = originalFetch
    delete globalThis.Deno
    delete globalThis.__merchTestClient
  }
})
