import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { StoreContext } from './context'
import { addToCart, CART_KEY, itemKey, normaliseCart } from './cart'
import type { CartItem } from './cart'
import { supabase } from './supabase'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return normaliseCart(JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')) } catch { return [] }
  })
  const [storageNotice, setStorageNotice] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(!supabase)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === CART_KEY) {
        try { setCart(normaliseCart(JSON.parse(event.newValue ?? '[]'))) } catch { setCart([]) }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (!supabase) return
    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user ?? null); setAuthReady(true) }
    })
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      setUser(data.session?.user ?? null)
      if (error) setAuthError('Your session could not be restored. Please sign in again.')
      setAuthReady(true)
    }).catch(() => { if (active) { setAuthError('Account services are unavailable. Please try again.'); setAuthReady(true) } })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  function persist(items: CartItem[]) {
    setCart(items)
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); setStorageNotice('') }
    catch { setStorageNotice('Your browser cannot save this bag. Keep this tab open until you finish.') }
  }
  return <StoreContext.Provider value={{ cart, user, authReady, authError, storageNotice,
    addItem: item => persist(addToCart(cart, item)),
    setQuantity: (key, quantity) => persist(normaliseCart(cart.map(item => itemKey(item) === key ? { ...item, quantity } : item))),
    replaceCart: items => persist(normaliseCart(items)),
  }}>{children}</StoreContext.Provider>
}
