import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag, UserRound } from 'lucide-react'
import { useStore } from './context'
import { useShopBase } from './useShopBase'
import './store.css'

export default function ShopShell({ children }: { children: ReactNode }) {
  const base = useShopBase()
  const { cart, user, storageNotice } = useStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  return <div className="merch-store" data-concept={base.split('/')[1]}>
    <div className="shop-announcement">THE FIRST COLLECTION <span>•</span> Yoco coming online soon <ArrowUpRight size={13} aria-hidden /></div>
    <nav className="shop-nav shop-container" aria-label="Merch store">
      <Link to={base} className="shop-wordmark">KPMLXR<span>THE WARDROBE</span></Link>
      <div className="shop-nav-actions">
        <Link to={`${base}/account`}><UserRound size={18} /><span>{user ? 'My account' : 'Register / Sign in'}</span></Link>
        <Link to={`${base}/cart`} aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18} /><span>Bag</span><b>{count}</b></Link>
      </div>
    </nav>
    {storageNotice && <p className="shop-container shop-message" role="status">{storageNotice}</p>}
    {children}
  </div>
}
