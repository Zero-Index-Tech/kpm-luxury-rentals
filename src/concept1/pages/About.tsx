import { motion } from 'framer-motion'
import { Gem, ConciergeBell, BadgeCheck, HeartHandshake } from 'lucide-react'
import Ghost from '@/concept1/components/Ghost'
import LxrButton from '@/concept1/components/LxrButton'
import SectionHead from '@/concept1/components/SectionHead'

const EASE = [0.22, 1, 0.36, 1] as const
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

const STATS = [
  { value: '3+', label: 'Years of Excellence' },
  { value: '200+', label: 'Premium Vehicles' },
  { value: '500+', label: 'Satisfied Clients' },
  { value: '50+', label: 'Corporate Partners' },
  { value: '15+', label: 'Luxury Brands' },
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

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-lxr-gray">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={rise}>
            <h1 className="font-lxrtitle text-5xl font-semibold leading-[1.02] tracking-tight text-lxr-ink sm:text-6xl">
              The House of{' '}
              <em className="font-lxrbody font-medium italic text-lxr-olive">KPM.</em>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-lxr-muted">
              Sandton's benchmark for elite motoring — a premium private fleet, white-glove
              concierge service, and bespoke rental frameworks trusted across Gauteng for over
              three years.
            </p>
            <div className="mt-9">
              <LxrButton to="/c1/contact">Speak With Concierge</LxrButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="overflow-hidden rounded-[6px]"
          >
            <img
              src="/about-hero.jpg"
              alt="KPM Luxury Rentals Sandton showroom"
              className="aspect-[16/11] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-lxr-black text-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-6 py-16 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="text-center"
            >
              <div className="font-lxrtitle text-4xl font-semibold text-lxr-sand">{s.value}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Legacy */}
      <section className="bg-white">
        <Ghost text="Legacy" />
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-24 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead title="A Legacy of" accent="Prestige." />
          <div className="space-y-6">
            {LEGACY_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] leading-[1.8] text-lxr-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-lxr-gray">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead title="What We" accent="Stand For." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="rounded-[6px] border border-lxr-line bg-white p-8"
              >
                <p.icon className="h-7 w-7 text-lxr-olive" strokeWidth={1.6} />
                <h3 className="mt-6 font-lxrtitle text-base font-semibold text-lxr-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-lxr-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-lxr-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead
            dark
            title="Who We"
            accent="Serve."
            copy="From private enthusiasts to international missions — a bespoke rental framework for every journey."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-lxr-linedark bg-lxr-linedark sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s) => (
              <div key={s.title} className="bg-lxr-black p-9">
                <h3 className="font-lxrtitle text-base font-semibold text-lxr-sand">{s.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lxr-gray">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
          <h2 className="mx-auto max-w-3xl font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight text-lxr-ink sm:text-5xl">
            Experience the{' '}
            <em className="font-lxrbody font-medium italic text-lxr-olive">KPM Difference</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-lxr-muted">
            Connect directly with our Sandton-based concierge team to configure your custom
            itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate
            embassy leases.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LxrButton to="/c1/contact">Submit Enquiry</LxrButton>
            <LxrButton to="/c1/fleet" variant="outline">
              Browse the Fleet
            </LxrButton>
          </div>
        </div>
      </section>
    </div>
  )
}
