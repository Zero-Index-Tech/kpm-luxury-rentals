/** Shared site data — KPM Luxury Rentals (design.md §7). */

export const NAV_HEIGHT = 100

export const NAV_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: 'Fleet', to: '/c3/fleet' },
  { label: 'Services', to: '/c3/#services', hash: '#services' },
  { label: 'About', to: '/c3/about' },
  { label: 'Merch', to: '/c3/merch' },
  { label: 'Contact', to: '/c3/contact' },
]

export const CONTACT = {
  phone: '+27 (0) 11 943 8274',
  phoneHref: 'tel:+27119438274',
  email: 'concierge@kpmluxe.co.za',
  tiktok: '@kpmlxurerentals',
  address: ['82 Rivonia Road,', 'Sandton,', 'Johannesburg, 2196', 'South Africa'],
} as const

export const FOOTER_FLEET = [
  'Mercedes-AMG GT',
  'Range Rover Sport',
  'Rolls-Royce Ghost',
  'Elite Sports',
  'Diplomatic SUV Portfolio',
] as const

export const FOOTER_SERVICES = [
  'Short-Term Hire',
  'Embassy Leases',
  'Wedding Transportation',
  'Airport Concierge',
  'Chauffeur Drive Services',
] as const

export interface VehicleSpec {
  value: string
  label: string
}

export interface Vehicle {
  slug: string
  name: string
  category: string
  price: string
  image: string
  specs: [VehicleSpec, VehicleSpec, VehicleSpec]
}

export const VEHICLES: Vehicle[] = [
  {
    slug: 'mercedes-amg-gt',
    name: 'Mercedes-AMG GT',
    category: 'Sports Cars',
    price: 'R 4,500',
    image: '/car-amg-gt.jpg',
    specs: [
      { value: 'V8 BiTurbo', label: 'Engine' },
      { value: '430 kW', label: 'Power' },
      { value: '3.8s', label: '0-100' },
    ],
  },
  {
    slug: 'range-rover-sport',
    name: 'Range Rover Sport',
    category: 'SUVs',
    price: 'R 3,800',
    image: '/car-range-rover.jpg',
    specs: [
      { value: '3.0L L6', label: 'Engine' },
      { value: '5 Luxury', label: 'Seats' },
      { value: 'AWD', label: 'Drive' },
    ],
  },
  {
    slug: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    category: 'Chauffeur',
    price: 'R 15,000',
    image: '/car-rolls-ghost.jpg',
    specs: [
      { value: 'V12 Twin', label: 'Engine' },
      { value: '420 kW', label: 'Power' },
      { value: 'Chauffeur', label: 'Status' },
    ],
  },
]

/**
 * Full showroom fleet (fleet.md §2) — the 3 flagship VEHICLES plus the
 * remaining grid models, in fleet-page order. Categories double as the
 * Fleet page filter tabs.
 */
export const FLEET_VEHICLES: Vehicle[] = [
  ...VEHICLES,
  {
    slug: 'bmw-7-series',
    name: 'BMW 7 Series',
    category: 'Sedans',
    price: 'R 3,200',
    image: '/car-bmw-7.jpg',
    specs: [
      { value: '3.0L Twin', label: 'Engine' },
      { value: '5 VIP', label: 'Seats' },
      { value: 'M Lounge', label: 'Tech' },
    ],
  },
  {
    slug: 'porsche-911-turbo',
    name: 'Porsche 911 Turbo',
    category: 'Sports Cars',
    price: 'R 6,500',
    image: '/car-porsche-911.jpg',
    specs: [
      { value: 'Flat-6 Twin', label: 'Engine' },
      { value: '478 kW', label: 'Power' },
      { value: '2.7s', label: '0-100' },
    ],
  },
  {
    slug: 'lamborghini-huracan',
    name: 'Lamborghini Huracán',
    category: 'Sports Cars',
    price: 'R 12,000',
    image: '/car-huracan.jpg',
    specs: [
      { value: 'V10 N/A', label: 'Engine' },
      { value: '470 kW', label: 'Power' },
      { value: '7-Sp LDF', label: 'Gearbox' },
    ],
  },
  {
    slug: 'mercedes-s-class',
    name: 'Mercedes S-Class',
    category: 'Sedans',
    price: 'R 3,500',
    image: '/car-s-class.jpg',
    specs: [
      { value: '3.0L L6', label: 'Engine' },
      { value: '5 Seats', label: 'Seats' },
      { value: 'Exclusive', label: 'Class' },
    ],
  },
  {
    slug: 'bentley-continental-gt',
    name: 'Bentley Continental GT',
    category: 'Convertibles',
    price: 'R 9,000',
    image: '/car-bentley-gt.jpg',
    specs: [
      { value: 'W12 Twin', label: 'Engine' },
      { value: '485 kW', label: 'Power' },
      { value: 'AWD Luxury', label: 'Drive' },
    ],
  },
  {
    slug: 'audi-rs7',
    name: 'Audi RS7',
    category: 'Sedans',
    price: 'R 4,000',
    image: '/car-audi-rs7.jpg',
    specs: [
      { value: '4.0L V8', label: 'Engine' },
      { value: '441 kW', label: 'Power' },
      { value: 'Quattro', label: 'Drive' },
    ],
  },
]

