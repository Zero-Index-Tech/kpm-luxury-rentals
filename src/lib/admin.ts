import { FLEET_VEHICLES } from '@/lib/site'

export const ADMIN_STORAGE_KEY = 'kpm-admin-data-v1'
export const ADMIN_SESSION_KEY = 'kpm-admin-session-v1'

export type VehicleStatus = 'Available' | 'Unavailable' | 'Maintenance'
export type RentalStatus = 'Upcoming' | 'Active' | 'Completed' | 'Cancelled'
export type PaymentStatus = 'Pending' | 'Deposit paid' | 'Paid' | 'Refunded'

export interface AdminVehicle {
  id: string
  name: string
  category: string
  seats: number
  rate: number
  status: VehicleStatus
  exteriorImage: string
  interiorImage: string
  archived: boolean
}

export interface Rental {
  id: string
  customer: string
  email: string
  phone: string
  service: string
  vehicleId: string
  startDate: string
  endDate: string
  pickup: string
  dropoff: string
  status: RentalStatus
  paymentStatus: PaymentStatus
  notes: string
  createdAt: string
}

export interface AdminData {
  vehicles: AdminVehicle[]
  rentals: Rental[]
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function createRental(): Rental {
  return {
    id: makeId(), customer: '', email: '', phone: '', service: 'Short-Term Rental',
    vehicleId: '', startDate: '', endDate: '', pickup: '', dropoff: '',
    status: 'Upcoming', paymentStatus: 'Pending', notes: '', createdAt: new Date().toISOString(),
  }
}

export function createVehicle(): AdminVehicle {
  return {
    id: makeId(), name: '', category: 'SUVs', seats: 5, rate: 0,
    status: 'Available', exteriorImage: '', interiorImage: '', archived: false,
  }
}

function seededVehicles(): AdminVehicle[] {
  return FLEET_VEHICLES.map((vehicle) => ({
    id: vehicle.slug,
    name: vehicle.name,
    category: vehicle.category,
    seats: Number(vehicle.specs.find((spec) => spec.label.toLowerCase().includes('seat'))?.value.match(/\d+/)?.[0] ?? 5),
    rate: Number(vehicle.price.replace(/[^\d]/g, '')),
    status: 'Available',
    exteriorImage: vehicle.image,
    interiorImage: '',
    archived: false,
  }))
}

export function loadAdminData(): AdminData {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (!stored) return { vehicles: seededVehicles(), rentals: [] }
    const parsed = JSON.parse(stored) as Partial<AdminData>
    return {
      vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles : seededVehicles(),
      rentals: Array.isArray(parsed.rentals) ? parsed.rentals : [],
    }
  } catch {
    return { vehicles: seededVehicles(), rentals: [] }
  }
}

export function persistAdminData(data: AdminData) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data))
}

export function formatRand(amount: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount)
}
