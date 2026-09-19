import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Bell, CheckCircle2, Mail, UserRound } from 'lucide-react'
import ShopShell from './ShopShell'
import { useShopBase } from './useShopBase'
import { useStore } from './context'
import { supabase } from './supabase'
import YocoNotice from './YocoNotice'

export default function Account() {
  const { user } = useStore()
  return <AccountPanel key={user?.id ?? 'guest'} />
}

function AccountPanel() {
  const { user, authReady, authError, replaceCart } = useStore()
  const base = useShopBase()
  const [params] = useSearchParams()
  const [mode, setMode] = useState<'register' | 'signin'>('register')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [notify, setNotify] = useState(false)
  const [profileReady, setProfileReady] = useState(false)
  const [name, setName] = useState('')
  const next = params.get('next') === 'checkout' ? `${base}/checkout` : base

  useEffect(() => {
    if (!user || !supabase) return
    let active = true
    supabase.from('merch_profiles').select('display_name, notify_on_launch').eq('user_id', user.id).single().then(({ data, error: profileError }) => {
      if (!active) return
      if (profileError) { setError('Your account preferences could not be loaded. Please refresh to retry.'); return }
      setName(data.display_name); setNotify(data.notify_on_launch); setProfileReady(true)
    })
    return () => { active = false }
  }, [user])

  async function requestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || busy) return
    const form = new FormData(event.currentTarget)
    setBusy(true); setError(''); setMessage('')
    try {
      const { error: authFailure } = await supabase.auth.signInWithOtp({
        email: String(form.get('email')).trim(),
        options: { shouldCreateUser: mode === 'register', emailRedirectTo: `${window.location.origin}${base}/account${params.get('next') === 'checkout' ? '?next=checkout' : ''}`,
          ...(mode === 'register' ? { data: { display_name: String(form.get('name')).trim(), notify_on_launch: notify } } : {}),
        },
      })
      if (authFailure) throw authFailure
      setMessage('Check your email for a secure sign-in link. Follow it to verify your email and open your account. If no email arrives, try again in a minute or contact us.')
    } catch { setError('We couldn’t send the email link. Please wait a minute and try again. If you are new here, use Create account.') }
    finally { setBusy(false) }
  }
  async function savePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || !user || busy) return
    setBusy(true); setError(''); setMessage('')
    try {
      const { error: saveError } = await supabase.from('merch_profiles').update({ display_name: name.trim(), notify_on_launch: notify }).eq('user_id', user.id)
      if (saveError) throw saveError
      setMessage(notify ? 'Preferences saved. You’re on the list for the Yoco launch email.' : 'Preferences saved. Launch emails are switched off.')
    } catch { setError('Your preferences were not saved. Please try again.') } finally { setBusy(false) }
  }
  async function restoreBag() {
    if (!supabase || !user) return
    setBusy(true); setError(''); setMessage('')
    try {
      const { data, error: draftError } = await supabase.from('merch_checkout_drafts').select('items').eq('user_id', user.id).maybeSingle()
      if (draftError) throw draftError
      if (!data) { setMessage('You haven’t saved a checkout yet. Explore the collection to start your bag.'); return }
      replaceCart(data.items); setMessage('Your saved bag has been restored on this device.')
    } catch { setError('Your saved bag could not be loaded. Please try again.') } finally { setBusy(false) }
  }
  async function signOut() {
    if (!supabase) return
    setBusy(true)
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
    } catch { setError('Sign out failed. Please try again.') } finally { setBusy(false) }
  }

  return <ShopShell><section className="shop-container shop-page shop-account-grid"><div className="shop-account-intro"><p className="shop-kicker">A LITTLE CLOSER TO THE COLLECTION</p><h1>Your world.<br /><em>Your KPMLXR.</em></h1><p>Create your merch account, save your checkout and be ready for the first drop.</p><ul><li><UserRound size={20} />Your own place in the collection.</li><li><Mail size={20} />Secure email sign-in. No password to remember.</li><li><Bell size={20} />An optional email when Yoco payments open.</li></ul><YocoNotice /></div>
    <div className="shop-form-panel">
      {!authReady ? <p role="status">Opening your account…</p> : user ? <><p className="shop-kicker">MY ACCOUNT</p><h2>Welcome{profileReady && name ? `, ${name.split(' ')[0]}` : ''}.</h2><p className="shop-account-email">{user.email}</p><form onSubmit={savePreferences}><label className="shop-field">Full name<input name="name" autoComplete="name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} disabled={!profileReady} /></label><label className="shop-checkbox"><input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} disabled={!profileReady} /><span>Email me when Yoco merch payments go live. I can switch this off here at any time.</span></label><button className="shop-button shop-button-dark" disabled={busy || !profileReady}>{busy ? 'Saving…' : 'Save preferences'}</button></form><div className="shop-account-links"><Link className="shop-text-link" to={next}>Continue {params.get('next') === 'checkout' ? 'to checkout' : 'shopping'} <ArrowRight size={16} /></Link><button onClick={restoreBag} disabled={busy}>Restore my saved bag</button><button onClick={signOut} disabled={busy}>Sign out</button></div></> : <><div className="shop-auth-tabs"><button aria-pressed={mode === 'register'} onClick={() => { setMode('register'); setMessage(''); setError('') }}>Create account</button><button aria-pressed={mode === 'signin'} onClick={() => { setMode('signin'); setMessage(''); setError('') }}>Sign in</button></div><h2>{mode === 'register' ? 'Make yourself at home.' : 'Welcome back.'}</h2><p>We’ll send you a secure link to verify your email.</p><form onSubmit={requestLink}>{mode === 'register' && <label className="shop-field">Full name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" /></label>}<label className="shop-field">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>{mode === 'register' && <label className="shop-checkbox"><input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} /><span>Email me once Yoco payments are online so I can complete my purchase.</span></label>}<button className="shop-button shop-button-dark" disabled={busy || !supabase}>{busy ? 'Sending your link…' : mode === 'register' ? 'Create my account' : 'Send sign-in link'} <ArrowRight size={16} /></button><p className="shop-fine-print">Your email is used for account access and, if selected, the payment-launch update. Manage your notification preference in your account.</p></form></>}
      {!supabase && <div className="shop-message" role="status">Online registration is opening soon. Your bag still works; please <Link to={base.replace('/merch', '/contact')}>contact our team</Link> for help in the meantime.</div>}
      {(error || authError) && <p className="shop-error" role="alert">{error || authError}</p>}{message && <div className="shop-message" role="status"><CheckCircle2 size={18} />{message}</div>}
    </div>
  </section></ShopShell>
}