/** Fleet page category filter tabs (fleet.md §2). 'All Vehicles' shows everything. */
export const FLEET_FILTERS = [
  'All Vehicles',
  'Sedans',
  'SUVs',
  'Sports Cars',
  'Convertibles',
  'Chauffeur',
] as const

export type FleetFilter = (typeof FLEET_FILTERS)[number]

/* ---------- Vehicle detail model (vehicle.md appendix) ---------- */

export const CANONICAL_VEHICLE_SLUG = 'mercedes-amg-gt'

export interface VehicleDetailSpec {
  label: string
  value: string
}

export interface VehicleDetail {
  slug: string
  /** Full-bleed hero image. */
  heroImage: string
  /** Hero sub pattern: `Category: [heroCategory] · [descriptor]`. */
  heroCategory: string
  descriptor: string
  /** Narrative H3 — generic fallback when omitted. */
  narrativeTitle?: string
  /** Two narrative paragraphs — generic KPM curation copy when omitted. */
  narrative?: [string, string]
  /** Gallery strip images; a single entry renders as one wide frame. */
  gallery: string[]
  /** 8-cell technical spec grid. */
  specGrid: VehicleDetailSpec[]
  /** Preferred sibling slugs (Section 6); defaults to fleet order. */
  siblings?: string[]
  /** Card data for vehicles not (yet) present in VEHICLES. */
  card?: Vehicle
}

/** Build the standard 8-cell technical data grid (vehicle.md §3). */
function specGrid(
  transmission: string,
  fuel: string,
  seats: string,
  doors: string,
  engine: string,
  power: string,
  zeroToHundred: string,
  topSpeed: string,
): VehicleDetailSpec[] {
  return [
    { label: 'Transmission', value: transmission },
    { label: 'Fuel Type', value: fuel },
    { label: 'Seats', value: seats },
    { label: 'Doors', value: doors },
    { label: 'Engine', value: engine },
    { label: 'Power', value: power },
    { label: '0-100 KM/H', value: zeroToHundred },
    { label: 'Top Speed', value: topSpeed },
  ]
}

/** Compact card builder for detail-only models. */
function detailCard(
  slug: string,
  name: string,
  category: string,
  price: string,
  image: string,
  specs: [VehicleSpec, VehicleSpec, VehicleSpec],
): Vehicle {
  return { slug, name, category, price, image, specs }
}

