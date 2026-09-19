export type Category = 'Tees' | 'Tracksuits' | 'Essentials'
export interface Product {
  id: string
  name: string
  colour: string
  category: Category
  description: string
  image: string
  price: number // ZAR cents; preview prices carried over from the existing catalogue.
  sizes: readonly string[]
}

const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
const asset = (name: string) => `/merch/${name}`
export const PRODUCTS: Product[] = [
  { id: 'signature-tee-black', name: 'Signature Tee', colour: 'Jet Black', category: 'Tees', description: 'Minimal front. Maximum impact. A quiet statement with the signature KPMLXR chest mark.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_03 PM (1).png'), price: 85000, sizes: apparelSizes },
  { id: 'worldwide-tee-sand', name: 'Worldwide Tee', colour: 'Sand Stone', category: 'Tees', description: 'Global mindset. Premium presence. The KPMLXR world graphic, in our signature sand colourway.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_03 PM (2).png'), price: 89000, sizes: apparelSizes },
  { id: 'drive-different-tee', name: 'Drive Different Tee', colour: 'Washed Black', category: 'Tees', description: 'Built for those who stand apart. An automotive graphic and a simple philosophy: drive different, live luxurious.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_04 PM (3).png'), price: 89000, sizes: apparelSizes },
  { id: 'core-tracksuit-black', name: 'Core Tracksuit', colour: 'Jet Black', category: 'Tracksuits', description: 'Clean. Tailored. Timeless. The matching zip jacket and trouser set, finished with signature branding.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_05 PM (5).png'), price: 240000, sizes: apparelSizes },
  { id: 'core-tracksuit-sand', name: 'Core Tracksuit', colour: 'Sand Stone', category: 'Tracksuits', description: 'Neutral tones. Elevated fit. A complete matching set with a statement back graphic.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_05 PM (4).png'), price: 240000, sizes: apparelSizes },
  { id: 'signature-hoodie', name: 'Signature Hoodie', colour: 'Jet Black', category: 'Essentials', description: 'An everyday layer with a signature chest mark and a clean, understated finish.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_06 PM (6).png'), price: 145000, sizes: apparelSizes },
  { id: 'signature-cap', name: 'Signature Cap', colour: 'Jet Black', category: 'Essentials', description: 'The finishing touch. A curved peak and signature embroidered branding.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_06 PM (7).png'), price: 55000, sizes: ['One size'] },
  { id: 'crossbody-bag', name: 'Crossbody Bag', colour: 'Jet Black', category: 'Essentials', description: 'Everyday carry, considered. A compact silhouette with zip compartments and an adjustable strap.', image: asset('ChatGPT Image Sep 19, 2026, 09_27_07 PM (8).png'), price: 98000, sizes: ['One size'] },
]
export const productById = (id: string) => PRODUCTS.find(product => product.id === id)
export const money = (cents: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(cents / 100)
