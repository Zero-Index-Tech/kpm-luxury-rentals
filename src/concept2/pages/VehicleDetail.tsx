import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
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
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/concept2/components/PageTransition'
import Eyebrow from '@/concept2/components/Eyebrow'
import GoldButton from '@/concept2/components/GoldButton'
import VehicleCard from '@/concept2/components/VehicleCard'
import IconCard from '@/concept2/components/IconCard'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { getSiblingVehicles, getVehicleDetail, resolveVehicle } from '@/concept2/lib/site'
import type { Vehicle, VehicleDetail } from '@/concept2/lib/site'
import { cn } from '@/lib/utils'

/* ---------- Static shared content (identical across vehicles, vehicle.md §4/§5) ---------- */

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
  {
    icon: Gauge,
    title: 'Unlimited Mileage',
    body: 'No restrictions on your Gauteng journeys.',
  },
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

/** Generic two-paragraph KPM curation statement for non-flagship models. */
function genericNarrative(vehicle: Vehicle, detail: VehicleDetail): [string, string] {
  return [
    `Every ${vehicle.name} in the KPM collection is hand-selected, concours-detailed, and maintained to manufacturer standard — a ${detail.descriptor.toLowerCase()} prepared for immediate departure from our Sandton showroom.`,
    'From chauffeured arrivals to self-drive weekends across Gauteng, your dedicated concierge configures every detail around your itinerary, delivering white-glove service with absolute discretion.',
  ]
}

/* ---------- Page ---------- */

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
    <PageTransition>
      <Hero vehicle={vehicle} detail={detail} heroSrc={heroSrc} />
      <GalleryStrip
        gallery={gallery}
        activeIdx={activeIdx}
        onSelect={selectThumb}
        onExpand={setLightboxIdx}
      />
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
    </PageTransition>
  )
}

/* ---------- Section 1 — Vehicle Hero (vehicle.md §1) ---------- */

function Hero({
  vehicle,
  detail,
  heroSrc,
}: {
  vehicle: Vehicle
  detail: VehicleDetail
  heroSrc: string
}) {
  const root = useRef<HTMLElement>(null)
  // image stack for the 0.5s crossfade on thumbnail swap (last = top)
  const [stack, setStack] = useState<string[]>([heroSrc])
  const firstRender = useRef(true)

  useEffect(() => {
    setStack((prev) => (prev[prev.length - 1] === heroSrc ? prev : [prev[prev.length - 1], heroSrc]))
  }, [heroSrc])

  // crossfade the incoming image over the previous one, then prune the stack
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (stack.length < 2) return
    const top = root.current?.querySelector('.hero-img-top')
    if (!top) return
    const tween = gsap.fromTo(
      top,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => setStack([heroSrc]),
      },
    )
    return () => {
      tween.kill()
    }
  }, [stack, heroSrc])

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const bg = scope.querySelector('.hero-bg')
      const sub = scope.querySelector('.hero-sub')
      const price = scope.querySelector('.hero-price')
      const rule = scope.querySelector('.hero-rule')

      if (prefersReducedMotion()) {
        gsap.set(bg, { scale: 1, opacity: 1 })
        gsap.set([sub, price], { opacity: 1, x: 0, y: 0 })
        gsap.set(rule, { scaleX: 1 })
        return
      }

      // cinematic push-out on load
      gsap.fromTo(
        bg,
        { scale: 1.08, opacity: 0.35 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
      )
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, ease: 'power3.out' },
      )
      gsap.fromTo(
        price,
        { x: 32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' },
      )
      // gold baseline rule draws along the hero bottom
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, delay: 1.4, ease: 'power3.out' },
      )

      // scrub: image parallax + content fade over the first 60vh
      gsap.to(bg, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(scope.querySelector('.hero-content'), {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: '60% top', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative -mt-[88px] flex min-h-[92vh] items-end overflow-hidden"
      aria-label={`${vehicle.name} — hero`}
    >
      {/* full-bleed imagery + overlay */}
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-bg absolute inset-[-8%]">
          {stack.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={cn(
                'absolute inset-0 h-full w-full object-cover',
                i === stack.length - 1 && 'hero-img-top',
              )}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.15) 45%, rgba(10,10,11,0.96) 100%)',
          }}
        />
      </div>

      {/* text bottom-left, price bottom-right */}
      <div className="hero-content container relative pb-20 pt-[120px]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="max-w-2xl">
            <HeroEyebrow>Showroom Flagship</HeroEyebrow>
            <KineticHeadline
              as="h1"
              trigger="load"
              split="words"
              delay={0.6}
              stagger={0.03}
              lines={[vehicle.name]}
              className="mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ivory"
            />
            <p className="hero-sub mt-5 text-[13px] font-medium uppercase tracking-[0.22em] text-ivory-secondary">
              Category: {detail.heroCategory} · {detail.descriptor}
            </p>
          </div>
          <p className="hero-price pb-2 text-right">
            <span className="font-c1serif text-[3rem] leading-none text-gold-bright">
              {vehicle.price}
            </span>
            <span className="ml-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-ivory-muted">
              /day
            </span>
          </p>
        </div>
      </div>

      <span className="hero-rule absolute bottom-0 left-0 h-px w-full origin-left bg-gold/50" aria-hidden />
    </section>
  )
}

