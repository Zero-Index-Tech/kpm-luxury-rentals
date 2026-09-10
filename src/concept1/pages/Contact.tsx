import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  ChevronDown,
  CircleCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import LxrButton from '@/concept1/components/LxrButton'
import SectionHead from '@/concept1/components/SectionHead'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CONTACT } from '@/concept1/lib/site'
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

const RENTAL_HINTS: Record<string, string> = {
  'short-term': 'Short-Term Rental',
  corporate: 'Long-Term / Corporate Lease',
  wedding: 'Wedding / Event',
  airport: 'Airport Transfer',
  chauffeur: 'Chauffeur Service',
}

const SHOWROOM_ROWS = [
  { icon: Phone, text: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Clock, text: 'Mon–Sun: 8:00 AM – 8:00 PM', href: undefined },
]

const CHANNELS = [
  { icon: Phone, label: 'Call Us', value: '+27 (0) 11 943 8274', href: 'tel:+27119438274' },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+27 (0) 82 990 1482',
    href: 'https://wa.me/27829901482',
  },
  { icon: Mail, label: 'Email Us', value: 'concierge@kpmluxe.co.za', href: 'mailto:concierge@kpmluxe.co.za' },
  { icon: MapPin, label: 'Visit Us', value: 'Sandton, JHB', href: '#showroom' },
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

const EASE = [0.22, 1, 0.36, 1] as const

