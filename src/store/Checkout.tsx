import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react'
import ShopShell from './ShopShell'
import { useShopBase } from './useShopBase'
import { BagItems, BagTotals, EmptyBag } from './Bag'
import { useStore } from './context'
import { supabase } from './supabase'
import YocoNotice from './YocoNotice'

const provinces = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape']
const blankAddress = { fullName: '', phone: '', street: '', apartment: '', city: '', province: 'Gauteng', postalCode: '' }
type Address = typeof blankAddress

export default function Checkout() {
  const { user } = useStore()
  // A different session must never inherit the previous customer's address.
  return <CheckoutPage key={user?.id ?? 'guest'} />
}

function CheckoutPage() {
  const { user, authReady, cart } = useStore()
  const base = useShopBase()
  const [address, setAddress] = useState<Address>(blankAddress)
  const [notify, setNotify] = useState(false)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    if (!user || !supabase) return
    let active = true
    Promise.all([
      supabase.from('merch_checkout_drafts').select('delivery').eq('user_id', user.id).maybeSingle(),
      supabase.from('merch_profiles').select('display_name, notify_on_launch').eq('user_id', user.id).single(),
    ]).then(([draft, profile]) => {
      if (!active) return
      if (draft.error || profile.error) setError('We couldn’t load your saved details. Please refresh before saving.')
      else {
        const stored = draft.data?.delivery ?? {}
        setAddress(Object.fromEntries(Object.entries(blankAddress).map(([key, fallback]) => [key, typeof stored[key] === 'string' ? stored[key] : key === 'fullName' ? profile.data?.display_name ?? '' : fallback])) as Address)
        setNotify(profile.data?.notify_on_launch ?? false)
      }
      setLoading(false)
    }).catch(() => { if (active) { setError('Your details could not be loaded. Please refresh to retry.'); setLoading(false) } })
    return () => { active = false }
  }, [user])

  async function saveCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || !user || busy) return
    if (!/^\+?[\d\s()-]{9,20}$/.test(address.phone.trim()) || address.phone.replace(/\D/g, '').length < 9) { setError('Please enter a valid contact number.'); return }
    setBusy(true); setError(''); setSaved(false)
    try {
      const { error: saveError } = await supabase.rpc('save_merch_checkout', {
        p_items: cart,
        p_delivery: Object.fromEntries(Object.entries(address).map(([key, value]) => [key, value.trim()])),
        p_notify: notify,
      })
      if (saveError) throw saveError
      setSaved(true)
    } catch { setError('Your checkout could not be saved. No order or payment was created. Please try again.') } finally { setBusy(false) }
  }

  return <ShopShell><section className="shop-container shop-page"><p className="shop-kicker">YOUR NEXT ARRIVAL</p><h1>Checkout<span>.</span></h1><div className="shop-checkout-steps"><span>01 / Your bag</span><span>02 / Your details</span><span><LockKeyhole size={13} />03 / Payment · coming soon</span></div>
    {!cart.length ? <EmptyBag /> : <div className="shop-checkout-grid"><div><div className="shop-payment-banner"><YocoNotice /><p>You can save your details now. No order is placed and no payment is taken until you return and complete payment after launch.</p></div>
      {!authReady ? <p role="status">Checking your account…</p> : !user ? <div className="shop-form-panel"><h2>First, make it yours.</h2><p>Register or sign in to securely save your checkout and choose whether to receive the launch email.</p><Link to={`${base}/account?next=checkout`} className="shop-button shop-button-dark">Register / Sign in <ArrowRight size={16} /></Link></div> : <form className="shop-form-panel" onSubmit={saveCheckout}><div className="shop-form-heading"><h2>Delivery details</h2><span>South Africa</span></div><p className="shop-fine-print">Signed in as {user.email}. Delivery options and charges will be confirmed when payments open.</p><fieldset disabled={busy || loading}><div className="shop-form-grid">{([
        ['fullName', 'Full name', 'name'], ['phone', 'Contact number', 'tel'], ['street', 'Street address', 'address-line1'], ['apartment', 'Apartment / unit (optional)', 'address-line2'], ['city', 'City / town', 'address-level2'],
      ] as const).map(([key, label, autocomplete]) => <label className={`shop-field ${key === 'street' || key === 'apartment' ? 'shop-field-wide' : ''}`} key={key}>{label}<input name={key} autoComplete={autocomplete} type={key === 'phone' ? 'tel' : 'text'} required={key !== 'apartment'} maxLength={key === 'phone' ? 20 : 160} value={address[key]} onChange={e => { setAddress({ ...address, [key]: e.target.value }); setSaved(false) }} /></label>)}<label className="shop-field">Province<select name="province" autoComplete="address-level1" value={address.province} onChange={e => { setAddress({ ...address, province: e.target.value }); setSaved(false) }}>{provinces.map(province => <option key={province}>{province}</option>)}</select></label><label className="shop-field">Postal code<input name="postalCode" autoComplete="postal-code" required inputMode="numeric" pattern="[0-9]{4}" title="Enter a four-digit South African postal code" maxLength={4} value={address.postalCode} onChange={e => { setAddress({ ...address, postalCode: e.target.value }); setSaved(false) }} /></label></div><label className="shop-checkbox"><input type="checkbox" checked={notify} onChange={e => { setNotify(e.target.checked); setSaved(false) }} /><span>Email me when Yoco payments go live so I can return and complete my purchase. I can change this in My account.</span></label><button className="shop-button shop-button-dark" disabled={busy || loading || !cart.length}>{busy ? 'Saving securely…' : loading ? 'Loading details…' : 'Save my checkout'} <ArrowRight size={16} /></button></fieldset><p className="shop-fine-print">Your delivery details are saved to your account for this checkout. Saving does not reserve stock.</p></form>}
      {error && <p className="shop-error" role="alert">{error}</p>}{saved && <div className="shop-message" role="status"><CheckCircle2 size={22} /><div><strong>Your checkout is saved.</strong><p>{notify ? 'You’re on the list. We’ll email you when Yoco payments are online.' : 'Launch emails are switched off. You can enable them in your account.'} No order has been placed and nothing has been charged.</p></div></div>}
    </div><aside className="shop-summary"><div className="shop-form-heading"><h2>Your selection</h2><Link to={`${base}/cart`}>Edit bag</Link></div><BagItems editable={false} /><BagTotals /><button className="shop-button shop-payment-disabled" disabled><LockKeyhole size={16} />Yoco coming online soon</button><p className="shop-fine-print">Card details will be collected by Yoco when payments are enabled.</p></aside></div>}
  </section></ShopShell>
}