export const VEHICLE_DETAILS: Record<string, VehicleDetail> = {
  'mercedes-amg-gt': {
    slug: 'mercedes-amg-gt',
    heroImage: '/car-amg-gt.jpg',
    heroCategory: 'Sports Coupe',
    descriptor: 'High Performance Elite',
    narrativeTitle: 'The Pinnacle of Grand Touring',
    narrative: [
      "The Mercedes-AMG GT combines the fascination of an authentic sports car with segment-specific leadership and outstanding everyday practicality. From its expressive front design to its ultra-low stance, every millimeter is tuned for ultimate performance on Johannesburg's highways.",
      'Hand-built under the classic "One Man, One Engine" philosophy, the twin-turbocharged V8 delivers breathtaking power with an acoustic profile that commands absolute respect.',
    ],
    gallery: ['/amg-gallery-1.jpg', '/amg-gallery-2.jpg', '/amg-gallery-3.jpg', '/amg-gallery-4.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Petrol',
      '2 Seats',
      '2 Doors',
      '4.0L V8 Twin-Turbo',
      '585 HP / 430 kW',
      '3.2 seconds',
      '318 km/h',
    ),
    siblings: ['range-rover-sport', 'rolls-royce-ghost', 'ferrari-f8-tributo'],
  },
  'range-rover-sport': {
    slug: 'range-rover-sport',
    heroImage: '/car-range-rover.jpg',
    heroCategory: 'SUV',
    descriptor: 'All-Terrain Luxury SUV',
    gallery: ['/car-range-rover.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Diesel',
      '5 Seats',
      '5 Doors',
      '3.0L Inline-6',
      '350 HP / 258 kW',
      '6.3 seconds',
      '225 km/h',
    ),
  },
  'rolls-royce-ghost': {
    slug: 'rolls-royce-ghost',
    heroImage: '/car-rolls-ghost.jpg',
    heroCategory: 'Chauffeur',
    descriptor: 'Chauffeured Ultra-Luxury',
    gallery: ['/car-rolls-ghost.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Petrol',
      '5 Seats',
      '4 Doors',
      '6.75L V12 Twin-Turbo',
      '563 HP / 420 kW',
      '4.8 seconds',
      '250 km/h',
    ),
  },
  'bmw-7-series': {
    slug: 'bmw-7-series',
    heroImage: '/car-bmw-7.jpg',
    heroCategory: 'Sedan',
    descriptor: 'Executive Lounge Sedan',
    gallery: ['/car-bmw-7.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Petrol',
      '5 Seats',
      '4 Doors',
      '3.0L Twin-Turbo',
      '375 HP / 280 kW',
      '5.4 seconds',
      '250 km/h',
    ),
    card: detailCard('bmw-7-series', 'BMW 7 Series', 'Executive Sedan', 'R 6,500', '/car-bmw-7.jpg', [
      { value: '3.0L TT', label: 'Engine' },
      { value: '280 kW', label: 'Power' },
      { value: '5.4s', label: '0-100' },
    ]),
  },
  'porsche-911-turbo': {
    slug: 'porsche-911-turbo',
    heroImage: '/car-porsche-911.jpg',
    heroCategory: 'Sports',
    descriptor: 'High Performance Elite',
    gallery: ['/car-porsche-911.jpg'],
    specGrid: specGrid(
      'PDK Automatic',
      'Petrol',
      '4 Seats',
      '2 Doors',
      '3.8L Flat-6 Twin-Turbo',
      '650 HP / 478 kW',
      '2.7 seconds',
      '330 km/h',
    ),
    card: detailCard(
      'porsche-911-turbo',
      'Porsche 911 Turbo',
      'Elite Sports',
      'R 12,500',
      '/car-porsche-911.jpg',
      [
        { value: '3.8L F6 TT', label: 'Engine' },
        { value: '478 kW', label: 'Power' },
        { value: '2.7s', label: '0-100' },
      ],
    ),
  },
  'lamborghini-huracan': {
    slug: 'lamborghini-huracan',
    heroImage: '/car-huracan.jpg',
    heroCategory: 'Sports',
    descriptor: 'High Performance Elite',
    gallery: ['/car-huracan.jpg'],
    specGrid: specGrid(
      '7-Sp LDF Auto',
      'Petrol',
      '2 Seats',
      '2 Doors',
      '5.2L V10 N/A',
      '640 HP / 470 kW',
      '2.9 seconds',
      '325 km/h',
    ),
    card: detailCard(
      'lamborghini-huracan',
      'Lamborghini Huracán',
      'Elite Sports',
      'R 16,500',
      '/car-huracan.jpg',
      [
        { value: '5.2L V10', label: 'Engine' },
        { value: '470 kW', label: 'Power' },
        { value: '2.9s', label: '0-100' },
      ],
    ),
  },
  'mercedes-s-class': {
    slug: 'mercedes-s-class',
    heroImage: '/car-s-class.jpg',
    heroCategory: 'Sedan',
    descriptor: 'Executive Flagship Sedan',
    gallery: ['/car-s-class.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Petrol',
      '5 Seats',
      '4 Doors',
      '3.0L Inline-6',
      '429 HP / 320 kW',
      '5.1 seconds',
      '250 km/h',
    ),
    card: detailCard(
      'mercedes-s-class',
      'Mercedes S-Class',
      'Executive Sedan',
      'R 7,500',
      '/car-s-class.jpg',
      [
        { value: '3.0L I6', label: 'Engine' },
        { value: '320 kW', label: 'Power' },
        { value: '5.1s', label: '0-100' },
      ],
    ),
  },
  'bentley-continental-gt': {
    slug: 'bentley-continental-gt',
    heroImage: '/car-bentley-gt.jpg',
    heroCategory: 'Convertible',
    descriptor: 'Grand Touring Convertible',
    gallery: ['/car-bentley-gt.jpg'],
    specGrid: specGrid(
      'Automatic',
      'Petrol',
      '4 Seats',
      '2 Doors',
      '6.0L W12 Twin-Turbo',
      '659 HP / 485 kW',
      '3.6 seconds',
      '335 km/h',
    ),
    card: detailCard(
      'bentley-continental-gt',
      'Bentley Continental GT',
      'Grand Tourer',
      'R 14,000',
      '/car-bentley-gt.jpg',
      [
        { value: '6.0L W12', label: 'Engine' },
        { value: '485 kW', label: 'Power' },
        { value: '3.6s', label: '0-100' },
      ],
    ),
  },
  'audi-rs7': {
    slug: 'audi-rs7',
    heroImage: '/car-audi-rs7.jpg',
    heroCategory: 'Sedan',
    descriptor: 'Performance Sportback',
    gallery: ['/car-audi-rs7.jpg'],
    specGrid: specGrid(
      'Tiptronic Auto',
      'Petrol',
      '5 Seats',
      '4 Doors',
      '4.0L V8 Twin-Turbo',
      '600 HP / 441 kW',
      '3.6 seconds',
      '305 km/h',
    ),
    card: detailCard('audi-rs7', 'Audi RS7', 'Elite Sports', 'R 8,500', '/car-audi-rs7.jpg', [
      { value: '4.0L V8 TT', label: 'Engine' },
      { value: '441 kW', label: 'Power' },
      { value: '3.6s', label: '0-100' },
    ]),
  },
  'ferrari-f8-tributo': {
    slug: 'ferrari-f8-tributo',
    heroImage: '/car-ferrari-f8.jpg',
    heroCategory: 'Sports',
    descriptor: 'Track-Tuned Elite',
    gallery: ['/car-ferrari-f8.jpg'],
    specGrid: specGrid(
      '7-Sp F1 DCT',
      'Petrol',
      '2 Seats',
      '2 Doors',
      '3.9L V8 Twin-Turbo',
      '720 HP / 530 kW',
      '2.9 seconds',
      '340 km/h',
    ),
    card: detailCard(
      'ferrari-f8-tributo',
      'Ferrari F8 Tributo',
      'Elite Sports',
      'R 18,500',
      '/car-ferrari-f8.jpg',
      [
        { value: '3.9L V8', label: 'Engine' },
        { value: '530 kW', label: 'Power' },
        { value: 'Track Tuned', label: 'Status' },
      ],
    ),
  },
}

