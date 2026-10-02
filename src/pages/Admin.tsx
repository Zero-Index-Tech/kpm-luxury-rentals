import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import {
  Activity, Archive, ArrowDown, ArrowUp, CalendarDays, CarFront, Check, ChevronDown,
  CircleDollarSign, Clock3, Download, LayoutDashboard, LogOut, Menu, Plus, Search,
  Settings2, Trash2, UserRound, Users, Wrench, X,
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import {
  ADMIN_SESSION_KEY, createRental, createVehicle, formatRand, loadAdminData, persistAdminData,
} from '@/lib/admin'
import type { AdminData, AdminVehicle, PaymentStatus, Rental, RentalStatus, VehicleStatus } from '@/lib/admin'
import './admin.css'

type Section = 'Overview' | 'Rentals' | 'Fleet' | 'Analytics'
type RentalFilter = 'All rentals' | RentalStatus

const NAV_ITEMS: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'Rentals', icon: CalendarDays },
  { label: 'Fleet', icon: CarFront }, { label: 'Analytics', icon: Activity },
]
const RENTAL_STATUSES: RentalStatus[] = ['Upcoming', 'Active', 'Completed', 'Cancelled']
const PAYMENT_STATUSES: PaymentStatus[] = ['Pending', 'Deposit paid', 'Paid', 'Refunded']
const VEHICLE_STATUSES: VehicleStatus[] = ['Available', 'Unavailable', 'Maintenance']
const CATEGORIES = ['SUVs', 'Sedans', 'Sports Cars', 'Convertibles', 'Chauffeur', 'Other']
const CHART_COLORS = ['#607d73', '#d89d54', '#64738c', '#b56b55', '#9a8e70', '#5f8790']

function todayKey() { return new Date().toISOString().slice(0, 10) }
function statusClass(value: string) { return `admin-status admin-status--${value.toLowerCase().replaceAll(' ', '-')}` }
function csvCell(value: string | number) { return `"${String(value).replaceAll('"', '""')}"` }