/* ---------- page ---------- */

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-lxr-gray">
        <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-16 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-lxrtitle text-5xl font-semibold leading-[1.02] tracking-tight text-lxr-ink sm:text-6xl lg:text-7xl">
              Get in{' '}
              <em className="font-lxrbody font-medium italic text-lxr-olive">Touch.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-lxr-muted">
              We are ready to curate your luxury experience. Reach out directly to our Sandton
              team to coordinate custom itineraries and tailored agreements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enquiry + showroom */}
      <section id="enquiry" className="scroll-mt-24 bg-lxr-gray pb-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[55fr_45fr]">
          <EnquiryForm />
          <ShowroomPanel />
        </div>
      </section>

      {/* Channels */}
      <section className="bg-lxr-black py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHead
            dark
            title="Immediate Dispatch"
            accent="Channels."
            copy="For urgent reservations and same-day dispatch, reach our concierge team directly."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group rounded-[6px] border border-lxr-linedark bg-lxr-panel p-7 transition-colors duration-300 hover:border-white/30"
              >
                <c.icon className="h-6 w-6 text-lxr-sand" strokeWidth={1.6} />
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {c.label}
                </div>
                <div className="mt-1.5 font-lxrtitle text-[15px] font-semibold text-white transition-colors group-hover:text-lxr-sand">
                  {c.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead
            title="Common"
            accent="Questions."
            copy="Everything you need to know before your first KPM journey."
          />
          <div className="divide-y divide-lxr-line border-y border-lxr-line">
            {FAQS.map((f) => <FaqRow key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lxr-olive text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Ready to Experience{' '}
            <em className="font-lxrbody font-medium italic">Luxury?</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">
            Connect directly with our Sandton-based concierge team to configure your custom
            itinerary.
          </p>
          <div className="mt-9 flex justify-center">
            <LxrButton to="/c1/contact#enquiry" variant="light">
              Reserve Now
            </LxrButton>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---------- FAQ row ---------- */

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-lxrtitle text-[15px] font-semibold text-lxr-ink">{q}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-lxr-mist transition-transform duration-300', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[14px] leading-[1.75] text-lxr-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Enquiry form ---------- */

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
  'w-full rounded-[4px] border border-lxr-line bg-white px-4 py-3.5 text-sm text-lxr-ink placeholder:text-lxr-mist transition-all duration-300 focus:border-lxr-ink focus:outline-none focus:ring-1 focus:ring-lxr-ink/20'

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
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-lxr-mist transition-colors duration-300 group-focus-within:text-lxr-ink">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-[11px] text-red-600">{error}</p>}
    </div>
  )
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function EnquiryForm() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

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
      transition={{ duration: 0.9, ease: EASE }}
      className="rounded-[6px] border border-lxr-line bg-white p-8 shadow-[0_24px_60px_-32px_rgba(17,17,18,0.25)] md:p-10"
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
              <CircleCheck size={56} className="text-lxr-olive" aria-hidden />
            </motion.div>
            <h3 className="mt-8 font-lxrtitle text-2xl font-semibold text-lxr-ink">
              Enquiry Received
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-[1.75] text-lxr-muted">
              Our private client concierge will contact you shortly to curate your reservation.
            </p>
            <div className="mt-10">
              <LxrButton to="/c1" variant="outline">
                Return Home
              </LxrButton>
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
            <h3 className="font-lxrtitle text-2xl font-semibold text-lxr-ink">
              Send a Bespoke Enquiry
            </h3>
            <p className="mt-3 text-[13px] text-lxr-muted">
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
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
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
                    className={cn(inputClass, errors.name && 'border-red-500')}
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
                    className={cn(inputClass, errors.email && 'border-red-500')}
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. +27 (0) 82 123 4567"
                    value={form.phone}
                    onChange={update('phone')}
                    className={cn(inputClass, errors.phone && 'border-red-500')}
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
                      className="h-auto w-full justify-between rounded-[4px] border-lxr-line bg-white px-4 py-3.5 text-sm text-lxr-ink shadow-none focus:border-lxr-ink focus:ring-1 focus:ring-lxr-ink/20 data-[placeholder]:text-lxr-mist"
                    >
                      <SelectValue placeholder="Select your preferred flagship model" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[4px] border-lxr-line bg-white text-lxr-ink">
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
                    <SelectTrigger
                      aria-label="Rental Type"
                      className="h-auto w-full justify-between rounded-[4px] border-lxr-line bg-white px-4 py-3.5 text-sm text-lxr-ink shadow-none focus:border-lxr-ink focus:ring-1 focus:ring-lxr-ink/20 data-[placeholder]:text-lxr-mist"
                    >
                      <SelectValue placeholder="Short-Term / Long-Term / Event" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[4px] border-lxr-line bg-white text-lxr-ink">
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
                    placeholder="e.g. 12 Oct — 15 Oct 2026"
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
                  className="w-full rounded-[4px] bg-lxr-black px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-lxr-panel active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
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

/* ---------- Showroom panel ---------- */

function ShowroomPanel() {
  return (
    <motion.div
      id="showroom"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="scroll-mt-24"
    >
      <h3 className="font-lxrtitle text-2xl font-semibold text-lxr-ink">The Sandton Showroom</h3>
      <p className="mt-4 text-sm leading-[1.75] text-lxr-muted">
        Located in the heart of Africa's richest square mile, our flagship showroom houses our
        premier luxury and secure performance portfolio.
      </p>
      <p className="mt-6 font-lxrtitle text-[15px] font-semibold text-lxr-ink">
        82 Rivonia Road, Sandton, Johannesburg, 2196
      </p>

      <div className="mt-8 border-t border-lxr-line pt-8">
        <ul className="space-y-4">
          {SHOWROOM_ROWS.map((row) => (
            <li key={row.text}>
              {row.href ? (
                <a
                  href={row.href}
                  className="group flex items-center gap-4 text-sm text-lxr-muted transition-colors duration-300 hover:text-lxr-ink"
                >
                  <row.icon size={16} className="shrink-0 text-lxr-olive" aria-hidden />
                  {row.text}
                </a>
              ) : (
                <span className="flex items-center gap-4 text-sm text-lxr-muted">
                  <row.icon size={16} className="shrink-0 text-lxr-olive" aria-hidden />
                  {row.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="group relative mt-10 overflow-hidden rounded-[6px] border border-lxr-line">
        <img
          src="/map-sandton.jpg"
          alt="Map of Sandton showing the KPM Luxury showroom location"
          className="aspect-[10/7] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-white/40 bg-lxr-black/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
          KPM Showroom
        </span>
      </div>
    </motion.div>
  )
}
