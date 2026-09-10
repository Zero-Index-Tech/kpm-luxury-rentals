/**
 * Concept 1 — KPMLXR. Shares the single source of truth for fleet/contact
 * data with the other concepts; only navigation (route prefixes) and the
 * merch catalogue are local to this concept.
 */
export {
  CONTACT,
  FOOTER_FLEET,
  FOOTER_SERVICES,
  VEHICLES,
  FLEET_VEHICLES,
  FLEET_FILTERS,
  VEHICLE_DETAILS,
  CANONICAL_VEHICLE_SLUG,
  resolveVehicle,
  getVehicleDetail,
  VEHICLE_SLUGS,
  getSiblingVehicles,
} from '@/lib/site'
export type { Vehicle, VehicleSpec, VehicleDetail, VehicleDetailSpec } from '@/lib/site'

/** KPMLXR navbar height (black bar). */
export const NAV_HEIGHT = 76

export const NAV_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: 'Home', to: '/c1' },
  { label: 'Fleet', to: '/c1/fleet' },
  { label: 'Services', to: '/c1/#services', hash: '#services' },
  { label: 'About', to: '/c1/about' },
  { label: 'Merch', to: '/c1/merch' },
  { label: 'Contact', to: '/c1/contact' },
]

/** Brand merch catalogue — shared across all three concepts (src/lib/merch). */
export {
  MERCH_MAIN,
  MERCH_ACCESSORIES,
  MERCH_DETAILS,
  MERCH_COLOURWAYS,
} from '@/lib/merch'
export type { MerchProduct } from '@/lib/merch'
