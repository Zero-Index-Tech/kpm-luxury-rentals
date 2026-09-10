import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Briefcase, Car, CircleCheck, Heart, Plane } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/concept2/components/PageTransition'
import Eyebrow from '@/concept2/components/Eyebrow'
import GoldButton from '@/concept2/components/GoldButton'
import VehicleCard from '@/concept2/components/VehicleCard'
import StatCounter from '@/concept2/components/StatCounter'
import IconCard from '@/concept2/components/IconCard'
import TestimonialCard from '@/concept2/components/TestimonialCard'
import CTABand from '@/concept2/components/CTABand'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import Parallax from '@/concept2/components/anim/Parallax'
import HeroSection from '@/concept2/pages/home/HeroSection'
import { VEHICLES } from '@/concept2/lib/site'

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

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsBand />
      <Collection />
      <Services />
      <WhyKpm />
      <Testimonials />
      <CTABand
        title="Reserve Your Luxury Experience"
        copy="Connect directly with our Sandton-based concierge team to configure your custom itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate embassy leases."
        buttonLabel="Submit Enquiry"
        buttonTo="/contact"
      />
    </PageTransition>
  )
}

/* ---------- Section 2 — Stats band ---------- */
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
      <div className="container grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="relative flex items-center justify-center px-4 py-4">
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

/* ---------- Section 3 — The Showroom Collection ---------- */
function Collection() {
  return (
    <section className="bg-night py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>The Showroom Collection</Eyebrow>
            <KineticHeadline
              lines={['Curated Performance & Prestige']}
              className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
            />
            <Reveal y={24} className="mt-6">
              <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
                Our handpicked flagship models. Maintained in pristine showroom condition, prepared
                for your immediate departure in Johannesburg.
              </p>
            </Reveal>
          </div>
          <Reveal y={24} delay={0.15}>
            <GoldButton to="/c2/fleet" variant="outline">
              View Full Fleet
            </GoldButton>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.14}
          y={60}
          start="top 80%"
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {VEHICLES.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 4 — Our Services (#services) ---------- */
function Services() {
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
          scrollTrigger: { trigger: el.querySelector('.services-grid'), start: 'top 80%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <section id="services" ref={ref} className="scroll-mt-[88px] bg-night-elevated py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Our Services</Eyebrow>
          <KineticHeadline
            lines={['Bespoke Luxury Mobility Solutions']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              Whether navigating Sandton's financial hub or hosting high-profile international
              dignitaries, KPM shapes mobility around your calendar.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.12}
          y={48}
          start="top 80%"
          className="services-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <IconCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              body={s.body}
              to="/c2/contact"
              state={{ rentalType: s.rentalType }}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 5 — Why KPM Luxury (split) ---------- */
function WhyKpm() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const img = el.querySelector('.why-clip')
      const frame = el.querySelector('.why-frame')
      if (prefersReducedMotion()) {
        gsap.set([img, frame], { clipPath: 'inset(0 0% 0 0)', opacity: 1 })
        return
      }
      gsap.fromTo(
        img,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
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
      <div className="container grid items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
        {/* image with offset gold matting frame */}
        <div className="relative">
          <span
            aria-hidden
            className="why-frame absolute -left-4 -top-4 h-full w-full border border-hairline"
          />
          <div className="why-clip relative overflow-hidden">
            <Parallax from={-6} to={6} className="relative">
              <img
                src="/interior-dash.jpg"
                alt="Cognac leather cockpit of a KPM luxury vehicle"
                className="aspect-[6/7] w-full scale-[1.12] object-cover"
                loading="lazy"
              />
            </Parallax>
          </div>
        </div>

        {/* copy + checklist */}
        <div>
          <Eyebrow>Why KPM Luxury</Eyebrow>
          <KineticHeadline
            lines={['Designed for Discerning Taste']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal staggerChildren={0.15} x={40} y={0} start="top 78%" className="mt-10 space-y-8">
            {CHECKLIST.map((item) => (
              <div
                key={item.title}
                className="group flex gap-4 p-3 -m-3 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <CircleCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-gold transition-colors duration-300 group-hover:text-gold-bright"
                  aria-hidden
                />
                <div>
                  <h3 className="text-[15px] font-semibold text-ivory">{item.title}</h3>
                  <p className="mt-2 text-sm font-light leading-[1.75] text-ivory-secondary">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 6 — Testimonials ---------- */
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
              Read direct perspectives from our private individuals, wedding organizers, corporate
              clients, and embassy planners across Johannesburg.
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
