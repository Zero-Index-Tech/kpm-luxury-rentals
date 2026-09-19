import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Briefcase, Car, Check, Heart, Plane } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/components/PageTransition'
import Eyebrow from '@/components/Eyebrow'
import VehicleCard from '@/components/VehicleCard'
import StatCounter from '@/components/StatCounter'
import IconCard from '@/components/IconCard'
import TestimonialCard from '@/components/TestimonialCard'
import CTABand from '@/components/CTABand'
import GoldButton from '@/components/GoldButton'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import Parallax from '@/components/anim/Parallax'
import HeroSection from '@/pages/home/HeroSection'
import { VEHICLES } from '@/lib/site'
import { cn } from '@/lib/utils'

const STATS = [
  { value: 3, label: 'Years of Excellence' },
  { value: 200, label: 'Luxury Vehicles' },
  { value: 500, label: 'Satisfied Clients' },
  { value: 50, label: 'Corporate Partners' },
]

const SERVICES = [
  {
    icon: Car,
    title: 'Short-Term Rentals',
    body: "Drive premium for a weekend escape, business trip, or a personal statement across Johannesburg's finest quarters.",
    rentalType: 'short-term',
  },
  {
    icon: Briefcase,
    title: 'Corporate Leases',
    body: 'Tailored long-term corporate mobility solutions designed for executives, diplomats, and international embassies in Gauteng.',
    rentalType: 'corporate',
  },
  {
    icon: Heart,
    title: 'Wedding & Events',
    body: 'Arrive in peerless sophistication. Curated fleet options and chauffeur assistance specifically coordinated for your signature day.',
    rentalType: 'wedding',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    body: 'Reliable white-glove chauffeur transfers servicing OR Tambo International and Lanseria Private Airport seamlessly.',
    rentalType: 'airport',
  },
]

const CHECKLIST = [
  {
    title: 'Curated Premium Fleet',
    body: 'Every vehicle is handpicked, from high-performance AMG coupes to luxury flagship Range Rovers and Rolls-Royce model tiers.',
  },
  {
    title: 'White-Glove Concierge',
    body: 'Personalized delivery to your location, private terminal arrivals, and dedicated concierge dispatch on-call throughout Gauteng.',
  },
  {
    title: 'Flexible Rental Terms',
    body: 'Seamless, bespoke daily, weekly, or long-term multi-month corporate contracts crafted specifically to align with client needs.',
  },
  {
    title: 'Trusted by Corporates & Embassies',
    body: 'Our verified secure standards make us the exclusive transport provider for global embassies and diplomatic personnel.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'KPM handled our corporate embassy delegates for a high-profile Gauteng summit. Pristine vehicle presentation and impeccable, discreet chauffeur service throughout Sandton.',
    name: 'Dr. Adrian Vance',
    role: 'Corporate Dignitary Client',
    avatar: '/avatar-adrian.jpg',
  },
  {
    quote:
      'For our wedding, KPM provided the Rolls-Royce Ghost. From the arrival coordination to the perfect car quality, their luxury lived up to every aspect of the promise.',
    name: 'Naledi & Thabo D.',
    role: 'Wedding Client Pair',
    avatar: '/avatar-wedding.jpg',
  },
  {
    quote:
      'The only company in South Africa I trust with high-end sports cars. AMG GT delivered straight to my doorstep in pristine condition. Unmatched convenience and service.',
    name: 'Sarah Jenkins',
    role: 'Frequent Private Fleet Client',
    avatar: '/avatar-sarah.jpg',
  },
]

/**
 * Home page (home.md): Ferrari Purosangue glass hero → paired CTA bars
 * (rydex DNA) → stats band → showroom collection → dark glass services
 * band → why-KPM split → testimonials → rounded CTA slab.
 */
export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <CtaBars />
      <StatsBand />
      <Collection />
      <Services />
      <WhyKpm />
      <Testimonials />
      <MerchSection />
      <CTABand
        title="Reserve Your Luxury Experience"
        accentWord="Luxury"
        copy="Connect directly with our Sandton-based concierge team to configure your custom itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate embassy leases."
        buttonLabel="Submit Enquiry"
        buttonTo="/contact"
      />
    </PageTransition>
  )
}

