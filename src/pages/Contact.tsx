import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Check, Clock, Mail, MapPin, MessageCircle, Phone, Plus } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/components/PageTransition'
import Eyebrow from '@/components/Eyebrow'
import GoldButton from '@/components/GoldButton'
import CTABand from '@/components/CTABand'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { scrollToHash } from '@/lib/lenis'
import { CONTACT } from '@/lib/site'
import { cn } from '@/lib/utils'

/* ---------- data ---------- */

const VEHICLE_OPTIONS = [
  { slug: 'mercedes-amg-gt', name: 'Mercedes-AMG GT' },
  { slug: 'range-rover-sport', name: 'Range Rover Sport' },
  { slug: 'rolls-royce-ghost', name: 'Rolls-Royce Ghost' },
  { slug: 'bmw-7-series', name: 'BMW 7 Series' },
  { slug: 'porsche-911-turbo', name: 'Porsche 911 Turbo' },
  { slug: 'lamborghini-huracan', name: 'Lamborghini Huracán' },
  { slug: 'mercedes-s-class', name: 'Mercedes S-Class' },
  { slug: 'bentley-continental-gt', name: 'Bentley Continental GT' },
  { slug: 'audi-rs7', name: 'Audi RS7' },
  { slug: 'ferrari-f8-tributo', name: 'Ferrari F8 Tributo' },
  { slug: 'bespoke', name: 'Bespoke / Multiple Vehicles' },
]

const RENTAL_TYPES = [
  'Short-Term Rental',
  'Long-Term / Corporate Lease',
  'Wedding / Event',
  'Airport Transfer',
  'Chauffeur Service',
]

/** Map nav-context rental-type hints (e.g. Home services cards) to select values. */
const RENTAL_HINTS: Record<string, string> = {
  'short-term': 'Short-Term Rental',
  corporate: 'Long-Term / Corporate Lease',
  wedding: 'Wedding / Event',
  airport: 'Airport Transfer',
  chauffeur: 'Chauffeur Service',
}

const SHOWROOM_ROWS = [
  { icon: Phone, text: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, text: 'enquiries@kpmluxury.co.za', href: 'mailto:enquiries@kpmluxury.co.za' },
  { icon: Clock, text: 'Mon–Sun: 8:00 AM – 8:00 PM', href: undefined },
]

const CHANNELS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+27 (0) 11 943 8274',
    href: 'tel:+27119438274',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+27 (0) 82 990 1482',
    href: 'https://wa.me/27829901482',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'concierge@kpmluxe.co.za',
    href: 'mailto:concierge@kpmluxe.co.za',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Sandton, JHB',
    href: '#showroom',
  },
]

const FAQS = [
  {
    q: 'What documents do I need to rent a vehicle?',
    a: "All drivers require a valid South African Driver's License or an International Driving Permit (IDP), passport or national identity document, and a credit card under the primary driver's name for securing security authorizations.",
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations requested 48 hours prior to reservation dispatch receive a full credit. Short-term cancellations within 24 hours are subject to a single-day reservation fee.',
  },
  {
    q: 'Do you offer private chauffeur services?',
    a: 'Yes, KPM Luxury provides professional, security-cleared executive chauffeurs for airport transfers, corporate delegations, private events, and customized full-day itineraries.',
  },
  {
    q: 'Is comprehensive insurance included?',
    a: 'Every vehicle in our showroom is fully covered by premium comprehensive motor insurance. Standard excess reduction options and customized waivers are configured during contract finalization.',
  },
  {
    q: 'Can I rent for a wedding or event?',
    a: 'Absolutely. We coordinate customized wedding packages featuring pristine flagship models such as the Rolls-Royce Ghost, including bespoke ribbons, staging alignment, and dedicated chauffeur hosting.',
  },
  {
    q: 'Do you deliver directly to airports?',
    a: 'Yes. We coordinate direct white-glove tarmac deliveries and collections servicing OR Tambo International Airport and Lanseria Private Airport seamlessly.',
  },
]

/** Char spans carrying `kinetic-unit` so KineticHeadline's GSAP char-split
 *  animation picks them up inside a custom-accented (Fraunces italic) line. */
function chars(text: string, className?: string): ReactNode[] {
  return text.split('').map((c, i) => (
    <span key={i} className={cn('kinetic-unit inline-block will-change-transform', className)}>
      {c === ' ' ? ' ' : c}
    </span>
  ))
}

/* ---------- page ---------- */

