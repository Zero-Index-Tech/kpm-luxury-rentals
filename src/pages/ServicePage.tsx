import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICE_PAGES } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function ServicePage() {
  const { slug } = useParams()
  const location = useLocation()
  const service = SERVICE_PAGES.find((item) => item.slug === slug)
  const prefix = location.pathname.startsWith('/c1/') ? '/c1' : location.pathname.startsWith('/c2/') ? '/c2' : ''

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | KPM Luxury Rentals`
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = service.description
  }, [service])

  if (!service) return null

  const contactPath = `${prefix}/contact` || '/contact'

  return (
    <article className="bg-taupe theme-canvas text-copy">
      <section className="container grid items-center gap-10 py-14 md:grid-cols-2 md:gap-14 md:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-copy-muted">KPM Luxury Rentals · Johannesburg</p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-copy-accent">{service.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] md:text-5xl">{service.title}</h1>
          <p className="mt-6 text-base leading-7 text-copy-muted">{service.description}</p>
          <Link
            to={contactPath}
            state={{ rentalType: service.rentalType }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-umber"
          >
            Enquire with our team <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <img
          src={service.image}
          alt={service.imageAlt}
          className="aspect-[4/3] w-full rounded-md object-cover"
          fetchPriority="high"
        />
      </section>

      <section className="border-y border-copy/10 bg-ivory/50 py-14 md:py-18">
        <div className="container grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copy-accent">A considered experience</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight">Details arranged around your journey.</h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 border-b border-copy/10 pb-4 text-sm leading-6 text-copy-muted">
                <Check size={17} className="mt-1 shrink-0 text-copy-accent" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
        <div>
          <h2 className="font-display text-2xl font-bold">Plan your {service.eyebrow.toLowerCase()} with KPM</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-copy-muted">Tell us what you have in mind and our Johannesburg team will help you check vehicle options and availability.</p>
        </div>
        <Link
          to={contactPath}
          state={{ rentalType: service.rentalType }}
          className={cn('inline-flex shrink-0 items-center gap-2 border-b border-copy pb-2 text-xs font-bold uppercase tracking-[0.14em] text-copy transition-colors hover:text-copy-accent')}
        >
          Make an enquiry <ArrowRight size={15} aria-hidden />
        </Link>
      </section>
    </article>
  )
}