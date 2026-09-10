import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Expand,
  Gauge,
  PhoneCall,
  Plane,
  ShieldCheck,
} from 'lucide-react'
import LxrButton from '@/concept1/components/LxrButton'
import CarCard from '@/concept1/components/CarCard'
import SectionHead from '@/concept1/components/SectionHead'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { getSiblingVehicles, getVehicleDetail, resolveVehicle } from '@/concept1/lib/site'
import type { Vehicle, VehicleDetail } from '@/concept1/lib/site'
import { cn } from '@/lib/utils'

/* ---------- Static shared content (same information architecture as before) ---------- */

const EQUIPMENT = [
  'Anti-lock Braking System (ABS)',
  'Advanced Airbag System',
  'Dual-zone Climate Control',
  'Handcrafted Leather Interior',
  'Premium GPS Navigation',
  '360° Parking Sensors',
  'Ventilated Heated Seats',
  'Burmester Premium Sound System',
]

const INCLUSIONS = [
  { icon: Gauge, title: 'Unlimited Mileage', body: 'No restrictions on your Gauteng journeys.' },
  {
    icon: ShieldCheck,
    title: 'Full Insurance Cover',
    body: 'Comprehensive luxury vehicle cover included.',
  },
  {
    icon: PhoneCall,
    title: '24/7 Roadside Assistance',
    body: 'Instant concierge support anywhere, anytime.',
  },
  {
    icon: Plane,
    title: 'Free Airport Delivery',
    body: 'Direct handoff at OR Tambo VIP terminals.',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function genericNarrative(vehicle: Vehicle, detail: VehicleDetail): [string, string] {
  return [
    `Every ${vehicle.name} in the KPM collection is hand-selected, concours-detailed, and maintained to manufacturer standard — a ${detail.descriptor.toLowerCase()} prepared for immediate departure from our Sandton showroom.`,
    'From chauffeured arrivals to self-drive weekends across Gauteng, your dedicated concierge configures every detail around your itinerary, delivering white-glove service with absolute discretion.',
  ]
}

export default function VehicleDetailPage() {
  const { slug } = useParams()
  const vehicle = resolveVehicle(slug)
  const detail = getVehicleDetail(vehicle.slug)
  const gallery = detail.gallery

  const [activeIdx, setActiveIdx] = useState(0)
  const [heroSrc, setHeroSrc] = useState(detail.heroImage)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const selectThumb = useCallback(
    (i: number) => {
      setActiveIdx(i)
      setHeroSrc(gallery[i])
    },
    [gallery],
  )

  const siblings = getSiblingVehicles(vehicle.slug)
  const narrativeTitle = detail.narrativeTitle ?? 'The Art of Arrival'
  const narrative = detail.narrative ?? genericNarrative(vehicle, detail)

  return (
    <div className="bg-white">
      <Hero vehicle={vehicle} detail={detail} heroSrc={heroSrc} />
      <GalleryStrip gallery={gallery} activeIdx={activeIdx} onSelect={selectThumb} onExpand={setLightboxIdx} />
      <TechnicalSection
        vehicle={vehicle}
        detail={detail}
        narrativeTitle={narrativeTitle}
        narrative={narrative}
      />
      <EquipmentSection />
      <InclusionsSection />
      <SiblingsSection siblings={siblings} />
      <Lightbox
        images={gallery}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onIndexChange={setLightboxIdx}
      />
    </div>
  )
}

/* ---------- Section 1 — Vehicle Hero ---------- */

function Hero({
  vehicle,
  detail,
  heroSrc,
}: {
  vehicle: Vehicle
  detail: VehicleDetail
  heroSrc: string
}) {
  const [stack, setStack] = useState<string[]>([heroSrc])

  useEffect(() => {
    setStack((prev) =>
      prev[prev.length - 1] === heroSrc ? prev : [...prev.slice(-1), heroSrc],
    )
  }, [heroSrc])

  return (
    <section
      className="relative -mt-[76px] flex min-h-[92vh] items-end overflow-hidden bg-lxr-black"
      aria-label={`${vehicle.name} — hero`}
    >
      <div className="absolute inset-0" aria-hidden>
        {stack.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => setStack((prev) => [prev[prev.length - 1]])}
            className={cn('absolute inset-0 h-full w-full object-cover', i < stack.length - 1 && '')}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.15) 45%, rgba(11,11,12,0.96) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-20 pt-[140px]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="max-w-2xl"
          >
            <h1 className="font-lxrtitle text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.04] tracking-tight text-white">
              {vehicle.name}
            </h1>
            <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.22em] text-white/60">
              Category: {detail.heroCategory} · {detail.descriptor}
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="pb-2 text-right"
          >
            <span className="font-lxrtitle text-[2.6rem] font-semibold leading-none text-lxr-sand">
              {vehicle.price}
            </span>
            <span className="ml-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-white/50">
              /day
            </span>
          </motion.p>
        </div>
      </div>

      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-lxr-sand/50"
        aria-hidden
      />
    </section>
  )
}

/* ---------- Section 2 — Gallery Strip ---------- */

