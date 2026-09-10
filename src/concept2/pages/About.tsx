import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Gem, ConciergeBell, BadgeCheck, HeartHandshake } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/concept2/components/PageTransition'
import Eyebrow from '@/concept2/components/Eyebrow'
import StatCounter from '@/concept2/components/StatCounter'
import IconCard from '@/concept2/components/IconCard'
import TestimonialCard from '@/concept2/components/TestimonialCard'
import CTABand from '@/concept2/components/CTABand'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import Parallax from '@/concept2/components/anim/Parallax'

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

      if (prefersReducedMotion()) {
        gsap.set(clip, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(img, { scale: 1 })
        gsap.set(sub, { opacity: 1, y: 0 })
        return
      }

      // image clip-reveals from the top, slight scale settle
      gsap.fromTo(
        clip,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' },
      )
      gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.4, ease: 'power3.inOut' })
      // sub fade-up after headline
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.4, ease: 'power3.out' },
      )
      // scrubbed parallax on the photo band
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
      className="relative -mt-[88px] flex min-h-[85vh] items-end overflow-hidden"
      aria-label="About KPM Luxury Rentals — hero"
    >
      {/* photo occupies the top ~55%, fading into bg-primary */}
      <div className="about-hero-clip absolute inset-x-0 top-0 h-[58%]" aria-hidden>
        <img
          src="/about-hero.jpg"
          alt=""
          className="about-hero-img h-full w-full scale-[1.06] object-cover object-top will-change-transform"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.55) 60%, #0A0A0B 100%)',
          }}
        />
      </div>

      {/* text sits bottom-left, over the dark lower half */}
      <div className="container relative pb-20 pt-[150px] md:pb-24">
        <Eyebrow>The Pillars of Prestige</Eyebrow>
        <KineticHeadline
          as="h1"
          trigger="load"
          split="words"
          delay={0.9}
          stagger={0.03}
          lines={['About KPM Luxury Rentals']}
          className="mt-8 text-[clamp(2.6rem,5.6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ivory"
        />
        <p className="about-hero-sub mt-8 max-w-xl text-base font-light leading-[1.75] text-ivory-secondary">
          Pioneering bespoke automotive luxury experiences across South Africa since day one.
          Uncompromising curation meets white-glove service.
        </p>
      </div>
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
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="border-y border-hairline bg-night-elevated py-14">
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
                className="stat-divider absolute left-0 top-1/2 hidden h-16 w-px origin-top -translate-y-1/2 bg-gold/15 lg:block"
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
        gsap.set(img, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(frame, { opacity: 1 })
        return
      }
      // image clip-reveals right → left
      gsap.fromTo(
        img,
        { clipPath: 'inset(0% 0% 0% 100%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
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
    <section ref={ref} className="bg-night py-24 md:py-32">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div>
          <Eyebrow>Our Legacy</Eyebrow>
          <KineticHeadline
            lines={['Luxury Lived. Memories Captured.']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal staggerChildren={0.18} y={24} start="top 78%" className="mt-10 space-y-6">
            {LEGACY_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* showroom image with offset gold hairline frame (16px up-right) */}
        <div className="group relative">
          <span
            aria-hidden
            className="legacy-frame absolute -right-4 -top-4 h-full w-full border border-hairline transition-colors duration-700 group-hover:border-[rgba(199,191,174,0.45)]"
          />
          <div className="legacy-clip relative overflow-hidden">
            <Parallax from={-6} to={6} className="relative">
              <img
                src="/showroom-interior.jpg"
                alt="The KPM Luxury showroom lounge in Sandton at night"
                className="aspect-[6/5] w-full scale-[1.12] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.15]"
                loading="lazy"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Core Value Pillars (about.md §4) ---------- */
function Pillars() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      gsap.fromTo(
        el.querySelectorAll('.icon-chip'),
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: { trigger: el.querySelector('.pillars-grid'), start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="bg-night-elevated py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Our Foundations</Eyebrow>
          <KineticHeadline
            lines={['Our Core Value Pillars']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              Crafting unmatched automotive journeys requires an absolute commitment to service
              fundamentals.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.12}
          y={48}
          start="top 80%"
          className="pillars-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((p) => (
            <IconCard key={p.title} icon={p.icon} title={p.title} body={p.body} />
          ))}
        </Reveal>
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
      if (prefersReducedMotion()) {
        gsap.set(el.querySelectorAll('.sector-edge'), { scaleY: 1 })
        return
      }
      gsap.fromTo(
        el.querySelectorAll('.sector-edge'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el.querySelector('.sector-grid'), start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section ref={ref} className="bg-night py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Our Clients</Eyebrow>
          <KineticHeadline
            lines={['Bespoke Mobility for Every Elite Sector']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              We specialize in custom fleet architecture matched to Sandton's complex requirements.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.1}
          y={40}
          start="top 80%"
          className="sector-grid mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SECTORS.map((s) => (
            <div
              key={s.title}
              className="group relative min-h-[150px] border border-subtle bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(199,191,174,0.35)]"
            >
              {/* gold left-edge draw on reveal */}
              <span
                aria-hidden
                className="sector-edge absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gold"
              />
              <h3 className="font-c1serif text-[1.5rem] leading-[1.25] text-ivory transition-colors duration-500 group-hover:text-gold-bright">
                {s.title}
              </h3>
              <p className="mt-3 text-[13px] font-light leading-[1.75] text-ivory-secondary transition-colors duration-500 group-hover:text-ivory/80">
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
    <section className="bg-night-elevated py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Verifiable Excellence</Eyebrow>
          <KineticHeadline
            lines={['The KPM Client Experience']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              Perspectives from corporate planners, private collectors, and signature wedding
              organizers.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.15}
          y={56}
          start="top 80%"
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
