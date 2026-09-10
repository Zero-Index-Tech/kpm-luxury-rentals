import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { Gem, ConciergeBell, BadgeCheck, HeartHandshake } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/components/PageTransition'
import Eyebrow from '@/components/Eyebrow'
import StatCounter from '@/components/StatCounter'
import IconCard from '@/components/IconCard'
import TestimonialCard from '@/components/TestimonialCard'
import CTABand from '@/components/CTABand'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import Parallax from '@/components/anim/Parallax'
import { cn } from '@/lib/utils'

const STATS = [
  { value: 3, label: 'Years of Excellence' },
  { value: 200, label: 'Premium Vehicles' },
  { value: 500, label: 'Satisfied Clients' },
  { value: 50, label: 'Corporate Partners' },
  { value: 15, label: 'Luxury Brands' },
]

const LEGACY_PARAGRAPHS = [
  'Founded with a vision to redefine luxury transportation in Gauteng, KPM Luxury Rentals has established itself as the absolute benchmark for elite motoring. Our journey began with a simple yet uncompromising goal: to deliver more than just a drive—we create curated personal experiences that capture memory.',
  'Over the past three years, KPM has expanded to fulfill corporate mobility demands, private terminal chauffeured services, and signature events. Whether catering to international dignitaries or discerning private enthusiasts, our high-touch bespoke methodology guarantees excellence from booking to drop-off.',
  'Today, our state-of-the-art Sandton showroom houses a premium private fleet, managed by technical artisans who prepare each vehicle in pristine showroom condition. We continue to pioneer new service paths, ensuring our name remains synonymous with ultimate prestige across South Africa.',
]

const PILLARS = [
  {
    icon: Gem,
    title: 'Premium Fleet Curation',
    body: 'Every sports sedan, elite SUV, and ultra-prestige model undergoes exact mechanical curation to uphold our showroom quality standards.',
  },
  {
    icon: ConciergeBell,
    title: 'White-Glove Service',
    body: 'Custom personalized door-to-door delivery, private airfield terminal pickup, and dedicated elite chauffeurs on-call at all hours.',
  },
  {
    icon: BadgeCheck,
    title: 'Reliability & Trust',
    body: 'An immaculate track record partnering with international business organizations, wedding coordinators, and public ministries.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Approach',
    body: "Tailoring rental frameworks, delivery specifications, and flexible billing to align with each client's professional and personal calendar.",
  },
]

const SECTORS = [
  {
    title: 'Individual Enthusiasts',
    body: 'For those seeking the rush of precision AMG dynamics or open-top grand touring across Gauteng.',
  },
  {
    title: 'Corporate Executives',
    body: 'Immaculate premium SUV configurations ready to streamline travel for business leadership teams.',
  },
  {
    title: 'Embassy & Diplomatic',
    body: 'Vetted security solutions and custom diplomatic packages designed for international missions.',
  },
  {
    title: 'Wedding & Events',
    body: 'A majestic fleet of white-glove chauffeured flagship sedans, coordinated to your signature day.',
  },
  {
    title: 'Film & Production',
    body: 'Pristine camera-ready hero vehicles suited for television, cinema, and editorial production.',
  },
  {
    title: 'Fellow Rental Operators',
    body: 'Exclusive white-label B2B fleet logistics support to bolster local high-tier operators.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'KPM managed our executive summit delegates with absolute precision. Showroom-condition vehicles and incredibly discreet, professional chauffeurs in Sandton.',
    name: 'Dr. Adrian Vance',
    role: 'Corporate Dignitary Client',
    avatar: '/avatar-adrian.jpg',
  },
  {
    quote:
      'For our destination wedding, KPM provided a pristine Rolls-Royce Ghost. From the complex airport pickups to the main event entrance, they exceeded every luxury promise.',
    name: 'Naledi & Thabo D.',
    role: 'Wedding Client Pair',
    avatar: '/avatar-wedding.jpg',
  },
  {
    quote:
      'The only brand in South Africa I trust with high-performance coupes. Every AMG vehicle arrives at my doorstep meticulously detailed and mechanically perfect.',
    name: 'Sarah Jenkins',
    role: 'Frequent Private Fleet Client',
    avatar: '/avatar-sarah.jpg',
  },
]

/**
 * Char spans carrying the `kinetic-unit` class so KineticHeadline's GSAP
 * char-split animation picks them up — lets a custom-accented line (Fraunces
 * italic word) keep the char-rise effect.
 */
