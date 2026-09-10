import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  Car,
  CircleCheck,
  Clock,
  Heart,
  KeyRound,
  Plane,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import Ghost from '@/concept1/components/Ghost'
import LxrButton from '@/concept1/components/LxrButton'
import SectionHead from '@/concept1/components/SectionHead'
import CarCard from '@/concept1/components/CarCard'
import { VEHICLES } from '@/concept1/lib/site'

const EASE = [0.22, 1, 0.36, 1] as const

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

const SERVICES = [
  {
    icon: Car,
    title: 'Short-Term Rentals',
    body: "Drive premium for a weekend escape, business trip, or a personal statement across Johannesburg's finest quarters.",
    tone: 'bg-white text-lxr-ink',
    iconTone: 'text-lxr-olive',
  },
  {
    icon: Briefcase,
    title: 'Corporate Leases',
    body: 'Tailored long-term corporate mobility solutions designed for executives, diplomats, and international embassies in Gauteng.',
    tone: 'bg-lxr-olive text-white',
    iconTone: 'text-white',
  },
  {
    icon: Heart,
    title: 'Wedding & Events',
    body: 'Arrive in peerless sophistication. Curated fleet options and chauffeur assistance specifically coordinated for your signature day.',
    tone: 'bg-lxr-black text-white',
    iconTone: 'text-lxr-sand',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    body: 'Reliable white-glove chauffeur transfers servicing OR Tambo International and Lanseria Private Airport seamlessly.',
    tone: 'bg-lxr-gray text-lxr-ink',
    iconTone: 'text-lxr-olive',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Choose Your Vehicle',
    body: 'Browse the flagship fleet and select the model that fits your journey — from AMG coupes to chauffeured Rolls-Royce.',
  },
  {
    n: '02',
    title: 'Configure With Concierge',
    body: 'Our Sandton concierge confirms availability, delivery location, chauffeur options and bespoke rental terms within hours.',
  },
  {
    n: '03',
    title: 'Drive. We Handle the Rest',
    body: 'Your vehicle arrives detailed to showroom standard, fully insured, with 24/7 concierge support for the duration of your rental.',
  },
]