/**
 * Resolve a route slug to a full Vehicle. Falls back to the canonical
 * Mercedes-AMG GT when the slug is unknown (vehicle.md).
 */
export function resolveVehicle(slug?: string): Vehicle {
  return (
    VEHICLES.find((v) => v.slug === slug) ??
    (slug ? VEHICLE_DETAILS[slug]?.card : undefined) ??
    VEHICLES[0]
  )
}

/** Detail-page data for a slug; falls back to the canonical AMG GT entry. */
export function getVehicleDetail(slug: string): VehicleDetail {
  return VEHICLE_DETAILS[slug] ?? VEHICLE_DETAILS[CANONICAL_VEHICLE_SLUG]
}

/** All known slugs in fleet order: VEHICLES first, then detail-only models. */
export const VEHICLE_SLUGS: string[] = [
  ...VEHICLES.map((v) => v.slug),
  ...Object.keys(VEHICLE_DETAILS).filter((s) => !VEHICLES.some((v) => v.slug === s)),
]

/**
 * Sibling models for Section 6 — the detail entry's preferred siblings when
 * authored, otherwise fleet order; always excludes the current vehicle.
 */
export function getSiblingVehicles(currentSlug: string, count = 3): Vehicle[] {
  const detail = getVehicleDetail(currentSlug)
  const ordered = [...(detail.siblings ?? []), ...VEHICLE_SLUGS]
  const seen = new Set<string>([currentSlug])
  const out: Vehicle[] = []
  for (const slug of ordered) {
    if (seen.has(slug)) continue
    seen.add(slug)
    if (!VEHICLES.some((v) => v.slug === slug) && !VEHICLE_DETAILS[slug]?.card) continue
    out.push(resolveVehicle(slug))
    if (out.length === count) break
  }
  return out
}
