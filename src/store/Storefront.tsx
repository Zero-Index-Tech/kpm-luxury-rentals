import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, ArrowUpRight, Check, Crown, Globe2, Plus, Gauge, X } from 'lucide-react'
import ShopShell from './ShopShell'
import { useShopBase } from './useShopBase'
import { PRODUCTS, money } from './catalog'
import type { Product } from './catalog'
import { useStore } from './context'
import YocoNotice from './YocoNotice'

export default function Storefront() {
  const [category, setCategory] = useState('All pieces')
  const [product, setProduct] = useState<Product | null>(null)
  const [size, setSize] = useState('')
  const [added, setAdded] = useState('')
  const { addItem } = useStore()
  const base = useShopBase()
  const products = PRODUCTS.filter(item => category === 'All pieces' || item.category === category)
  const choose = (item: Product) => { setProduct(item); setSize(item.sizes.length === 1 ? item.sizes[0] : '') }

  return <ShopShell>
    <section className="shop-hero shop-container">
      <div className="shop-hero-copy">
        <p className="shop-kicker">BEYOND THE DRIVER’S SEAT / COLLECTION 01</p>
        <h1>Wear the<br /><em>arrival.</em></h1>
        <p className="shop-hero-description">Luxury is a way of moving through the world. Meet the everyday pieces that carry the KPMLXR signature.</p>
        <a href="#collection" className="shop-button shop-button-sand">Explore the collection <ArrowUpRight size={18} /></a>
        <div className="shop-pillars"><span><Crown />Luxury</span><span><Gauge />Performance</span><span><Globe2 />Lifestyle</span></div>
        <div className="shop-edition"><span>DESIGNED TO MOVE DIFFERENT.</span><span>JOHANNESBURG, SOUTH AFRICA</span></div>
      </div>
      <div className="shop-campaign"><img src="/merch/Merch banner.png" alt="KPMLXR sand tracksuit and washed black graphic tee styled beside a luxury car" fetchPriority="high" /><span>THE KPMLXR UNIFORM.</span></div>
    </section>

    <section id="collection" className="shop-collection shop-container">
      <div className="shop-section-heading"><div><p className="shop-kicker">CONSIDERED PIECES. UNMISTAKABLE PRESENCE.</p><h2>The collection<span>.</span></h2></div><span className="shop-count">08 SIGNATURE PIECES</span></div>
      <div className="shop-filter-row"><div className="shop-filters" aria-label="Filter products">{['All pieces', 'Tees', 'Tracksuits', 'Essentials'].map(filter => <button key={filter} type="button" onClick={() => setCategory(filter)} aria-pressed={category === filter}>{filter}</button>)}</div><span>Preview pricing · ZAR</span></div>
      {added && <div className="shop-added" role="status"><Check size={16} /> {added} added to your bag. <Link to={`${base}/cart`}>View bag <ArrowRight size={14} /></Link></div>}
      <div className="shop-product-grid">{products.map((item, index) => <article className="shop-product" key={item.id}>
        <button className="shop-product-image" onClick={() => choose(item)} aria-label={`Choose options for ${item.name}, ${item.colour}`}>
          <span className="shop-product-index">0{PRODUCTS.indexOf(item) + 1} / KPMLXR</span>
          <img src={item.image} alt={`${item.name} in ${item.colour}`} loading={index < 3 ? 'eager' : 'lazy'} width={1280} height={1280} />
          <span className="shop-product-add"><Plus size={18} /> Choose options</span>
        </button>
        <div className="shop-product-info"><div><h3><button onClick={() => choose(item)}>{item.name}</button></h3><p><i style={{ background: item.colour === 'Sand Stone' ? '#C7BFAE' : item.colour === 'Washed Black' ? '#55514f' : '#181818' }} />{item.colour}</p></div><span>{money(item.price)}</span></div>
      </article>)}</div>
      <p className="shop-catalogue-note">Build your bag ahead of launch. Final availability, sizing and delivery charges will be confirmed when checkout opens.</p>
    </section>

    <section className="shop-details"><div className="shop-container shop-details-grid"><div><p className="shop-kicker">THE SIGNATURE IS IN THE DETAILS</p><h2>Quiet details.<br /><em>Lasting presence.</em></h2><p>Signature embroidery. Considered colourways. The same attention to detail, beyond the road.</p><Link to={`${base}/account`} className="shop-text-link">Join the first collection <ArrowUpRight size={18} /></Link></div><div className="shop-detail-images">{[['Premium embroidery', '/merch-detail-embroidery.jpg'], ['Woven label', '/merch-detail-label.jpg'], ['3D puff print', '/merch-detail-puff.jpg']].map(([title, image]) => <figure key={title}><img src={image} alt={title} loading="lazy" /><figcaption>{title}</figcaption></figure>)}</div></div></section>
    <section className="shop-launch shop-container"><div><p className="shop-kicker">YOUR NEXT ARRIVAL</p><h2>Be first in line.</h2><p>Create your account and opt in to be notified when Yoco payments go live.</p><Link to={`${base}/account`} className="shop-button shop-button-dark">Create an account <ArrowRight size={17} /></Link></div><YocoNotice /></section>

    <Dialog.Root open={!!product} onOpenChange={open => { if (!open) setProduct(null) }}>
      <Dialog.Portal><Dialog.Overlay className="shop-modal-overlay" /><Dialog.Content className="merch-store shop-product-modal" data-lenis-prevent>
        {product && <><div className="shop-modal-image"><img src={product.image} alt={`${product.name}, ${product.colour}`} /></div><div className="shop-modal-copy"><p className="shop-kicker">KPMLXR / {product.category}</p><Dialog.Title>{product.name}</Dialog.Title><p className="shop-modal-colour">{product.colour} <span>{money(product.price)}</span></p><Dialog.Description>{product.description}</Dialog.Description><fieldset className="shop-sizes"><legend>Select your size</legend>{product.sizes.map(value => <button type="button" key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value}</button>)}</fieldset><p className="shop-fine-print">Size specifications and availability will be confirmed at launch.</p><button className="shop-button shop-button-dark" disabled={!size} onClick={() => { addItem({ productId: product.id, size, quantity: 1 }); setAdded(`${product.name} (${size})`); setProduct(null) }}>Add to bag <Plus size={17} /></button><p className="shop-fine-print">Yoco coming online soon. Adding to your bag does not reserve stock or place an order.</p></div></>}
        <Dialog.Close className="shop-modal-close" aria-label="Close product details"><X size={22} /></Dialog.Close>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </ShopShell>
}