const PERKS = [
  { icon: Truck, title: 'Free Delivery', body: 'Door-to-door delivery and collection across Gauteng.' },
  { icon: ShieldCheck, title: 'Fully Insured', body: 'Comprehensive cover included on every rental.' },
  { icon: Clock, title: '24/7 Concierge', body: 'A dedicated line for the life of your booking.' },
  { icon: KeyRound, title: 'Chauffeur Ready', body: 'Vetted professional chauffeurs on request.' },
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

const STATS = [
  { value: '3+', label: 'Years of Excellence' },
  { value: '200+', label: 'Luxury Vehicles' },
  { value: '500+', label: 'Satisfied Clients' },
  { value: '50+', label: 'Corporate Partners' },
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
    <div>
      {/* ---------- Hero ---------- */}
      <section className="bg-lxr-gray">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-20">
          <motion.div initial="hidden" animate="show" variants={rise}>
            <p className="font-lxrtitle text-lg font-semibold text-lxr-ink sm:text-xl">
              Welcome to KPMLXR
            </p>
            <h1 className="mt-3 font-lxrtitle text-5xl font-semibold leading-[1.02] tracking-tight text-lxr-ink sm:text-6xl lg:text-7xl">
              Luxury in <em className="font-lxrbody font-medium italic text-lxr-olive">Motion.</em>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-lxr-muted">
              Johannesburg's premier luxury car rental house. A hand-picked flagship fleet,
              white-glove concierge service, and delivery to your door — every journey, elevated.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LxrButton to="/c1/fleet">Explore Our Fleet</LxrButton>
              <LxrButton to="/c1/contact" variant="outline">
                Get a Quote
              </LxrButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[6px]">
              <img
                src="/lxr-hero-new.jpg"
                alt="Porsche 911 in a modern concrete architectural space"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-[4px] bg-lxr-black px-5 py-4 text-white shadow-xl">
              <div className="font-lxrtitle text-sm font-semibold">200+ Premium Vehicles</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/50">
                Sandton · Johannesburg
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="scroll-mt-24 bg-white">
        <Ghost text="Services" />
        <div className="mx-auto max-w-[1280px] px-6 pb-24">
          <SectionHead
            title="Everything Handled."
            accent="Beautifully."
            copy="From a single weekend to multi-month embassy contracts — one call to our concierge covers the vehicle, the chauffeur, and the delivery."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className={`flex min-h-[240px] flex-col justify-between rounded-[6px] p-7 ${s.tone}`}
              >
                <s.icon className={`h-7 w-7 ${s.iconTone}`} strokeWidth={1.6} />
                <div>
                  <h3 className="font-lxrtitle text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed opacity-70">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-lxr-gray">
        <Ghost text="How it works" />
        <div className="mx-auto max-w-[1280px] px-6 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead title="Three Steps." accent="Zero Friction." />
            <LxrButton to="/c1/contact" variant="outline" className="mb-2">
              Start a Booking
            </LxrButton>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-lxr-line bg-lxr-line md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="bg-white p-9"
              >
                <div className="font-lxrtitle text-4xl font-semibold text-[#D9D9D4]">
                  {s.n}
                </div>
                <h3 className="mt-5 font-lxrtitle text-lg font-semibold text-lxr-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-lxr-muted">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Fleet preview ---------- */}
      <section className="bg-white">
        <Ghost text="The fleet" />
        <div className="mx-auto max-w-[1280px] px-6 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              title="A Fleet"
              accent="Worth Arriving In."
              copy="Flagship performance coupes, executive saloons and ultra-prestige marques — maintained to showroom standard."
            />
            <Link
              to="/c1/fleet"
              className="group mb-2 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-lxr-ink"
            >
              View Full Fleet
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VEHICLES.map((v) => (
              <CarCard key={v.slug} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Olive perks band ---------- */}
      <section className="bg-lxr-olive text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex gap-4"
            >
              <p.icon className="mt-1 h-6 w-6 shrink-0" strokeWidth={1.6} />
              <div>
                <h3 className="font-lxrtitle text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/75">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- White-glove split ---------- */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[6px]">
            <img
              src="/car-bmw-7.jpg"
              alt="BMW 7 Series prepared for white-glove delivery"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <SectionHead
              title="The White-Glove"
              accent="Standard."
              copy="Every KPM rental is a full-service engagement — prepared, delivered and supported by our Sandton concierge team."
            />
            <ul className="mt-9 space-y-6">
              {CHECKLIST.map((c) => (
                <li key={c.title} className="flex gap-4">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-lxr-olive" />
                  <div>
                    <h4 className="font-lxrtitle text-[15px] font-semibold text-lxr-ink">
                      {c.title}
                    </h4>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-lxr-muted">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Dark mission / stats band ---------- */}
      <section className="bg-lxr-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h2 className="font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Built on Prestige.
                <br />
                <em className="font-lxrbody font-medium italic text-lxr-sand">
                  Driven by Service.
                </em>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
                From our Sandton showroom, KPM Luxury Rentals has become the benchmark for elite
                motoring in Gauteng — trusted by corporates, embassies, wedding coordinators and
                private enthusiasts alike.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-lxr-linedark bg-lxr-linedark">
              {STATS.map((s) => (
                <div key={s.label} className="bg-lxr-black p-8">
                  <div className="font-lxrtitle text-4xl font-semibold text-white">{s.value}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="bg-lxr-gray">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead title="Client" accent="Words." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-col justify-between rounded-[6px] border border-lxr-line bg-white p-8"
              >
                <blockquote className="text-[14px] leading-relaxed text-lxr-ink/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-lxrtitle text-sm font-semibold text-lxr-ink">
                      {t.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-lxr-mist">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Lifestyle split ---------- */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight text-lxr-ink sm:text-5xl">
              More Than a Rental.
              <br />
              <em className="font-lxrbody font-medium italic text-lxr-olive">A Statement.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-lxr-muted">
              Whether it's an AMG for the weekend, a Ghost for your wedding day, or a discreet
              chauffeured arrival at Lanseria — the vehicle you arrive in says everything. KPMLXR
              makes sure it says the right thing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LxrButton to="/c1/about">Our Story</LxrButton>
              <LxrButton to="/c1/merch" variant="outline">
                Shop Brand Merch
              </LxrButton>
            </div>
          </div>
          <div className="order-1 overflow-hidden rounded-[6px] lg:order-2">
            <img
              src="/lxr-lifestyle.jpg"
              alt="KPMLXR lifestyle — evening arrival"
              className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-lxr-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
          <h2 className="mx-auto max-w-3xl font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Reserve Your{' '}
            <em className="font-lxrbody font-medium italic text-lxr-sand">Luxury Experience</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/60">
            Connect directly with our Sandton-based concierge team to configure your custom
            itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate
            embassy leases.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LxrButton to="/c1/contact" variant="light">
              Submit Enquiry
            </LxrButton>
            <LxrButton to="/c1/fleet" variant="outlineLight">
              Browse the Fleet
            </LxrButton>
          </div>
        </div>
      </section>
    </div>
  )
}