export default function Contact() {
  return (
    <PageTransition>
      <Hero />
      <EnquirySection />
      <DispatchChannels />
      <Faq />
      <CTABand
        title="Ready to Experience Luxury?"
        accentWord="Luxury"
        copy="Connect directly with our Sandton-based concierge team to configure your custom itinerary, coordinate private airport tarmac arrivals, or secure multi-month corporate embassy leases."
        buttonLabel="Reserve Now"
        buttonTo="/contact#enquiry"
      />
    </PageTransition>
  )
}

/* ---------- Section 1 — typographic hero (contact.md §1) ---------- */
function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const sub = scope.querySelector('.contact-hero-sub')
      const glow = scope.querySelector('.contact-hero-glow')
      if (prefersReducedMotion()) {
        gsap.set([sub, glow], { opacity: 1, y: 0 })
        return
      }
      // sub fade-up 24px (1.1s); decorative glow fades in over 1.6s
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, ease: 'power3.out' },
      )
      gsap.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-ivory pb-16 pt-40">
      {/* warm taupe wash in the lower-left corner so the ivory isn't flat */}
      <div
        className="contact-hero-glow pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 15% 100%, rgba(139,124,115,0.16), transparent 55%)',
        }}
        aria-hidden
      />
      <div className="container relative">
        <Eyebrow>Curated Concierge Services</Eyebrow>
        <KineticHeadline
          as="h1"
          trigger="load"
          split="chars"
          delay={0.5}
          stagger={0.04}
          lines={[
            'Get In',
            <span key="l2">{chars('Touch', 'font-accent font-normal italic text-umber')}</span>,
          ]}
          className="mt-8 text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-charcoal"
        />
        <p className="contact-hero-sub mt-8 max-w-xl text-[15px] font-normal leading-[1.75] text-taupe md:text-base">
          We are ready to curate your luxury experience. Reach out directly to our Sandton team to
          coordinate custom itineraries and tailored agreements.
        </p>
      </div>
    </section>
  )
}

/* ---------- Section 2 — Enquiry form + showroom panel (contact.md §2) ---------- */
function EnquirySection() {
  return (
    <section id="enquiry" className="scroll-mt-[100px] bg-ivory pb-28">
      <div className="container grid gap-10 lg:grid-cols-[55fr_45fr]">
        <EnquiryForm />
        <ShowroomPanel />
      </div>
    </section>
  )
}

interface FormState {
  name: string
  email: string
  phone: string
  vehicle: string
  rentalType: string
  dates: string
  requests: string
}

type FormErrors = Partial<Record<'name' | 'email' | 'phone', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-[14px] border border-taupe-soft bg-white/60 px-4 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe/70 backdrop-blur-sm transition-all duration-300 focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-[rgba(75,71,69,0.15)]'

const selectTriggerClass =
  'h-auto w-full justify-between rounded-[14px] border-taupe-soft bg-white/60 px-4 py-3.5 text-sm font-normal text-charcoal shadow-none backdrop-blur-sm focus-visible:border-charcoal focus-visible:ring-2 focus-visible:ring-[rgba(75,71,69,0.15)] data-[placeholder]:text-taupe/70'

const selectContentClass = 'rounded-[14px] border-taupe-soft bg-[#FBFAF7] text-charcoal'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="group">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-taupe transition-colors duration-300 group-focus-within:text-charcoal">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-[11px] font-medium text-error">{error}</p>}
    </div>
  )
}

/** Framer-Motion-owned glass form card (frost materializing entrance +
 *  crossfade to confirmation). */