/** Load-sequenced eyebrow (rule 0.2s, label 0.4s) for the hero. */
function HeroEyebrow({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const rule = el.querySelector('.eyebrow-rule')
      const label = el.querySelector('.eyebrow-label')
      if (prefersReducedMotion()) {
        gsap.set([rule, label], { scaleX: 1, y: 0, opacity: 1 })
        return
      }
      gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' })
      gsap.fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' },
      )
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="flex items-center gap-6">
      <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-gold" aria-hidden />
      <span className="eyebrow-label c1-eyebrow">{children}</span>
    </div>
  )
}

/* ---------- Section 2 — Gallery Strip (vehicle.md §2) ---------- */

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
  // single-image fleets render as one wide frame (vehicle.md appendix)
  if (gallery.length === 1) {
    return (
      <section className="bg-night py-10" aria-label="Vehicle gallery">
        <div className="container">
          <Reveal y={32} start="top 85%">
            <div className="group relative aspect-[16/9] overflow-hidden border border-subtle md:aspect-[21/8]">
              <img
                src={gallery[0]}
                alt="Vehicle gallery frame"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <ExpandButton onClick={() => onExpand(0)} />
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-night py-10" aria-label="Vehicle gallery">
      <div className="container">
        <Reveal
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          staggerChildren={0.1}
          y={32}
          start="top 85%"
        >
          {gallery.map((src, i) => {
            const active = i === activeIdx
            return (
              <button
                key={src}
                type="button"
                onClick={() => onSelect(i)}
                data-cursor
                aria-pressed={active}
                aria-label={`Show gallery image ${i + 1} in the hero`}
                className={cn(
                  'group relative aspect-[8/5] overflow-hidden transition-all duration-500',
                  active
                    ? 'border-2 border-gold opacity-100'
                    : 'border border-subtle opacity-60 hover:opacity-100',
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
        </Reveal>
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
      data-cursor
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
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border border-subtle bg-black/60 text-gold opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-black/80 group-hover:opacity-100"
    >
      <Expand size={14} aria-hidden />
    </span>
  )
}

/* ---------- Section 3 — Technical Data + Narrative + Rate Card (vehicle.md §3) ---------- */

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
    <section className="bg-night-elevated py-24 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left — spec grid */}
        <div>
          <Eyebrow>Technical Data</Eyebrow>
          <KineticHeadline
            as="h2"
            lines={['Engineered Excellence']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            staggerChildren={0.07}
            y={24}
            start="top 80%"
          >
            {detail.specGrid.map((cell) => (
              <div
                key={cell.label}
                className="group border border-subtle p-5 transition-colors duration-500 hover:border-[rgba(199,191,174,0.4)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted">
                  {cell.label}
                </p>
                <p className="mt-2 text-[1.05rem] font-semibold text-ivory transition-colors duration-500 group-hover:text-gold-bright">
                  {cell.value}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* right — narrative + sticky rate card */}
        <div className="relative">
          <KineticHeadline
            as="h3"
            lines={[narrativeTitle]}
            className="text-[1.75rem] font-medium leading-[1.25] text-ivory"
          />
          <Reveal className="mt-6 space-y-6" staggerChildren={0.15} y={24} start="top 82%">
            {narrative.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[15px] font-light leading-[1.75] text-ivory-secondary"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal
            y={40}
            delay={0.3}
            duration={0.8}
            start="top 88%"
            className="mt-10 lg:sticky lg:top-32"
          >
            <div className="border border-[rgba(199,191,174,0.3)] bg-surface p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                Direct Showroom Rate
              </p>
              <p className="mt-4">
                <span className="font-c1serif text-[2.25rem] leading-none text-gold-bright">
                  {vehicle.price}
                </span>
                <span className="ml-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-ivory-muted">
                  /day
                </span>
              </p>
              <div className="my-6 h-px bg-hairline" />
              {/* force GoldButton's magnetic wrapper + link to full width */}
              <div className="flex flex-col gap-3 [&_a]:w-full [&>span]:w-full">
                <GoldButton to={`/c2/contact?vehicle=${vehicle.slug}`}>Reserve This Vehicle</GoldButton>
                <GoldButton to="/c2/contact" variant="outline">
                  Speak With Concierge
                </GoldButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Premium Finishes / Equipment Chips (vehicle.md §4) ---------- */

function EquipmentSection() {
  return (
    <section className="bg-night py-24 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Premium Finishes"
          title="Fitted Fleet Equipment"
          sub="This vehicle has been individually configured to meet KPM's bespoke comfort and safety standards."
        />
        <Reveal
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.06}
          y={20}
          start="top 82%"
        >
          {EQUIPMENT.map((item) => (
            <div
              key={item}
              className="group flex items-center gap-3 border border-subtle bg-surface px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(199,191,174,0.35)]"
            >
              <CircleCheck
                size={16}
                className="shrink-0 text-gold transition-all duration-500 group-hover:fill-[rgba(199,191,174,0.25)]"
                aria-hidden
              />
              <span className="text-[13px] font-normal text-ivory">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 5 — Rental Protection / Inclusions (vehicle.md §5) ---------- */

function InclusionsSection() {
  return (
    <section className="bg-night-elevated py-24 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Rental Protection"
          title="Standard Luxury Inclusions"
          sub="At KPM Luxury Rentals, white-glove security-cleared confidence comes as standard with every flagship contract."
        />
        <Reveal
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.12}
          y={48}
          start="top 80%"
        >
          {INCLUSIONS.map((card) => (
            <IconCard key={card.title} icon={card.icon} title={card.title} body={card.body} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Sibling Models (vehicle.md §6) ---------- */

function SiblingsSection({ siblings }: { siblings: Vehicle[] }) {
  return (
    <section className="bg-night py-24 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Explore Sibling Prestige"
          title="Other Premium Flagship Models"
          sub="Exquisite luxury options maintained in pristine showroom condition, prepared for immediate departure."
        />
        <Reveal
          className="mt-12 grid gap-6 md:grid-cols-3"
          staggerChildren={0.14}
          y={56}
          start="top 80%"
        >
          {siblings.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Shared section header ---------- */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <KineticHeadline
        as="h2"
        lines={[title]}
        className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
      />
      {sub && (
        <Reveal y={24} start="top 88%">
          <p className="mt-6 text-[15px] font-light leading-[1.75] text-ivory-secondary">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- Lightbox (design.md §7.13) ---------- */

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

  // arrow-key navigation alongside Radix's built-in ESC handling
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
              data-cursor
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(199,191,174,0.4)] text-gold transition-colors duration-300 hover:border-gold hover:bg-[rgba(199,191,174,0.1)] md:left-8"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              data-cursor
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(199,191,174,0.4)] text-gold transition-colors duration-300 hover:border-gold hover:bg-[rgba(199,191,174,0.1)] md:right-8"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
              {(index ?? 0) + 1} / {images.length}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