function chars(text: string, className?: string): ReactNode[] {
  return text.split('').map((c, i) => (
    <span key={i} className={cn('kinetic-unit inline-block will-change-transform', className)}>
      {c === ' ' ? ' ' : c}
    </span>
  ))
}

/**
 * About page (about.md): photographic Lamborghini-macro hero with glass chip,
 * ivory 5-stat band, legacy split with offset-rounded showroom photo, dark
 * glass value-pillars band, client-sector tiles, testimonials, CTA slab.
 */
export default function About() {
  return (
    <PageTransition>
      <Hero />
      <StatsBand />
      <Legacy />
      <Pillars />
      <Sectors />
      <Testimonials />
      <CTABand
        title="Experience the KPM Difference"
        accentWord="Difference"
        copy="Connect directly with our Sandton-based concierge team to configure your custom itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate embassy leases."
        buttonLabel="Submit Enquiry"
        buttonTo="/contact"
      />
    </PageTransition>
  )
}

/* ---------- Section 1 — Page Hero (about.md §1) ---------- */
function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const clip = scope.querySelector('.about-hero-clip')
      const img = scope.querySelector('.about-hero-img')
      const sub = scope.querySelector('.about-hero-sub')
      const chip = scope.querySelector('.about-hero-chip')

      if (prefersReducedMotion()) {
        gsap.set(clip, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(img, { scale: 1 })
        gsap.set([sub, chip], { opacity: 1, y: 0, filter: 'blur(0px)' })
        return
      }

      // image clip-reveals from the top (1.5s power3.inOut), slight scale settle
      gsap.fromTo(
        clip,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut' },
      )
      gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.5, ease: 'power3.inOut' })
      // sub fade-up after headline (1.4s)
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.4, ease: 'power3.out' },
      )
      // glass chip materializes — blur + fade (1.6s)
      gsap.fromTo(
        chip,
        { opacity: 0, filter: 'blur(8px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1, delay: 1.6, ease: 'power3.out' },
      )
      // scrubbed parallax on the photo (yPercent 0 → 10)
      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative -mt-[100px] flex min-h-[85vh] items-end overflow-hidden"
      aria-label="About KPM Luxury Rentals — hero"
    >
      {/* full-bleed near-black Lamborghini carbon macro */}
      <div className="about-hero-clip absolute inset-0" aria-hidden>
        <div className="absolute inset-[-8%]">
          <img
            src="/about-hero.jpg"
            alt=""
            className="about-hero-img h-full w-full scale-[1.06] object-cover will-change-transform"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,10,9,0.35) 0%, rgba(11,10,9,0.35) 50%, rgba(11,10,9,0.85) 100%)',
          }}
        />
      </div>

      {/* text bottom-left */}
      <div className="container relative pb-20 pt-[160px] md:pb-24">
        <Eyebrow tone="dark">The Pillars of Prestige</Eyebrow>
        <KineticHeadline
          as="h1"
          trigger="load"
          split="chars"
          delay={0.9}
          stagger={0.03}
          lines={[
            'About KPM',
            <span key="l2">
              {chars('Luxury ')}
              {chars('Rentals', 'font-accent font-normal italic text-[#B4A89E]')}
            </span>,
          ]}
          className="mt-8 text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ivory"
        />
        <p className="about-hero-sub mt-8 max-w-xl text-[15px] font-normal leading-[1.75] text-ivory-70 md:text-base">
          Pioneering bespoke automotive luxury experiences across South Africa since day one.
          Uncompromising curation meets white-glove service.
        </p>
      </div>

      {/* quiet glass brand marker, bottom-right */}
      <span className="about-hero-chip glass-dark absolute bottom-20 right-6 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory-70 md:bottom-24 md:right-10">
        Sandton · Est. 3+ Years
      </span>
    </section>
  )
}