function EnquiryForm() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  // Pre-select vehicle from ?vehicle= (slug or name) arriving from fleet/detail pages.
  const vehicleParam = searchParams.get('vehicle')
  const preselected = vehicleParam
    ? VEHICLE_OPTIONS.find(
        (v) =>
          v.slug === vehicleParam.toLowerCase() ||
          v.name.toLowerCase() === vehicleParam.toLowerCase(),
      )?.name
    : undefined

  const rentalHint = (location.state as { rentalType?: string } | null)?.rentalType

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    vehicle: preselected ?? '',
    rentalType: (rentalHint && RENTAL_HINTS[rentalHint]) || '',
    dates: '',
    requests: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Please provide your full name.'
    if (!form.email.trim()) next.email = 'Please provide your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) next.phone = 'Please provide your phone number.'
    else if (form.phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a valid phone number.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 400)
  }

  return (
    <div className="relative">
      {/* warm gradient wash + blurred blob behind the card so the backdrop-blur visibly frosts */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8"
        style={{
          background: 'radial-gradient(circle at 20% 0%, rgba(139,124,115,0.18), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-8 h-[240px] w-[240px] rounded-full bg-[rgba(139,124,115,0.25)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-light relative rounded-[28px] p-8 shadow-glass md:p-10"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[480px] flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ink"
              >
                <Check size={26} className="text-ivory" aria-hidden />
              </motion.div>
              <h3 className="mt-8 font-display text-[1.5rem] font-bold tracking-[-0.015em] text-charcoal">
                Enquiry Received
              </h3>
              <p className="mt-4 max-w-sm text-sm font-normal leading-[1.75] text-taupe">
                Our private client concierge will contact you shortly to curate your reservation.
              </p>
              <div className="mt-10">
                <GoldButton to="/c3" variant="glass">
                  Return Home
                </GoldButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.015em] text-charcoal">
                Send a Bespoke Enquiry
              </h3>
              <p className="mt-3 text-[13px] font-normal text-taupe">
                Fill out your requirements below and our private client concierge will contact you
                shortly.
              </p>

              <motion.form
                noValidate
                onSubmit={onSubmit}
                className="mt-10 space-y-6"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.45 } },
                }}
              >
                <motion.div variants={fieldVariants}>
                  <Field label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Adrian Vance"
                      value={form.name}
                      onChange={update('name')}
                      className={cn(inputClass, errors.name && 'border-error')}
                    />
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants} className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="e.g. adrian@domain.com"
                      value={form.email}
                      onChange={update('email')}
                      className={cn(inputClass, errors.email && 'border-error')}
                    />
                  </Field>
                  <Field label="Phone Number" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. +27 (0) 82 123 4567"
                      value={form.phone}
                      onChange={update('phone')}
                      className={cn(inputClass, errors.phone && 'border-error')}
                    />
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants} className="grid gap-6 sm:grid-cols-2">
                  <Field label="Vehicle Interest">
                    <Select
                      value={form.vehicle}
                      onValueChange={(v) => setForm((f) => ({ ...f, vehicle: v }))}
                    >
                      <SelectTrigger aria-label="Vehicle Interest" className={selectTriggerClass}>
                        <SelectValue placeholder="Select your preferred flagship model" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {VEHICLE_OPTIONS.map((v) => (
                          <SelectItem key={v.slug} value={v.name} className="text-sm">
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Rental Type">
                    <Select
                      value={form.rentalType}
                      onValueChange={(v) => setForm((f) => ({ ...f, rentalType: v }))}
                    >
                      <SelectTrigger aria-label="Rental Type" className={selectTriggerClass}>
                        <SelectValue placeholder="Short-Term / Long-Term / Event" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {RENTAL_TYPES.map((r) => (
                          <SelectItem key={r} value={r} className="text-sm">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field label="Preferred Dates">
                    <input
                      type="text"
                      placeholder="e.g. 12 Oct — 15 Oct 2024"
                      value={form.dates}
                      onChange={update('dates')}
                      className={inputClass}
                    />
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field label="Special Requests">
                    <textarea
                      rows={5}
                      placeholder="Describe any chauffeur requirements, tarmac delivery or wedding scheduling details..."
                      value={form.requests}
                      onChange={update('requests')}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <button
                    type="submit"
                    disabled={submitting}
                    data-cursor
                    className="w-full rounded-full bg-ink px-8 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-umber active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
                  >
                    {submitting ? 'Submitting…' : 'Submit Enquiry'}
                  </button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

/** Right column: showroom info + map (contact.md §2). GSAP-owned entrance. */
function ShowroomPanel() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const map = el.querySelector('.showroom-map')
      if (prefersReducedMotion()) {
        gsap.set([el, map], { opacity: 1, x: 0, scale: 1 })
        return
      }
      gsap.fromTo(
        el,
        { x: 44, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
      gsap.fromTo(
        el.querySelectorAll('.showroom-row'),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
      gsap.fromTo(
        map,
        { scale: 1.04, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} id="showroom" className="scroll-mt-[100px]">
      <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.015em] text-charcoal">
        The Sandton Showroom
      </h3>
      <p className="mt-4 text-sm font-normal leading-[1.75] text-taupe">
        Located in the heart of Africa's richest square mile, our flagship showroom houses our
        premier luxury and secure performance portfolio.
      </p>
      <p className="mt-6 font-display text-[15px] font-bold tracking-[-0.01em] text-charcoal">
        82 Rivonia Road, Sandton, Johannesburg, 2196
      </p>

      <div className="mt-8 border-t border-taupe-soft pt-8">
        <ul className="space-y-4">
          {SHOWROOM_ROWS.map((row) => {
            const inner = (
              <>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(139,124,115,0.12)] transition-colors duration-300 group-hover:bg-ink">
                  <row.icon
                    size={12}
                    className="text-charcoal transition-colors duration-300 group-hover:text-ivory"
                    aria-hidden
                  />
                </span>
                {row.text}
              </>
            )
            return (
              <li key={row.text} className="showroom-row">
                {row.href ? (
                  <a
                    href={row.href}
                    data-cursor
                    className="group flex items-center gap-4 text-sm font-normal text-charcoal transition-colors duration-300 hover:text-ink"
                  >
                    {inner}
                  </a>
                ) : (
                  <span className="group flex items-center gap-4 text-sm font-normal text-charcoal">
                    {inner}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* map with showroom pin chip */}
      <div className="showroom-map group relative mt-10 overflow-hidden rounded-[20px] border border-taupe-soft">
        <img
          src="/map-sandton.jpg"
          alt="Map of Sandton showing the KPM Luxury showroom location"
          className="aspect-[10/7] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="glass-light absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal transition-shadow duration-500 group-hover:shadow-glass">
          KPM Showroom
        </span>
      </div>
    </div>
  )
}

/* ---------- Section 3 — Immediate Dispatch Channels (contact.md §3) ---------- */
function DispatchChannels() {
  return (
    <section className="bg-ivory-deep py-28">
      <div className="container">
        <div className="max-w-2xl">
          <KineticHeadline
            lines={['Immediate Dispatch Channels']}
            accentWords={['Dispatch']}
            accentClassName="font-accent font-normal italic text-umber"
            className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-taupe">
              Direct access lines for active bookings, urgent corporate logistics, and short-notice
              airport arrivals.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.1}
          y={36}
          start="top 82%"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              onClick={
                c.href.startsWith('#')
                  ? (e) => {
                      e.preventDefault()
                      scrollToHash(c.href)
                    }
                  : undefined
              }
              data-cursor
              className="group rounded-[24px] border border-taupe-soft bg-[#FBFAF7] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(75,71,69,0.4)] hover:shadow-card-lift"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(139,124,115,0.12)] transition-colors duration-500 group-hover:bg-ink">
                <c.icon
                  size={18}
                  className="text-charcoal transition-colors duration-500 group-hover:text-ivory"
                  aria-hidden
                />
              </span>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-taupe">
                {c.label}
              </p>
              <p className="mt-2 font-display text-[1.05rem] font-bold tracking-[-0.01em] text-charcoal transition-colors duration-300 group-hover:text-umber">
                {c.value}
              </p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section 4 — FAQ accordion (contact.md §4, design.md §7.10) ---------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = prefersReducedMotion()

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Rental Protocols</Eyebrow>
          <KineticHeadline
            lines={['Frequently Asked Questions']}
            accentWords={['Asked']}
            accentClassName="font-accent font-normal italic text-umber"
            className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          />
          <Reveal y={24} duration={1} delay={0.15}>
            <p className="mt-6 text-[15px] font-normal leading-[1.75] text-taupe">
              Clear terms to help guide your elite rental experience smoothly from booking
              confirmation to delivery.
            </p>
          </Reveal>
        </div>

        <Reveal staggerChildren={0.08} y={22} start="top 82%" className="mx-auto mt-14 max-w-4xl">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="group border-b border-taupe-soft transition-colors duration-300 first:border-t"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  data-cursor
                >
                  <span
                    className={cn(
                      'font-display text-[1.25rem] font-bold leading-[1.3] tracking-[-0.015em] text-charcoal transition-colors duration-300 group-hover:text-umber',
                      isOpen && 'text-umber',
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-taupe-soft text-charcoal transition-all duration-300 group-hover:border-[rgba(75,71,69,0.4)]',
                      isOpen && 'border-[rgba(75,71,69,0.4)]',
                    )}
                  >
                    <Plus
                      size={16}
                      aria-hidden
                      className={cn(
                        'transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduced ? { duration: 0.01 } : { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 text-sm font-normal leading-[1.75] text-taupe">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