/* ---------- Section 2 — Paired CTA bars (rydex DNA) ---------- */
function CtaBars() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      gsap.fromTo(
        el.querySelectorAll('.cta-bar'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 96%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} aria-label="Quick actions">
      <div className="grid md:grid-cols-2 md:divide-x md:divide-hairline-dark">
        <CtaBar to="/c3/fleet" label="Explore the Showroom" dark />
        <CtaBar to="/c3/contact" label="Get in Touch" />
      </div>
    </section>
  )
}

function CtaBar({ to, label, dark }: { to: string; label: string; dark?: boolean }) {
  return (
    <Link
      to={to}
      data-cursor
      className={cn(
        'cta-bar group flex min-h-[76px] items-center justify-between px-8 py-5 md:px-12',
        dark ? 'bg-ink theme-dark text-ivory' : 'glass-light text-copy',
      )}
    >
      <span className="text-[13px] font-bold uppercase tracking-[0.14em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.18em]">
        {label}
      </span>
      <span
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
          dark
            ? 'border-[rgba(244,242,239,0.3)] group-hover:bg-ivory group-hover:text-ink'
            : 'border-taupe-soft group-hover:bg-ink group-hover:text-ivory',
        )}
      >
        <ArrowUpRight size={18} aria-hidden />
      </span>
    </Link>
  )
}

/* ---------- Section 3 — Stats band ---------- */
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
    <section ref={ref} className="bg-taupe theme-canvas py-16">
      <div className="container grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="relative flex items-center justify-center px-4 py-4">
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

