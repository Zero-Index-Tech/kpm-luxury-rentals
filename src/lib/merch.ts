/**
 * KPMLXR brand merch catalogue (from the client's brand-merch board).
 * Shared by all three concepts — each themes its own merch page.
 */
export interface MerchProduct {
  name: string
  tagline: string
  image: string
  price: string
}

/** Brand merch catalogue (from the client's brand-merch board). */
export const MERCH_MAIN: MerchProduct[] = [
  {
    name: 'Signature Tee — Black',
    tagline: 'Minimal front. Maximum impact.',
    image: '/merch-tee-black.jpg',
    price: 'R 850',
  },
  {
    name: 'Worldwide Tee — Sand',
    tagline: 'Global mindset. Premium presence.',
    image: '/merch-tee-sand.jpg',
    price: 'R 890',
  },
  {
    name: 'Drive Different Tee — Washed Black',
    tagline: 'Built for those who stand apart.',
    image: '/merch-tee-washed.jpg',
    price: 'R 890',
  },
  {
    name: 'Core Tracksuit — Black',
    tagline: 'Clean. Tailored. Timeless.',
    image: '/merch-tracksuit-black.jpg',
    price: 'R 2,400',
  },
  {
    name: 'Core Tracksuit — Sand',
    tagline: 'Neutral tones. Elevated fit.',
    image: '/merch-tracksuit-sand.jpg',
    price: 'R 2,400',
  },
]

export const MERCH_ACCESSORIES: MerchProduct[] = [
  { name: 'Hoodie', tagline: 'Heavyweight fleece, tonal chest print.', image: '/merch-hoodie.jpg', price: 'R 1,450' },
  { name: 'Cap', tagline: 'Six-panel, 3D puff KPMLXR front.', image: '/merch-cap.jpg', price: 'R 550' },
  { name: 'Crossbody', tagline: 'Everyday carry, matte black hardware.', image: '/merch-crossbody.jpg', price: 'R 980' },
]

export const MERCH_DETAILS = [
  { title: 'Premium Embroidery', image: '/merch-detail-embroidery.jpg' },
  { title: 'Woven Label Detail', image: '/merch-detail-label.jpg' },
  { title: '3D Puff Print', image: '/merch-detail-puff.jpg' },
] as const

export const MERCH_COLOURWAYS = [
  { name: 'Jet Black', swatch: '#1A1A1C' },
  { name: 'Sand Stone', swatch: '#C7BFAE' },
  { name: 'Washed Grey', swatch: '#6E6E70' },
] as const
