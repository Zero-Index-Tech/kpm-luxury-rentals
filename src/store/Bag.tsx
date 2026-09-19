import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import ShopShell from './ShopShell'
import { useShopBase } from './useShopBase'
import { useStore } from './context'
import { itemKey, MAX_QUANTITY, subtotal } from './cart'
import { productById, money } from './catalog'
import YocoNotice from './YocoNotice'

export function BagItems({ editable = true }: { editable?: boolean }) {
  const { cart, setQuantity } = useStore()
  return <div className="shop-bag-items">{cart.map(item => {
    const product = productById(item.productId)!
    return <div className="shop-bag-item" key={itemKey(item)}><img src={product.image} alt={`${product.name}, ${product.colour}`} /><div className="shop-bag-description"><h3>{product.name}</h3><p>{product.colour} / {item.size}</p><span>{money(product.price)} each</span>{editable ? <div className="shop-quantity"><button aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(itemKey(item), item.quantity - 1)}><Minus size={14} /></button><output aria-label={`${product.name} quantity`}>{item.quantity}</output><button aria-label={`Increase ${product.name} quantity`} disabled={item.quantity >= MAX_QUANTITY} onClick={() => setQuantity(itemKey(item), item.quantity + 1)}><Plus size={14} /></button><button className="shop-remove" aria-label={`Remove ${product.name}, ${item.size}`} onClick={() => setQuantity(itemKey(item), 0)}><Trash2 size={15} /></button></div> : <p>Quantity: {item.quantity}</p>}</div><strong>{money(product.price * item.quantity)}</strong></div>
  })}</div>
}
export function BagTotals() {
  const { cart } = useStore()
  return <div className="shop-totals"><div><span>Merchandise subtotal</span><strong>{money(subtotal(cart))}</strong></div><div><span>Delivery</span><span>Confirmed at launch</span></div><div className="shop-total-due"><span>Due today</span><strong>R 0</strong></div><p>No payment is collected. Preview pricing may change before launch.</p></div>
}
export function EmptyBag() {
  const base = useShopBase()
  return <div className="shop-empty"><ShoppingBag size={42} strokeWidth={1} /><h2>Your next arrival starts here.</h2><p>Your bag is empty. Find a piece that moves with you.</p><Link to={base} className="shop-button shop-button-dark">Explore the collection <ArrowRight size={16} /></Link></div>
}
export default function Bag() {
  const { cart } = useStore()
  const base = useShopBase()
  return <ShopShell><section className="shop-container shop-page"><p className="shop-kicker">THE FIRST COLLECTION</p><h1>Your bag<span>.</span></h1>{cart.length ? <div className="shop-checkout-grid"><div><BagItems /><Link to={base} className="shop-text-link">Continue exploring <ArrowRight size={16} /></Link></div><aside className="shop-summary"><h2>The details</h2><BagTotals /><Link to={`${base}/checkout`} className="shop-button shop-button-dark">Continue to checkout <ArrowRight size={16} /></Link><YocoNotice compact /></aside></div> : <EmptyBag />}</section></ShopShell>
}