function downloadRentals(rentals: Rental[], vehicles: AdminVehicle[]) {
  const vehicleNames = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle.name]))
  const rows = [
    ['Customer', 'Email', 'Phone', 'Service', 'Vehicle', 'Start date', 'End date', 'Pickup', 'Drop-off', 'Booking status', 'Payment status', 'Notes'],
    ...rentals.map((rental) => [rental.customer, rental.email, rental.phone, rental.service,
      vehicleNames.get(rental.vehicleId) ?? (rental.vehicleId ? 'Removed vehicle' : 'Unassigned'),
      rental.startDate, rental.endDate, rental.pickup, rental.dropoff, rental.status, rental.paymentStatus, rental.notes]),
  ]
  const blob = new Blob([`\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `kpm-rentals-${todayKey()}.csv`
  anchor.click()
  URL.revokeObjectURL(url)
}

async function readImage(file?: File) {
  if (!file) return ''
  return new Promise<string>((resolve, reject) => {
    const image = new Image()
    const source = URL.createObjectURL(file)
    image.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(source)
      resolve(canvas.toDataURL('image/jpeg', 0.78))
    }
    image.onerror = () => { URL.revokeObjectURL(source); reject(new Error('Image could not be read.')) }
    image.src = source
  })
}

export default function Admin() {
  const configuredEmail = import.meta.env.VITE_ADMIN_EMAIL as string | undefined
  const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'signed-in')
  const [data, setData] = useState<AdminData>(loadAdminData)
  const [section, setSection] = useState<Section>('Overview')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [storageError, setStorageError] = useState('')
  const [dialog, setDialog] = useState<'rental' | 'vehicle' | null>(null)
  const [editingRental, setEditingRental] = useState<Rental | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    try { persistAdminData(data); setStorageError('') }
    catch { setStorageError('Browser storage is full. Try smaller vehicle images or remove unused data.') }
  }, [data])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  function signOut() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setAuthenticated(false)
  }

  if (!authenticated) {
    return <Login configured={Boolean(configuredEmail && configuredPassword)} onSuccess={() => setAuthenticated(true)} />
  }

  const activeVehicles = data.vehicles.filter((vehicle) => !vehicle.archived)
  const rentals = data.rentals
  const activeRentals = rentals.filter((rental) => rental.status === 'Active')
  const upcomingRentals = rentals.filter((rental) => rental.status === 'Upcoming' && rental.startDate >= todayKey())
  const availableCount = activeVehicles.filter((vehicle) => vehicle.status === 'Available' &&
    !activeRentals.some((rental) => rental.vehicleId === vehicle.id)).length
  const needsAssignment = rentals.filter((rental) => ['Upcoming', 'Active'].includes(rental.status) && !rental.vehicleId).length
  const vehicleById = new Map(data.vehicles.map((vehicle) => [vehicle.id, vehicle]))

  function updateData(next: AdminData, message?: string) {
    setData(next)
    if (message) setToast(message)
  }

  function saveRental(rental: Rental) {
    const exists = rentals.some((item) => item.id === rental.id)
    updateData({ ...data, rentals: exists ? rentals.map((item) => item.id === rental.id ? rental : item) : [rental, ...rentals] }, exists ? 'Booking updated' : 'Booking created')
    setDialog(null)
  }

  function saveVehicle(vehicle: AdminVehicle) {
    const exists = data.vehicles.some((item) => item.id === vehicle.id)
    updateData({ ...data, vehicles: exists ? data.vehicles.map((item) => item.id === vehicle.id ? vehicle : item) : [vehicle, ...data.vehicles] }, exists ? 'Vehicle updated' : 'Vehicle added')
    setDialog(null)
  }

  function removeVehicle(vehicle: AdminVehicle) {
    updateData({ ...data, vehicles: data.vehicles.map((item) => item.id === vehicle.id ? { ...item, archived: true } : item) }, `${vehicle.name} moved to archive`)
  }

  function restoreVehicle(vehicle: AdminVehicle) {
    updateData({ ...data, vehicles: data.vehicles.map((item) => item.id === vehicle.id ? { ...item, archived: false } : item) }, `${vehicle.name} restored`)
  }

  const pageHeading: Record<Section, string> = {
    Overview: 'Good day, Admin', Rentals: 'Rental bookings', Fleet: 'Fleet management', Analytics: 'Fleet analytics',
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobileMenu ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-brand"><span className="admin-brand-mark">K</span><span><strong>KPM</strong><small>OPERATIONS</small></span></div>
        <div className="admin-workspace-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin sections">
          {NAV_ITEMS.map(({ label, icon: Icon }) => <button key={label} className={section === label ? 'is-active' : ''} onClick={() => { setSection(label); setMobileMenu(false) }}><Icon size={17} />{label}</button>)}
        </nav>
        <div className="admin-sidebar-foot"><span className="admin-online-dot" /> Local browser workspace</div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-button admin-menu-toggle" aria-label="Open navigation" onClick={() => setMobileMenu((open) => !open)}><Menu size={20} /></button>
          <div className="admin-breadcrumb">KPM <span>/</span> {section}</div>
          <div className="admin-top-actions"><span className="admin-local-badge"><span className="admin-online-dot" /> LOCAL DATA</span><button className="admin-user-button" onClick={signOut}><span className="admin-avatar">A</span><span className="admin-user-label">Admin</span><LogOut size={15} /></button></div>
        </header>

        <div className="admin-content">
          <div className="admin-page-title"><div><p className="admin-eyebrow">KPM LUXURY RENTALS <span>·</span> {new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</p><h1>{pageHeading[section]}</h1><p className="admin-subtitle">A clear view of your bookings, vehicles and daily operations.</p></div>
            <button className="admin-primary-button" onClick={() => { setEditingRental(null); setDialog('rental') }}><Plus size={16} /> New booking</button>
          </div>

          {storageError && <div className="admin-alert" role="alert"><Wrench size={16} />{storageError}</div>}

          {section === 'Overview' && <Overview rentals={rentals} vehicles={activeVehicles} upcoming={upcomingRentals} availableCount={availableCount} activeCount={activeRentals.length} unassignedCount={needsAssignment} vehicleById={vehicleById} onOpenRentals={() => setSection('Rentals')} onCreate={() => { setEditingRental(null); setDialog('rental') }} />}
          {section === 'Rentals' && <RentalsSection rentals={rentals} vehicles={activeVehicles} onCreate={() => { setEditingRental(null); setDialog('rental') }} onEdit={(rental) => { setEditingRental(rental); setDialog('rental') }} onUpdate={(updated) => updateData({ ...data, rentals: rentals.map((item) => item.id === updated.id ? updated : item) }, 'Booking status updated')} onDelete={(id) => { if (window.confirm('Delete this booking? This cannot be undone.')) updateData({ ...data, rentals: rentals.filter((item) => item.id !== id) }, 'Booking deleted') }} onExport={() => downloadRentals(rentals, data.vehicles)} />}
          {section === 'Fleet' && <FleetSection vehicles={data.vehicles} onCreate={() => { setEditingVehicle(null); setDialog('vehicle') }} onEdit={(vehicle) => { setEditingVehicle(vehicle); setDialog('vehicle') }} onStatus={(vehicle, status) => updateData({ ...data, vehicles: data.vehicles.map((item) => item.id === vehicle.id ? { ...item, status } : item) }, 'Vehicle availability updated')} onArchive={removeVehicle} onRestore={restoreVehicle} />}
          {section === 'Analytics' && <Analytics rentals={rentals} vehicles={activeVehicles} />}
        </div>
      </main>

      {mobileMenu && <button className="admin-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}
      {dialog === 'rental' && <RentalDialog initial={editingRental ?? createRental()} vehicles={activeVehicles} onClose={() => setDialog(null)} onSave={saveRental} />}
      {dialog === 'vehicle' && <VehicleDialog initial={editingVehicle ?? createVehicle()} onClose={() => setDialog(null)} onSave={saveVehicle} />}
      {toast && <div className="admin-toast" role="status"><Check size={16} />{toast}</div>}
    </div>
  )
}

function Login({ configured, onSuccess }: { configured: boolean; onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!configured) return
    if (email.trim().toLowerCase() !== import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase() || password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      setError('Those credentials do not match.')
      return
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'signed-in')
    onSuccess()
  }

  return <main className="admin-login-screen"><div className="admin-login-visual"><div className="admin-login-wordmark">KPM<span> / OPERATIONS</span></div><div className="admin-login-photo" /><div className="admin-login-caption"><span>FLEET CONTROL</span><p>Every detail,<br />in its place.</p></div></div>
    <div className="admin-login-panel"><div className="admin-login-form-wrap"><span className="admin-login-kicker">KPM LUXURY RENTALS</span><h1>Admin sign in</h1><p className="admin-subtitle">Sign in to manage bookings and fleet operations.</p>
      {!configured && <div className="admin-alert admin-alert--stack">Admin credentials are not configured. Add <code>VITE_ADMIN_EMAIL</code> and <code>VITE_ADMIN_PASSWORD</code> to your local environment, then restart the dev server.</div>}
      <form onSubmit={submit} className="admin-login-form"><label>Email address<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}<button disabled={!configured} className="admin-primary-button admin-login-submit">Sign in <ArrowUp size={16} /></button>
      </form><p className="admin-login-notice">Browser-only workspace · Changes are saved on this device.</p>
    </div><p className="admin-security-note">Client-side sign-in is not secure authentication.<br />Do not use for sensitive production access.</p></div>
  </main>
}

function Metric({ label, value, detail, icon: Icon, tone }: { label: string; value: string | number; detail: string; icon: typeof CarFront; tone: string }) {
  return <article className="admin-metric"><div className={`admin-metric-icon ${tone}`}><Icon size={18} /></div><p>{label}</p><strong>{value}</strong><span>{detail}</span></article>
}

function Overview({ rentals, vehicles, upcoming, availableCount, activeCount, unassignedCount, vehicleById, onOpenRentals, onCreate }: {
  rentals: Rental[]; vehicles: AdminVehicle[]; upcoming: Rental[]; availableCount: number; activeCount: number; unassignedCount: number;
  vehicleById: Map<string, AdminVehicle>; onOpenRentals: () => void; onCreate: () => void
}) {
  const nextBookings = [...upcoming].sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 5)
  return <>
    <section className="admin-metrics-grid">
      <Metric label="Total vehicles" value={vehicles.length} detail="Active fleet" icon={CarFront} tone="sage" />
      <Metric label="Available now" value={availableCount} detail={`${vehicles.length ? Math.round(availableCount / vehicles.length * 100) : 0}% of active fleet`} icon={Check} tone="blue" />
      <Metric label="Active rentals" value={activeCount} detail="Currently on hire" icon={KeyIcon} tone="amber" />
      <Metric label="Upcoming rentals" value={upcoming.length} detail="Confirmed and scheduled" icon={CalendarDays} tone="rose" />
      <Metric label="Needs assignment" value={unassignedCount} detail="Bookings without a vehicle" icon={UserRound} tone="slate" />
    </section>
    <section className="admin-overview-grid">
      <div className="admin-panel admin-upcoming-panel"><div className="admin-panel-heading"><div><h2>Upcoming rentals</h2><p>Bookings to prepare for</p></div><button className="admin-text-button" onClick={onOpenRentals}>All bookings <ArrowUp size={14} /></button></div>
        {nextBookings.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>CLIENT</th><th>VEHICLE</th><th>START DATE</th><th>STATUS</th></tr></thead><tbody>{nextBookings.map((rental) => <tr key={rental.id}><td><strong>{rental.customer}</strong><small>{rental.service}</small></td><td>{vehicleById.get(rental.vehicleId)?.name ?? (rental.vehicleId ? 'Archived vehicle' : <span className="admin-unassigned">Needs assignment</span>)}</td><td>{formatDate(rental.startDate)}</td><td><span className={statusClass(rental.status)}>{rental.status}</span></td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarDays} title="Nothing on the schedule" body="New bookings will appear here once added." action="Create booking" onClick={onCreate} />}
      </div>
      <div className="admin-panel admin-fleet-snapshot"><div className="admin-panel-heading"><div><h2>Fleet availability</h2><p>Current vehicle status</p></div><button className="admin-icon-button" title="Open fleet" onClick={onOpenRentals}><CarFront size={17} /></button></div>
        <div className="admin-availability-number"><strong>{availableCount}</strong><span>vehicles available</span></div><div className="admin-availability-track"><span style={{ width: `${vehicles.length ? availableCount / vehicles.length * 100 : 0}%` }} /></div>
        <div className="admin-fleet-breakdown">{VEHICLE_STATUSES.map((status) => <div key={status}><span><i className={`admin-dot admin-dot--${status.toLowerCase()}`} />{status}</span><strong>{vehicles.filter((vehicle) => vehicle.status === status).length}</strong></div>)}</div>
        <button className="admin-secondary-button admin-full-button" onClick={onOpenRentals}>Review reservations <ArrowUp size={15} /></button>
      </div>
    </section>
    <section className="admin-lower-note"><div className="admin-note-icon"><Settings2 size={17} /></div><div><strong>Private browser workspace</strong><p>{rentals.length} bookings saved locally. Fleet and rental data stay in this browser and do not sync to other devices.</p></div></section>
  </>
}

function KeyIcon({ size = 18 }: { size?: number }) { return <CircleDollarSign size={size} /> }

function formatDate(value: string) {
  if (!value) return 'Not set'
  return new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

function EmptyState({ icon: Icon, title, body, action, onClick }: { icon: typeof CalendarDays; title: string; body: string; action?: string; onClick?: () => void }) {
  return <div className="admin-empty"><span><Icon size={20} /></span><strong>{title}</strong><p>{body}</p>{action && <button className="admin-secondary-button" onClick={onClick}><Plus size={15} />{action}</button>}</div>
}

function RentalsSection({ rentals, vehicles, onCreate, onEdit, onUpdate, onDelete, onExport }: {
  rentals: Rental[]; vehicles: AdminVehicle[]; onCreate: () => void; onEdit: (rental: Rental) => void;
  onUpdate: (rental: Rental) => void; onDelete: (id: string) => void; onExport: () => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<RentalFilter>('All rentals')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const vehicleNames = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle.name]))
  const filtered = useMemo(() => rentals.filter((rental) => {
    const term = search.trim().toLowerCase()
    const matchesSearch = !term || [rental.customer, rental.email, rental.phone, rental.service, vehicleNames.get(rental.vehicleId) ?? ''].some((value) => value.toLowerCase().includes(term))
    return matchesSearch && (filter === 'All rentals' || rental.status === filter)
  }).sort((a, b) => sort === 'newest' ? b.startDate.localeCompare(a.startDate) : a.startDate.localeCompare(b.startDate)), [rentals, search, filter, sort])

  return <section className="admin-panel admin-list-panel"><div className="admin-list-toolbar"><div className="admin-search"><Search size={16} /><input aria-label="Search rentals" placeholder="Search client, service or vehicle" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="admin-list-actions"><label className="admin-select-wrap"><span className="sr-only">Filter rentals</span><select value={filter} onChange={(event) => setFilter(event.target.value as RentalFilter)}><option>All rentals</option>{RENTAL_STATUSES.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={14} /></label><button className="admin-secondary-button" onClick={() => setSort((value) => value === 'newest' ? 'oldest' : 'newest')}>{sort === 'newest' ? <ArrowDown size={15} /> : <ArrowUp size={15} />} Date</button><button className="admin-secondary-button" onClick={onExport}><Download size={15} /> Export Excel</button><button className="admin-primary-button" onClick={onCreate}><Plus size={15} /> Add booking</button></div></div>
    {filtered.length ? <div className="admin-table-wrap"><table className="admin-table admin-rental-table"><thead><tr><th>CLIENT</th><th>SERVICE / VEHICLE</th><th>DATES</th><th>BOOKING</th><th>PAYMENT</th><th aria-label="Actions" /></tr></thead><tbody>{filtered.map((rental) => <tr key={rental.id}><td><strong>{rental.customer}</strong><small>{rental.email || rental.phone || 'No contact details'}</small></td><td><strong>{rental.service}</strong><small>{vehicleNames.get(rental.vehicleId) ?? (rental.vehicleId ? 'Archived vehicle' : <span className="admin-unassigned">Needs assignment</span>)}</small></td><td>{formatDate(rental.startDate)}<small>to {formatDate(rental.endDate)}</small></td><td><select aria-label={`Booking status for ${rental.customer}`} className={statusClass(rental.status)} value={rental.status} onChange={(event) => onUpdate({ ...rental, status: event.target.value as RentalStatus })}>{RENTAL_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td><td><span className={statusClass(rental.paymentStatus)}>{rental.paymentStatus}</span></td><td><div className="admin-row-actions"><button className="admin-icon-button" title="Edit booking" onClick={() => onEdit(rental)}><Settings2 size={16} /></button><button className="admin-icon-button admin-danger-icon" title="Delete booking" onClick={() => onDelete(rental.id)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div> : <EmptyState icon={Users} title={search || filter !== 'All rentals' ? 'No bookings match' : 'No bookings yet'} body={search || filter !== 'All rentals' ? 'Try changing your search or filters.' : 'Create a rental booking to start tracking your schedule.'} action={!search && filter === 'All rentals' ? 'Create booking' : undefined} onClick={onCreate} />}
    <div className="admin-table-footer">Showing {filtered.length} of {rentals.length} bookings <span>Changes are saved in this browser</span></div>
  </section>
}

function FleetSection({ vehicles, onCreate, onEdit, onStatus, onArchive, onRestore }: {
  vehicles: AdminVehicle[]; onCreate: () => void; onEdit: (vehicle: AdminVehicle) => void;
  onStatus: (vehicle: AdminVehicle, status: VehicleStatus) => void; onArchive: (vehicle: AdminVehicle) => void; onRestore: (vehicle: AdminVehicle) => void
}) {
  const [search, setSearch] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const visible = vehicles.filter((vehicle) => vehicle.archived === showArchived && `${vehicle.name} ${vehicle.category}`.toLowerCase().includes(search.toLowerCase()))
  return <section className="admin-panel admin-list-panel"><div className="admin-list-toolbar"><div className="admin-search"><Search size={16} /><input aria-label="Search fleet" placeholder="Search vehicle or category" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="admin-list-actions"><button className={`admin-secondary-button ${showArchived ? 'is-selected' : ''}`} onClick={() => setShowArchived((value) => !value)}><Archive size={15} />{showArchived ? 'View active fleet' : 'Archive'}</button>{!showArchived && <button className="admin-primary-button" onClick={onCreate}><Plus size={15} /> Add vehicle</button>}</div></div>
    {visible.length ? <div className="admin-fleet-grid">{visible.map((vehicle) => <article className={`admin-vehicle-card ${vehicle.archived ? 'is-archived' : ''}`} key={vehicle.id}><div className="admin-vehicle-image" style={vehicle.exteriorImage ? { backgroundImage: `linear-gradient(0deg,rgba(20,25,25,.24),transparent 65%),url("${vehicle.exteriorImage}")` } : undefined}>{!vehicle.exteriorImage && <CarFront size={32} />}<span className={statusClass(vehicle.archived ? 'Archived' : vehicle.status)}>{vehicle.archived ? 'Archived' : vehicle.status}</span></div><div className="admin-vehicle-info"><div><h3>{vehicle.name}</h3><p>{vehicle.category} <span>·</span> {vehicle.seats} seats</p></div><strong>{formatRand(vehicle.rate)}<small> / day</small></strong></div><div className="admin-vehicle-actions">{vehicle.archived ? <button className="admin-secondary-button" onClick={() => onRestore(vehicle)}><ArrowUp size={15} /> Restore</button> : <><label className="admin-select-wrap admin-vehicle-status"><span className="sr-only">Set {vehicle.name} availability</span><select value={vehicle.status} onChange={(event) => onStatus(vehicle, event.target.value as VehicleStatus)}>{VEHICLE_STATUSES.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={14} /></label><button className="admin-icon-button" title="Edit vehicle" onClick={() => onEdit(vehicle)}><Settings2 size={16} /></button><button className="admin-icon-button admin-danger-icon" title="Archive vehicle" onClick={() => onArchive(vehicle)}><Archive size={16} /></button></>}</div></article>)}</div> : <EmptyState icon={showArchived ? Archive : CarFront} title={showArchived ? 'Archive is empty' : 'No vehicles found'} body={showArchived ? 'Removed vehicles remain archived with their rental history.' : 'Add a vehicle to begin tracking your fleet.'} action={!showArchived ? 'Add vehicle' : undefined} onClick={onCreate} />}
    <div className="admin-table-footer">{visible.length} {showArchived ? 'archived' : 'active'} vehicles <span>Archived vehicles remain linked to rental history</span></div>
  </section>
}

function Analytics({ rentals, vehicles }: { rentals: Rental[]; vehicles: AdminVehicle[] }) {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (5 - index))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return { key, month: new Intl.DateTimeFormat('en', { month: 'short' }).format(date), rentals: rentals.filter((rental) => rental.startDate.startsWith(key) && rental.status !== 'Cancelled').length }
  })
  const ranked = vehicles.map((vehicle) => ({ ...vehicle, usage: rentals.filter((rental) => rental.vehicleId === vehicle.id && rental.status !== 'Cancelled').length })).sort((a, b) => b.usage - a.usage)
  const popularity = ranked.filter((vehicle) => vehicle.usage > 0).slice(0, 6).map((vehicle) => ({ name: vehicle.name, bookings: vehicle.usage }))
  const totalUsage = ranked.reduce((total, vehicle) => total + vehicle.usage, 0)
  return <><div className="admin-analytics-summary"><div><span>RECORDED BOOKINGS</span><strong>{totalUsage}</strong></div><div><span>TRACKED VEHICLES</span><strong>{vehicles.length}</strong></div><div><span>PERIOD</span><strong>Last 6 months</strong></div></div>
    <div className="admin-chart-grid"><article className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><h2>Monthly usage</h2><p>Bookings by start month</p></div><span className="admin-chart-legend"><i /> Rentals</span></div><div className="admin-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={months} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e9e7e0" strokeDasharray="3 4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888d89', fontSize: 11 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#888d89', fontSize: 11 }} /><Tooltip cursor={{ fill: '#f5f5f1' }} contentStyle={{ border: '1px solid #e7e8e2', borderRadius: 5, fontSize: 12 }} /><Bar dataKey="rentals" name="Bookings" fill="#607d73" radius={[3, 3, 0, 0]} maxBarSize={38} /></BarChart></ResponsiveContainer></div></article>
      <article className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><h2>Vehicle popularity</h2><p>Share of tracked bookings</p></div></div>{popularity.length ? <><div className="admin-popularity-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={popularity} dataKey="bookings" nameKey="name" innerRadius="62%" outerRadius="86%" paddingAngle={3} stroke="none">{popularity.map((entry, index) => <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}</Pie><Tooltip contentStyle={{ border: '1px solid #e7e8e2', borderRadius: 5, fontSize: 12 }} /></PieChart></ResponsiveContainer><div className="admin-donut-total"><strong>{totalUsage}</strong><span>bookings</span></div></div><div className="admin-chart-legend-list">{popularity.map((item, index) => <div key={item.name}><span><i style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />{item.name}</span><strong>{item.bookings}</strong></div>)}</div></> : <EmptyState icon={CarFront} title="Popularity appears here" body="Assign vehicles to bookings to see the ranking." />}</article>
      <article className="admin-panel admin-chart-panel admin-ranking-panel"><div className="admin-panel-heading"><div><h2>Vehicle usage ranking</h2><p>Bookings assigned to each vehicle</p></div></div>{ranked.length ? <div className="admin-ranking-list">{ranked.slice(0, 8).map((vehicle, index) => <div className="admin-ranking-row" key={vehicle.id}><span className="admin-rank-index">{String(index + 1).padStart(2, '0')}</span><span className="admin-ranking-name">{vehicle.name}<small>{vehicle.category}</small></span><div className="admin-rank-track"><i style={{ width: `${totalUsage ? vehicle.usage / Math.max(ranked[0]?.usage ?? 1, 1) * 100 : 0}%` }} /></div><strong>{vehicle.usage}</strong></div>)}</div> : <EmptyState icon={Activity} title="No usage to rank" body="Rental history will populate vehicle usage rankings." />}</article>
    </div>
  </>
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`admin-field ${wide ? 'admin-field--wide' : ''}`}><span>{label}</span>{children}</label>
}

function RentalDialog({ initial, vehicles, onClose, onSave }: { initial: Rental; vehicles: AdminVehicle[]; onClose: () => void; onSave: (rental: Rental) => void }) {
  const [form, setForm] = useState(initial)
  const editing = Boolean(initial.customer || initial.email || initial.phone || initial.startDate)
  function set<K extends keyof Rental>(key: K, value: Rental[K]) { setForm((current) => ({ ...current, [key]: value })) }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onSave(form) }
  return <Modal title={editing ? 'Edit booking' : 'New booking'} onClose={onClose}><form onSubmit={submit}><div className="admin-form-grid">
    <Field label="Customer name"><input required value={form.customer} onChange={(event) => set('customer', event.target.value)} /></Field><Field label="Email address"><input type="email" value={form.email} onChange={(event) => set('email', event.target.value)} /></Field>
    <Field label="Phone number"><input type="tel" value={form.phone} onChange={(event) => set('phone', event.target.value)} /></Field><Field label="Service"><select value={form.service} onChange={(event) => set('service', event.target.value)}>{['Short-Term Rental', 'Long-Term / Corporate Lease', 'Wedding / Event', 'Airport Transfer', 'Chauffeur Service', 'Other'].map((value) => <option key={value}>{value}</option>)}</select></Field>
    <Field label="Assigned vehicle" wide><select value={form.vehicleId} onChange={(event) => set('vehicleId', event.target.value)}><option value="">Needs assignment</option>{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.name} · {vehicle.status}</option>)}</select></Field>
    <Field label="Start date"><input required type="date" value={form.startDate} onChange={(event) => set('startDate', event.target.value)} /></Field><Field label="End date"><input required type="date" min={form.startDate} value={form.endDate} onChange={(event) => set('endDate', event.target.value)} /></Field>
    <Field label="Pickup location"><input value={form.pickup} onChange={(event) => set('pickup', event.target.value)} /></Field><Field label="Drop-off location"><input value={form.dropoff} onChange={(event) => set('dropoff', event.target.value)} /></Field>
    <Field label="Booking status"><select value={form.status} onChange={(event) => set('status', event.target.value as RentalStatus)}>{RENTAL_STATUSES.map((value) => <option key={value}>{value}</option>)}</select></Field><Field label="Payment status"><select value={form.paymentStatus} onChange={(event) => set('paymentStatus', event.target.value as PaymentStatus)}>{PAYMENT_STATUSES.map((value) => <option key={value}>{value}</option>)}</select></Field>
    <Field label="Notes" wide><textarea rows={3} value={form.notes} onChange={(event) => set('notes', event.target.value)} /></Field>
  </div><ModalActions onClose={onClose} submitLabel={editing ? 'Save changes' : 'Create booking'} /></form></Modal>
}

function VehicleDialog({ initial, onClose, onSave }: { initial: AdminVehicle; onClose: () => void; onSave: (vehicle: AdminVehicle) => void }) {
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')
  const editing = Boolean(initial.name)
  function set<K extends keyof AdminVehicle>(key: K, value: AdminVehicle[K]) { setForm((current) => ({ ...current, [key]: value })) }
  async function upload(event: ChangeEvent<HTMLInputElement>, key: 'exteriorImage' | 'interiorImage') {
    try { const image = await readImage(event.target.files?.[0]); if (image) set(key, image); setError('') }
    catch { setError('That image could not be processed. Try a JPG, PNG or WebP image.') }
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onSave(form) }
  return <Modal title={editing ? 'Edit vehicle' : 'Add vehicle'} onClose={onClose}><form onSubmit={submit}><div className="admin-form-grid">
    <Field label="Vehicle name" wide><input required value={form.name} onChange={(event) => set('name', event.target.value)} placeholder="e.g. Range Rover Sport" /></Field>
    <Field label="Category"><select value={form.category} onChange={(event) => set('category', event.target.value)}>{CATEGORIES.map((value) => <option key={value}>{value}</option>)}</select></Field><Field label="Seats"><input required type="number" min="1" max="99" value={form.seats} onChange={(event) => set('seats', Number(event.target.value))} /></Field>
    <Field label="Daily rate (ZAR)"><input required type="number" min="0" step="100" value={form.rate} onChange={(event) => set('rate', Number(event.target.value))} /></Field><Field label="Availability"><select value={form.status} onChange={(event) => set('status', event.target.value as VehicleStatus)}>{VEHICLE_STATUSES.map((value) => <option key={value}>{value}</option>)}</select></Field>
    <ImageField label="Exterior image" value={form.exteriorImage} onChange={(event) => upload(event, 'exteriorImage')} /><ImageField label="Interior image" value={form.interiorImage} onChange={(event) => upload(event, 'interiorImage')} />
  </div>{error && <p className="admin-form-error">{error}</p>}<ModalActions onClose={onClose} submitLabel={editing ? 'Save vehicle' : 'Add vehicle'} /></form></Modal>
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <Field label={label}><div className="admin-image-upload"><label className="admin-upload-button"><Plus size={14} />{value ? 'Replace image' : 'Upload image'}<input type="file" accept="image/*" onChange={onChange} /></label>{value && <span className="admin-image-ready"><Check size={13} /> Added</span>}<small>Images are compressed and saved in this browser.</small></div></Field>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title"><header><div><span className="admin-eyebrow">KPM OPERATIONS</span><h2 id="admin-modal-title">{title}</h2></div><button className="admin-icon-button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></header><div className="admin-modal-body">{children}</div></section></div>
}

function ModalActions({ onClose, submitLabel }: { onClose: () => void; submitLabel: string }) {
  return <div className="admin-modal-actions"><button type="button" className="admin-secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="admin-primary-button"><Check size={15} />{submitLabel}</button></div>
}