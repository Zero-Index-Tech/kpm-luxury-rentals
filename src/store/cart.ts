import { productById } from './catalog.ts'

export interface CartItem { productId: string; size: string; quantity: number }
export const CART_KEY = 'kpmlxr.merch.bag.v1'
export const MAX_QUANTITY = 10
export const itemKey = (item: Pick<CartItem, 'productId' | 'size'>) => `${item.productId}:${item.size}`

/** Treat browser storage and remote saved bags as untrusted input. */
export function normaliseCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return []
  const result = new Map<string, CartItem>()
  for (const item of value.slice(0, 100)) {
    if (!item || typeof item !== 'object') continue
    const product = productById(item.productId)
    if (!product || !product.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity <= 0) continue
    const key = itemKey(item)
    result.set(key, { productId: product.id, size: item.size, quantity: Math.min(MAX_QUANTITY, item.quantity + (result.get(key)?.quantity ?? 0)) })
  }
  return [...result.values()]
}
export function addToCart(cart: CartItem[], item: CartItem): CartItem[] {
  return normaliseCart([...cart, item])
}
export const subtotal = (cart: CartItem[]) => normaliseCart(cart).reduce((sum, item) => sum + productById(item.productId)!.price * item.quantity, 0)
