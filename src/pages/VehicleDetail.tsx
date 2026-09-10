import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Gauge,
  PhoneCall,
  Plane,
  ShieldCheck,
} from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/components/PageTransition'
import Eyebrow from '@/components/Eyebrow'
import GoldButton from '@/components/GoldButton'
import VehicleCard from '@/components/VehicleCard'
import IconCard from '@/components/IconCard'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { getSiblingVehicles, getVehicleDetail, resolveVehicle } from '@/lib/site'
import type { Vehicle, VehicleDetail } from '@/lib/site'
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
        gsap.set([sub, price], { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' })
        gsap.set(rule, { scaleX: 1 })
        return
      }

      // cinematic push-out on load
      gsap.fromTo(
        bg,
        { scale: 1.08, opacity: 0.35 },
        { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' },
      )
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, ease: 'power3.out' },
      )
      // glass price chip materializes — rise + frost blur resolving
      gsap.fromTo(
        price,
        { y: 28, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, delay: 1.2, ease: 'power3.out' },
      )
      // ivory baseline rule draws along the hero bottom
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, delay: 1.4, ease: 'power3.out' },
      )

      // scrub: image parallax + content fade over the first 60vh
      gsap.to(bg, {
        yPercent: 12,
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
      className="relative -mt-[100px] flex min-h-[92vh] items-end overflow-hidden"
      aria-label={`${vehicle.name} — hero`}
    >
      {/* full-bleed imagery + dark legibility gradient */}
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
              'linear-gradient(180deg, rgba(11,10,9,0.5) 0%, rgba(11,10,9,0.1) 45%, rgba(11,10,9,0.9) 100%)',
          }}
        />
      </div>

      {/* text bottom-left, glass price chip bottom-right */}
      <div className="hero-content container relative pb-20 pt-[160px]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="max-w-2xl">
            <HeroEyebrow>Showroom Flagship</HeroEyebrow>
            <KineticHeadline
              as="h1"
              trigger="load"
              split={vehicle.name.length <= 20 ? 'chars' : 'words'}
              delay={0.6}
              stagger={0.03}
              lines={[vehicle.name]}
              className="mt-6 text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ivory"
            />
            <p className="hero-sub mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory-70">
              Category: {detail.heroCategory} · {detail.descriptor}
            </p>
          </div>

          {/* glass price chip (glass-dark over imagery, design.md §2) */}
          <div className="hero-price glass-dark rounded-[20px] px-7 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-ivory-45">
              Direct Showroom Rate
            </p>
            <p className="mt-2">
              <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.02em] text-ivory">
                {vehicle.price}
              </span>
              <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory-45">
                /day
              </span>
            </p>
          </div>
        </div>
      </div>

      <span
        className="hero-rule absolute bottom-0 left-0 h-px w-full origin-left bg-[rgba(244,242,239,0.2)]"
        aria-hidden
      />
    </section>
  )
}

