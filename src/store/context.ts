import { createContext, useContext } from 'react'
import type { User } from '@supabase/supabase-js'
import type { CartItem } from './cart'

interface StoreState {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  setQuantity: (key: string, quantity: number) => void
  replaceCart: (items: unknown) => void
  storageNotice: string
  user: User | null
  authReady: boolean
  authError: string
}
export const StoreContext = createContext<StoreState | null>(null)
export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('StoreProvider is required')
  return context
}
