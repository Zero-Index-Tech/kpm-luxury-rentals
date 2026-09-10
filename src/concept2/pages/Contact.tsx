import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  CircleCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
} from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import PageTransition from '@/concept2/components/PageTransition'
import Eyebrow from '@/concept2/components/Eyebrow'
import GoldButton from '@/concept2/components/GoldButton'
import CTABand from '@/concept2/components/CTABand'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CONTACT } from '@/concept2/lib/site'
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
      const rule = scope.querySelector('.eyebrow-rule')
      const label = scope.querySelector('.eyebrow-label')
      const sub = scope.querySelector('.contact-hero-sub')
      const glow = scope.querySelector('.contact-hero-glow')
      if (prefersReducedMotion()) {
        gsap.set([rule, label, sub, glow], { opacity: 1, scaleX: 1, y: 0 })
        return
      }
      gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' },
      )
      gsap.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: 'power3.out' },
      )
      gsap.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-night pb-16 pt-40">
      <div
        className="contact-hero-glow gold-glow pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="container relative">
        <div className="flex items-center gap-6">
          <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-gold" aria-hidden />
          <span className="eyebrow-label c1-eyebrow">Curated Concierge Services</span>
        </div>
        <KineticHeadline
          as="h1"
          trigger="load"
          split="words"
          delay={0.5}
          stagger={0.04}
          lines={['Get In Touch']}
          className="mt-8 text-[clamp(2.6rem,5.6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ivory"
        />
        <p className="contact-hero-sub mt-8 max-w-xl text-base font-light leading-[1.75] text-ivory-secondary">
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
    <section id="enquiry" className="scroll-mt-[88px] bg-night pb-28">
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
  'w-full rounded-[2px] border border-subtle bg-[#0D0D10] px-4 py-3.5 text-sm text-ivory placeholder:text-ivory-muted transition-all duration-300 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30'

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
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted transition-colors duration-300 group-focus-within:text-gold">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-[11px] text-error">{error}</p>}
    </div>
  )
}