/** Load-sequenced eyebrow (rule 0.2s, label 0.4s) for the dark hero. */
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
    <div ref={ref} className="flex items-center gap-4">
      <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-ivory-45" aria-hidden />
      <span className="eyebrow-label eyebrow eyebrow-on-dark">{children}</span>
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
  // single-image fleets render as one wide rounded frame (vehicle.md appendix)
  if (gallery.length === 1) {
    return (
      <section className="bg-ivory py-10" aria-label="Vehicle gallery">
        <div className="container">
          <Reveal y={28} start="top 85%">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-[24px] border border-taupe-soft md:aspect-[21/8]">
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
    <section className="bg-ivory py-10" aria-label="Vehicle gallery">
      <div className="container">
        <Reveal
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          staggerChildren={0.1}
          y={28}
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
                  'group relative aspect-[8/5] overflow-hidden rounded-[18px] transition-all duration-500',
                  active
                    ? 'border-2 border-charcoal opacity-100'
                    : 'border border-taupe-soft opacity-60 hover:opacity-100',
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
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(244,242,239,0.72)] text-charcoal opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-ivory group-hover:opacity-100"
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
  const rateRef = useRef<HTMLDivElement>(null)

  // rate card materializes: rise 36px + frost blur resolving (glass entrance §5)
  useGSAP(
    () => {
      const el = rateRef.current
      if (!el) return
      if (prefersReducedMotion()) {
        gsap.set(el, { y: 0, opacity: 1, filter: 'blur(0px)' })
        return
      }
      gsap.fromTo(
        el,
        { y: 36, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    },
    { scope: rateRef },
  )

  return (
    <section className="bg-ivory-deep py-24 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left — spec grid */}
        <div>
          <Eyebrow>Technical Data</Eyebrow>
          <KineticHeadline
            as="h2"
            lines={['Engineered Excellence']}
            accentWords={['Engineered']}
            accentClassName="font-accent font-normal italic text-umber"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            staggerChildren={0.07}
            y={22}
            start="top 80%"
          >
            {detail.specGrid.map((cell) => (
              <div
                key={cell.label}
                className="group rounded-[18px] border border-taupe-soft bg-[#FBFAF7] p-5 transition-colors duration-500 hover:border-[rgba(75,71,69,0.4)]"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-taupe">
                  {cell.label}
                </p>
                <p className="mt-2 font-display text-[1rem] font-bold leading-tight text-charcoal transition-colors duration-500 group-hover:text-umber">
                  {cell.value}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* right — narrative + sticky frosted-glass rate card */}
        <div className="relative">
          <KineticHeadline
            as="h3"
            lines={[narrativeTitle]}
            className="text-[1.6rem] font-bold leading-[1.15] tracking-[-0.015em] text-charcoal"
          />
          <Reveal className="mt-6 space-y-6" staggerChildren={0.15} y={24} start="top 82%">
            {narrative.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[15px] font-normal leading-[1.75] text-taupe"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="mt-10 lg:sticky lg:top-32">
            <div ref={rateRef} className="glass-light rounded-[24px] p-8 shadow-glass">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-taupe">
                Direct Showroom Rate
              </p>
              <p className="mt-4">
                <span className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.02em] text-charcoal">
                  {vehicle.price}
                </span>
                <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                  /day
                </span>
              </p>
              <div className="my-6 h-px bg-taupe-soft" />
              {/* force GoldButton's magnetic wrapper + link to full width */}
              <div className="flex flex-col gap-3 [&_a]:w-full [&>span]:w-full">
                <GoldButton to={`/c3/contact?vehicle=${vehicle.slug}`}>Reserve This Vehicle</GoldButton>
                <GoldButton to="/c3/contact" variant="glass">
                  Speak With Concierge
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Premium Finishes / Equipment Chips (vehicle.md §4) ---------- */

function EquipmentSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const chips = el.querySelectorAll('.equip-chip')
      const checks = el.querySelectorAll('.equip-check')
      if (prefersReducedMotion()) {
        gsap.set([...chips, ...checks], { y: 0, opacity: 1, scale: 1 })
        return
      }
      gsap.fromTo(
        chips,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      )
      // check circles pop as each chip lands
      gsap.fromTo(
        checks,
        { scale: 0.5 },
        {
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.25,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Premium Finishes"
          title="Fitted Fleet Equipment"
          sub="This vehicle has been individually configured to meet KPM's bespoke comfort and safety standards."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.map((item) => (
            <div
              key={item}
              className="equip-chip group flex items-center gap-3 rounded-full border border-taupe-soft bg-[#FBFAF7] px-5 py-3.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(75,71,69,0.45)]"
            >
              <span className="equip-check flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(139,124,115,0.12)] transition-colors duration-500 group-hover:bg-ink">
                <Check
                  size={12}
                  strokeWidth={3}
                  className="text-charcoal transition-colors duration-500 group-hover:text-ivory"
                  aria-hidden
                />
              </span>
              <span className="text-[13px] font-medium text-charcoal">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 5 — Rental Protection / Inclusions, dark glass band (vehicle.md §5) ---------- */

function InclusionsSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const cards = el.querySelectorAll('.inclusion-card')
      const chips = el.querySelectorAll('.inclusion-card .icon-chip')
      if (prefersReducedMotion()) {
        gsap.set([...cards, ...chips], { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' })
        return
      }
      gsap.fromTo(
        cards,
        { y: 44, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )
      // icon chips pop after the cards land
      gsap.fromTo(
        chips,
        { scale: 0.6 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 md:py-28">
      <div className="taupe-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative">
        <SectionHeader
          tone="dark"
          eyebrow="Rental Protection"
          title="Standard Luxury Inclusions"
          accentWord="Luxury"
          sub="At KPM Luxury Rentals, white-glove security-cleared confidence comes as standard with every flagship contract."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUSIONS.map((card) => (
            <div key={card.title} className="inclusion-card">
              <IconCard variant="glass" icon={card.icon} title={card.title} body={card.body} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Sibling Models (vehicle.md §6) ---------- */

function SiblingsSection({ siblings }: { siblings: Vehicle[] }) {
  return (
    <section className="bg-ivory py-24 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Explore Sibling Prestige"
          title="Other Premium Flagship Models"
          sub="Exquisite luxury options maintained in pristine showroom condition, prepared for immediate departure."
        />
        <Reveal
          className="mt-12 grid gap-6 md:grid-cols-3"
          staggerChildren={0.14}
          y={52}
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

function SectionHeader({
  eyebrow,
  title,
  sub,
  tone = 'light',
  accentWord,
}: {
  eyebrow: string
  title: string
  sub?: string
  tone?: 'light' | 'dark'
  accentWord?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className="max-w-2xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <KineticHeadline
        as="h2"
        lines={[title]}
        accentWords={accentWord ? [accentWord] : undefined}
        accentClassName={
          dark ? 'font-accent font-normal italic text-[#B4A89E]' : 'font-accent font-normal italic text-umber'
        }
        className={cn(
          'mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em]',
          dark ? 'text-ivory' : 'text-charcoal',
        )}
      />
      {sub && (
        <Reveal y={24} start="top 88%">
          <p
            className={cn(
              'mt-6 text-[15px] font-normal leading-[1.75]',
              dark ? 'text-ivory-70' : 'text-taupe',
            )}
          >
            {sub}
          </p>
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
        className="left-0 top-0 flex h-full w-full max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-none bg-[rgba(11,10,9,0.95)] p-0 backdrop-blur-md sm:max-w-none"
      >
        <DialogTitle className="sr-only">Vehicle gallery lightbox</DialogTitle>
        {index !== null && (
          <img
            key={images[index]}
            src={images[index]}
            alt={`Gallery image ${index + 1} of ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] rounded-[20px] object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              data-cursor
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink transition-all duration-300 hover:scale-105 md:left-8"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              data-cursor
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink transition-all duration-300 hover:scale-105 md:right-8"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.35em] text-ivory">
              {(index ?? 0) + 1} / {images.length}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