/* ---------- Section 2 — Stats band, 5-up (about.md §2) ---------- */
function StatsBand() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      gsap.fromTo(
        el.querySelectorAll('.stat-divider'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="bg-ivory py-16">
      <div className="container grid grid-cols-2 lg:grid-cols-5">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={
              i === STATS.length - 1
                ? 'relative col-span-2 flex items-center justify-center px-4 py-4 lg:col-span-1'
                : 'relative flex items-center justify-center px-4 py-4'
            }
          >
            {i > 0 && (
              <span
                aria-hidden
                className="stat-divider absolute left-0 top-1/2 hidden h-16 w-px origin-top -translate-y-1/2 bg-taupe-soft lg:block"
              />
            )}
            <StatCounter value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Section 3 — Our Legacy split (about.md §3) ---------- */
function Legacy() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const img = el.querySelector('.legacy-clip')
      const frame = el.querySelector('.legacy-frame')
      if (prefersReducedMotion()) {
        gsap.set(img, { clipPath: 'inset(0% 0% 0% 0% round 28px)' })
        gsap.set(frame, { opacity: 1 })
        return
      }
      // image clip-reveals right → left (round 28px, 1.3s power3.inOut)
      gsap.fromTo(
        img,
        { clipPath: 'inset(0% 0% 0% 100% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
      // offset outline draws 0.2s later
      gsap.fromTo(
        frame,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* copy */}
        <div>
          <Eyebrow>Our Legacy</Eyebrow>
          <KineticHeadline
            lines={['Luxury Lived. Memories Captured.']}
            accentWords={['Captured']}
            accentClassName="font-accent font-normal italic text-umber"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal staggerChildren={0.18} y={24} start="top 78%" className="mt-10 space-y-6">
            {LEGACY_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-[15px] font-normal leading-[1.75] text-taupe">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* showroom photo with editorial offset outline (16px down-right) */}
        <div className="group relative">
          <span
            aria-hidden
            className="legacy-frame absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border border-taupe-soft transition-colors duration-700 group-hover:border-[rgba(75,71,69,0.4)]"
          />
          <div className="legacy-clip relative overflow-hidden rounded-[28px]">
            <Parallax from={-5} to={5} className="absolute inset-[-8%]">
              <img
                src="/showroom-interior.jpg"
                alt="The KPM Luxury showroom lounge in Sandton"
                className="img-warm h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </Parallax>
            <div className="relative aspect-[6/5] w-full" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Core Value Pillars, dark glass band (about.md §4) ---------- */
function Pillars() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      gsap.fromTo(
        el.querySelectorAll('.pillar-card'),
        { y: 44, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el.querySelector('.pillars-grid'), start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        el.querySelectorAll('.pillar-card .icon-chip'),
        { scale: 0.6 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: { trigger: el.querySelector('.pillars-grid'), start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="taupe-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center tone="dark">
            Our Foundations
          </Eyebrow>
          <KineticHeadline
            lines={['Our Core Value Pillars']}
            accentWords={['Value']}
            accentClassName="font-accent font-normal italic text-[#B4A89E]"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ivory"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-ivory-70">
              Crafting unmatched automotive journeys requires an absolute commitment to service
              fundamentals.
            </p>
          </Reveal>
        </div>

        <div className="pillars-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="pillar-card">
              <IconCard variant="glass" icon={p.icon} title={p.title} body={p.body} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 5 — Client sectors (about.md §5) ---------- */
function Sectors() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const dots = el.querySelectorAll('.sector-dot')
      if (prefersReducedMotion()) {
        gsap.set(dots, { scale: 1 })
        return
      }
      // 6px taupe dot at each tile's top-right scales in as the tile lands
      gsap.fromTo(
        dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: { trigger: el.querySelector('.sector-grid'), start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Our Clients</Eyebrow>
          <KineticHeadline
            lines={['Bespoke Mobility for Every Elite Sector']}
            accentWords={['Elite']}
            accentClassName="font-accent font-normal italic text-umber"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-taupe">
              We specialize in custom fleet architecture matched to Sandton's complex requirements.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.1}
          y={36}
          start="top 80%"
          className="sector-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SECTORS.map((s) => (
            <div
              key={s.title}
              className="group relative min-h-[150px] rounded-[24px] border border-taupe-soft bg-[#FBFAF7] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(75,71,69,0.4)] hover:shadow-card-lift"
            >
              <span
                aria-hidden
                className="sector-dot absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-taupe"
              />
              <h3 className="font-display text-[1.4rem] font-bold leading-[1.15] tracking-[-0.015em] text-charcoal transition-colors duration-500 group-hover:text-umber">
                {s.title}
              </h3>
              <p className="mt-3 text-[13px] font-normal leading-[1.75] text-taupe transition-colors duration-500 group-hover:text-umber">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Testimonials (about.md §6) ---------- */
function Testimonials() {
  return (
    <section className="bg-ivory-deep py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Verifiable Excellence</Eyebrow>
          <KineticHeadline
            lines={['The KPM Client Experience']}
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-taupe">
              Perspectives from corporate planners, private collectors, and signature wedding
              organizers.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.15}
          y={52}
          start="top 80%"
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