/** Framer-Motion-owned form card (entrance rise + crossfade to confirmation). */
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="border border-subtle bg-surface p-8 md:p-10"
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
            >
              <CircleCheck size={56} className="text-gold" aria-hidden />
            </motion.div>
            <h3 className="mt-8 font-c1serif text-[1.6rem] text-ivory">Enquiry Received</h3>
            <p className="mt-4 max-w-sm text-sm font-light leading-[1.75] text-ivory-secondary">
              Our private client concierge will contact you shortly to curate your reservation.
            </p>
            <div className="mt-10">
              <GoldButton to="/c2" variant="outline">
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
            <h3 className="font-c1serif text-[1.6rem] text-ivory">Send a Bespoke Enquiry</h3>
            <p className="mt-3 text-[13px] font-light text-ivory-secondary">
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
                    <SelectTrigger
                      aria-label="Vehicle Interest"
                      className="h-auto w-full justify-between rounded-[2px] border-subtle bg-[#0D0D10] px-4 py-3.5 text-sm font-light text-ivory shadow-none focus:border-gold focus:ring-1 focus:ring-gold/30 data-[placeholder]:text-ivory-muted"
                    >
                      <SelectValue placeholder="Select your preferred flagship model" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[2px] border-subtle bg-surface text-ivory">
                      {VEHICLE_OPTIONS.map((v) => (
                        <SelectItem key={v.slug} value={v.name} className="text-sm font-light">
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
                    <SelectTrigger
                      aria-label="Rental Type"
                      className="h-auto w-full justify-between rounded-[2px] border-subtle bg-[#0D0D10] px-4 py-3.5 text-sm font-light text-ivory shadow-none focus:border-gold focus:ring-1 focus:ring-gold/30 data-[placeholder]:text-ivory-muted"
                    >
                      <SelectValue placeholder="Short-Term / Long-Term / Event" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[2px] border-subtle bg-surface text-ivory">
                      {RENTAL_TYPES.map((r) => (
                        <SelectItem key={r} value={r} className="text-sm font-light">
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
                  className="btn-sheen w-full rounded-[2px] bg-gold px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-gold-bright active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
                >
                  {submitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
        { x: 48, opacity: 0 },
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
      <h3 className="font-c1serif text-[1.6rem] text-ivory">The Sandton Showroom</h3>
      <p className="mt-4 text-sm font-light leading-[1.75] text-ivory-secondary">
        Located in the heart of Africa's richest square mile, our flagship showroom houses our
        premier luxury and secure performance portfolio.
      </p>
      <p className="mt-6 text-[15px] font-semibold text-ivory">
        82 Rivonia Road, Sandton, Johannesburg, 2196
      </p>

      <div className="mt-8 border-t border-subtle pt-8">
        <ul className="space-y-4">
          {SHOWROOM_ROWS.map((row) => (
            <li key={row.text} className="showroom-row">
              {row.href ? (
                <a
                  href={row.href}
                  className="group flex items-center gap-4 text-sm font-light text-ivory-secondary transition-colors duration-300 hover:text-gold"
                >
                  <row.icon
                    size={16}
                    className="shrink-0 text-gold transition-colors duration-300 group-hover:text-gold-bright"
                    aria-hidden
                  />
                  {row.text}
                </a>
              ) : (
                <span className="group flex items-center gap-4 text-sm font-light text-ivory-secondary transition-colors duration-300 hover:text-gold">
                  <row.icon
                    size={16}
                    className="shrink-0 text-gold transition-colors duration-300 group-hover:text-gold-bright"
                    aria-hidden
                  />
                  {row.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* map with showroom pin chip */}
      <div className="showroom-map group relative mt-10 overflow-hidden border border-subtle">
        <img
          src="/map-sandton.jpg"
          alt="Map of Sandton showing the KPM Luxury showroom location"
          className="aspect-[10/7] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-gold/60 bg-night/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-[0_0_32px_rgba(199,191,174,0.4)]">
          KPM Showroom
        </span>
      </div>
    </div>
  )
}

/* ---------- Section 3 — Immediate Dispatch Channels (contact.md §3) ---------- */
function DispatchChannels() {
  return (
    <section className="bg-night-elevated py-28">
      <div className="container">
        <div className="max-w-2xl">
          <KineticHeadline
            lines={['Immediate Dispatch Channels']}
            className="text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              Direct access lines for active bookings, urgent corporate logistics, and short-notice
              airport arrivals.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.1}
          y={40}
          start="top 82%"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor
              className="group border border-subtle bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(199,191,174,0.4)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
                <c.icon size={18} className="text-gold" aria-hidden />
              </span>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted">
                {c.label}
              </p>
              <p className="mt-2 font-c1serif text-[1.15rem] text-ivory transition-colors duration-300 group-hover:text-gold-bright">
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
    <section className="bg-night py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Rental Protocols</Eyebrow>
          <KineticHeadline
            lines={['Frequently Asked Questions']}
            className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <Reveal y={24} className="mt-6">
            <p className="text-[15px] font-light leading-[1.75] text-ivory-secondary">
              Clear terms to help guide your elite rental experience smoothly from booking
              confirmation to delivery.
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.08}
          y={24}
          start="top 82%"
          className="mx-auto mt-14 max-w-4xl"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="group border-b border-subtle transition-colors duration-300 first:border-t hover:border-[rgba(199,191,174,0.3)]"
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
                      'font-c1serif text-[1.35rem] leading-[1.25] text-ivory transition-colors duration-300 group-hover:text-gold-bright',
                      isOpen && 'text-gold',
                    )}
                  >
                    {item.q}
                  </span>
                  <Plus
                    size={20}
                    aria-hidden
                    className={cn(
                      'shrink-0 text-gold transition-transform duration-400',
                      isOpen && 'rotate-45',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduced ? { duration: 0.01 } : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 text-sm font-light leading-[1.75] text-ivory-secondary">
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