function GalleryStrip({
  gallery,
  activeIdx,
  onSelect,
  onExpand,
}: {
  gallery: string[]
  activeIdx: number
  onSelect: (i: number) => void
  onExpand: (i: number) => void
}) {
  if (gallery.length === 1) {
    return (
      <section className="bg-lxr-gray py-10" aria-label="Vehicle gallery">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-[6px] md:aspect-[21/8]">
            <img
              src={gallery[0]}
              alt="Vehicle gallery frame"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <ExpandButton onClick={() => onExpand(0)} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-lxr-gray py-10" aria-label="Vehicle gallery">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {gallery.map((src, i) => {
          const active = i === activeIdx
          return (
            <button
              key={src}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={active}
              aria-label={`Show gallery image ${i + 1} in the hero`}
              className={cn(
                'group relative aspect-[8/5] overflow-hidden rounded-[4px] transition-all duration-500',
                active
                  ? 'ring-2 ring-lxr-ink opacity-100'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={src}
                alt={`Gallery thumbnail ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <ExpandButton
                onClick={() => onExpand(i)}
                label={`Open gallery image ${i + 1} in lightbox`}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

function ExpandButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label ?? 'Open image in lightbox'}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          onClick()
        }
      }}
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-[4px] bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 group-hover:opacity-100"
    >
      <Expand size={14} aria-hidden />
    </span>
  )
}

/* ---------- Section 3 — Technical Data + Narrative + Rate Card ---------- */

function TechnicalSection({
  vehicle,
  detail,
  narrativeTitle,
  narrative,
}: {
  vehicle: Vehicle
  detail: VehicleDetail
  narrativeTitle: string
  narrative: [string, string]
}) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead title="Engineered" accent="Excellence." />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {detail.specGrid.map((cell) => (
              <div
                key={cell.label}
                className="group rounded-[4px] border border-lxr-line p-5 transition-colors duration-500 hover:border-lxr-ink/40"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lxr-mist">
                  {cell.label}
                </p>
                <p className="mt-2 font-lxrtitle text-[1.05rem] font-semibold text-lxr-ink transition-colors duration-500 group-hover:text-lxr-olive">
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <h3 className="font-lxrtitle text-[1.75rem] font-semibold leading-[1.25] text-lxr-ink">
            {narrativeTitle}
          </h3>
          <div className="mt-6 space-y-6">
            {narrative.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[15px] leading-[1.75] text-lxr-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 lg:sticky lg:top-28">
            <div className="rounded-[6px] border border-lxr-line bg-lxr-gray p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-lxr-olive">
                Direct Showroom Rate
              </p>
              <p className="mt-4">
                <span className="font-lxrtitle text-[2.25rem] font-semibold leading-none text-lxr-ink">
                  {vehicle.price}
                </span>
                <span className="ml-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-lxr-mist">
                  /day
                </span>
              </p>
              <div className="my-6 h-px bg-lxr-line" />
              <div className="flex flex-col gap-3 [&_a]:w-full [&_a]:justify-center">
                <LxrButton to={`/c1/contact?vehicle=${vehicle.slug}`}>Reserve This Vehicle</LxrButton>
                <LxrButton to="/c1/contact" variant="outline">
                  Speak With Concierge
                </LxrButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Equipment Chips ---------- */

function EquipmentSection() {
  return (
    <section className="bg-lxr-gray py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHead
          title="Fitted Fleet"
          accent="Equipment."
          copy="This vehicle has been individually configured to meet KPM's bespoke comfort and safety standards."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.map((item) => (
            <div
              key={item}
              className="group flex items-center gap-3 rounded-[4px] border border-lxr-line bg-white px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-lxr-ink/30"
            >
              <CircleCheck size={16} className="shrink-0 text-lxr-olive" aria-hidden />
              <span className="text-[13px] text-lxr-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 5 — Inclusions ---------- */

function InclusionsSection() {
  return (
    <section className="bg-lxr-black py-24 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHead
          dark
          title="Standard Luxury"
          accent="Inclusions."
          copy="At KPM Luxury Rentals, white-glove security-cleared confidence comes as standard with every flagship contract."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUSIONS.map((card) => (
            <div
              key={card.title}
              className="rounded-[6px] border border-lxr-linedark bg-lxr-panel p-7 transition-colors duration-500 hover:border-white/25"
            >
              <card.icon className="h-6 w-6 text-lxr-sand" strokeWidth={1.6} />
              <h3 className="mt-5 font-lxrtitle text-[15px] font-semibold">{card.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Sibling Models ---------- */

function SiblingsSection({ siblings }: { siblings: Vehicle[] }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHead
          title="Other Premium"
          accent="Flagship Models."
          copy="Exquisite luxury options maintained in pristine showroom condition, prepared for immediate departure."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {siblings.map((vehicle) => (
            <CarCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Lightbox ---------- */

function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const open = index !== null
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null || images.length < 2) return
      onIndexChange((index + dir + images.length) % images.length)
    },
    [index, images.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="left-0 top-0 flex h-full w-full max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-none bg-black/95 p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Vehicle gallery lightbox</DialogTitle>
        {index !== null && (
          <img
            key={images[index]}
            src={images[index]}
            alt={`Gallery image ${index + 1} of ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white/10 md:left-8"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white/10 md:right-8"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
              {(index ?? 0) + 1} / {images.length}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