/* ---------- Section 4 — The Showroom Collection ---------- */
function Collection() {
  return (
    <section className="bg-taupe theme-canvas pb-32 pt-8">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>The Showroom Collection</Eyebrow>
            <KineticHeadline
              lines={['Curated Performance & Prestige']}
              accentWords={['Prestige']}
              accentClassName="font-accent font-normal italic text-copy-accent"
              className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-copy"
            />
            <Reveal y={24} duration={1} delay={0.15}>
              <p className="mt-6 max-w-xl text-[15px] font-normal leading-[1.75] text-copy-muted">
                Our handpicked flagship models. Maintained in pristine showroom condition,
                prepared for your immediate departure in Johannesburg.
              </p>
            </Reveal>
          </div>
          <Reveal y={16} duration={0.8} delay={0.25} className="shrink-0">
            <ArrowRowLink to="/c3/fleet" label="View Full Fleet" />
          </Reveal>
        </div>

        <Reveal staggerChildren={0.14} y={56} start="top 80%" className="mt-14 grid gap-6 md:grid-cols-3">
          {VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Arrow-row section link (design.md §7.3): caps label + circle arrow, hover fills. */
function ArrowRowLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      data-cursor
      className="group flex items-center justify-between gap-10 pb-2"
    >
      <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-copy transition-[letter-spacing] duration-300 group-hover:tracking-[0.18em]">
        {label}
      </span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe-soft text-copy transition-all duration-300 group-hover:bg-ink group-hover:text-ivory">
        <ArrowUpRight size={18} aria-hidden />
      </span>
    </Link>
  )
}

/* ---------- Section 5 — Our Services (dark glass band) ---------- */
function Services() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      const cards = el.querySelectorAll('.service-card')
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
      gsap.fromTo(
        el.querySelectorAll('.service-card .icon-chip'),
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
    <section id="services" ref={ref} className="relative scroll-mt-[100px] overflow-hidden bg-ink theme-dark py-24 md:py-32">
      <div className="taupe-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center tone="dark">
            Our Services
          </Eyebrow>
          <KineticHeadline
            lines={['Bespoke Luxury Mobility Solutions']}
            accentWords={['Luxury']}
            accentClassName="font-accent font-normal italic text-sand"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ivory"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-ivory-70">
              Whether navigating Sandton's financial hub or hosting high-profile international
              dignitaries, KPM shapes mobility around your calendar.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card">
              <IconCard
                variant="glass"
                icon={s.icon}
                title={s.title}
                body={s.body}
                to="/c3/contact"
                state={{ rentalType: s.rentalType }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Why KPM Luxury (split) ---------- */
function WhyKpm() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      // image clip-reveal + offset outline draw
      gsap.fromTo(
        el.querySelector('.why-image'),
        { clipPath: 'inset(0 100% 0 0 round 28px)' },
        {
          clipPath: 'inset(0 0% 0 0 round 28px)',
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
      gsap.fromTo(
        el.querySelector('.why-outline'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-taupe theme-canvas py-24 md:py-32">
      <div className="container grid items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-14">
        {/* image with editorial offset outline */}
        <div className="relative">
          <span
            aria-hidden
            className="why-outline absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border border-taupe-soft"
          />
          <div className="why-image relative overflow-hidden rounded-[28px]">
            <Parallax from={-5} to={5} className="absolute inset-[-8%]">
              <img
                src="/interior-dash.jpg"
                alt="Cognac leather cockpit of a KPM luxury vehicle"
                className="img-warm h-full w-full object-cover"
                loading="lazy"
              />
            </Parallax>
            <div className="relative aspect-[6/7] w-full" aria-hidden />
          </div>
        </div>

        <div>
          <Eyebrow>Why KPM Luxury</Eyebrow>
          <KineticHeadline
            lines={['Designed for Discerning Taste']}
            accentWords={['Discerning']}
            accentClassName="font-accent font-normal italic text-copy-accent"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-copy"
          />
          <Reveal staggerChildren={0.15} x={36} y={0} start="top 78%" className="mt-10 space-y-2">
            {CHECKLIST.map((item) => (
              <div
                key={item.title}
                className="group flex items-start gap-4 rounded-[16px] p-4 transition-colors duration-300 hover:bg-[rgba(128,112,104,0.06)]"
              >
                <span className="mt-1 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[rgba(128,112,104,0.12)] transition-colors duration-300 group-hover:bg-ink">
                  <Check
                    size={14}
                    className="text-copy transition-colors duration-300 group-hover:text-ivory"
                    aria-hidden
                  />
                </span>
                <div>
                  <h3 className="font-display text-[1.05rem] font-bold tracking-[-0.015em] text-copy">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-normal leading-[1.75] text-copy-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 7 — Testimonials ---------- */
function Testimonials() {
  return (
    <section className="bg-taupe theme-canvas py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Verifiable Excellence</Eyebrow>
          <KineticHeadline
            lines={['The KPM Client Experience']}
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-copy"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-copy-muted">
              Read direct perspectives from our private individuals, wedding organizers, corporate
              clients, and embassy planners across Johannesburg.
            </p>
          </Reveal>
        </div>

        <Reveal staggerChildren={0.15} y={52} start="top 80%" className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function MerchSection() {
  return (
    <section className="bg-taupe theme-canvas">
      <div className="container grid items-center gap-10 py-24 md:py-32 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <Eyebrow>KPMLXR The Wardrobe</Eyebrow>
          <KineticHeadline
            lines={['More Than a Rental.', 'A Statement.']}
            accentWords={['Statement.']}
            accentClassName="font-accent font-normal italic text-copy-accent"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-copy"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 max-w-lg text-[15px] font-normal leading-[1.75] text-copy-muted">
              Carry the feeling beyond the driver&apos;s seat. Explore the first KPMLXR collection,
              made for the road and the life around it.
            </p>
          </Reveal>
          <Reveal y={16} duration={0.8} delay={0.25} className="mt-9 flex flex-wrap gap-3">
            <GoldButton to="/c3/merch" arrow>
              Shop Brand Merch
            </GoldButton>
            <GoldButton to="/c3/about" variant="glass" arrow>
              Our Story
            </GoldButton>
          </Reveal>
        </div>
        <div className="order-1 overflow-hidden rounded-[28px] lg:order-2">
          <img
            src="/merch/Merch banner.png"
            alt="KPMLXR sand tracksuit and washed black graphic tee beside a luxury car"
            className="aspect-[4/5] w-full object-cover object-top lg:aspect-[5/6]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
