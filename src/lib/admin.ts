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

// ---------- AWS API backend ----------

const API_URL = import.meta.env.VITE_ADMIN_API_URL as string | undefined

export function isAdminApiConfigured() {
  return Boolean(API_URL)
}

async function apiRequest(path: string, token: string, init?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(`Admin API ${init?.method ?? 'GET'} ${path} failed: ${response.status}`)
  if (response.status === 204) return null
  return response.json()
}

export async function fetchAdminData(token: string): Promise<AdminData> {
  const [vehicles, rentals] = await Promise.all([
    apiRequest('/vehicles', token) as Promise<AdminVehicle[]>,
    apiRequest('/rentals', token) as Promise<Rental[]>,
  ])
  if (vehicles.length === 0) {
    const seeded = seededVehicles()
    await Promise.all(seeded.map((vehicle) => apiRequest(`/vehicles/${vehicle.id}`, token, { method: 'PUT', body: JSON.stringify(vehicle) })))
    return { vehicles: seeded, rentals }
  }
  return { vehicles, rentals }
}

export async function syncAdminData(prev: AdminData, next: AdminData, token: string) {
  const writes: Promise<unknown>[] = []
  for (const resource of ['vehicles', 'rentals'] as const) {
    const before = new Map(prev[resource].map((item) => [item.id, item]))
    const after = new Map(next[resource].map((item) => [item.id, item]))
    for (const [id, item] of after) {
      if (JSON.stringify(before.get(id)) !== JSON.stringify(item)) {
        writes.push(apiRequest(`/${resource}/${id}`, token, { method: 'PUT', body: JSON.stringify(item) }))
      }
    }
    for (const id of before.keys()) {
      if (!after.has(id)) writes.push(apiRequest(`/${resource}/${id}`, token, { method: 'DELETE' }))
    }
  }
  await Promise.all(writes)
}

export async function inviteStaffMember(email: string, token: string) {
  return apiRequest('/staff/invitations', token, {
    method: 'POST',
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  })
}
