import { useLocation } from 'react-router-dom'
import { SERVICE_PAGES } from '@/lib/services'
import { CONTACT } from '@/lib/site'

const DOMAIN = 'https://kpmluxerentals.co.za'

export default function SeoSchema() {
  const location = useLocation()
  const pathname = location.pathname || '/'
  const service = SERVICE_PAGES.find((item) => pathname.includes(`/services/${item.slug}`))

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KPM Luxury Rentals',
    description:
      'Luxury vehicle rental and chauffeur services in Sandton, Johannesburg. Premium short-term hires, corporate leasing, weddings, matric dance transport and airport transfers.',
    url: `${DOMAIN}${pathname === '/' ? '/' : pathname}`,
    image: `${DOMAIN}/hero-home.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '82 Rivonia Road',
      addressLocality: 'Sandton',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    areaServed: 'Johannesburg',
    priceRange: 'R$$$',
    sameAs: ['https://www.instagram.com/', 'https://www.tiktok.com/'],
    makesOffer: SERVICE_PAGES.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.label,
        url: `${DOMAIN}/services/${item.slug}`,
        description: item.description,
      },
    })),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KPM Luxury Rentals',
    url: DOMAIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${DOMAIN}/fleet?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const routeSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        provider: {
          '@type': 'LocalBusiness',
          name: 'KPM Luxury Rentals',
        },
        areaServed: 'Johannesburg',
        description: service.description,
        url: `${DOMAIN}/services/${service.slug}`,
      }
    : null

  const schema = routeSchema ? [websiteSchema, baseSchema, routeSchema] : [websiteSchema, baseSchema]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
