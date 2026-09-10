import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import Reveal from '@/concept2/components/anim/Reveal'
import { CONTACT, FOOTER_FLEET, FOOTER_SERVICES } from '@/concept2/lib/site'

/**
 * Footer (design.md §7.2): bg #080809, top gold hairline, 4 columns,
 * bottom bar with legal links. Columns stagger 0.1s fade-up on scroll.
 */
export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-night-deep">
      <div className="container py-16 md:py-20">
        <Reveal staggerChildren={0.1} y={32} className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src="/logo-white.png"
              alt="KPM Luxury Rentals logo"
              className="mb-5 h-11 w-11 object-contain"
            />
            <p className="font-c1serif text-[22px] text-ivory">KPMLXR</p>
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.35em] text-gold">
              Luxury Lived. Memories Captured.
            </p>
            <p className="mt-6 max-w-xs text-[13px] font-light leading-[1.8] text-ivory-secondary">
              Providing pristine elite vehicular fleet packages, diplomatic security-cleared
              transfers, and highly customizable personal rental experiences across Gauteng for
              over three years.
            </p>
          </div>

          {/* The Fleet */}
          <nav aria-label="Fleet">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              The Fleet
            </h3>
            <ul className="mt-6 space-y-3">
              {FOOTER_FLEET.map((item) => (
                <li key={item}>
                  <Link
                    to="/c2/fleet"
                    className="text-[13px] font-light text-ivory-secondary transition-colors duration-300 hover:text-gold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <Link
                    to="/c2/#services"
                    className="text-[13px] font-light text-ivory-secondary transition-colors duration-300 hover:text-gold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sandton Showroom */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Sandton Showroom
            </h3>
            <address className="mt-6 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-[13px] font-light leading-relaxed text-ivory-secondary">
                <MapPin size={14} className="mt-1 shrink-0 text-gold" aria-hidden />
                <span>{CONTACT.address.join(' ')}</span>
              </p>
              <p>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 text-[13px] font-light text-ivory-secondary transition-colors hover:text-gold"
                >
                  <Phone size={14} className="shrink-0 text-gold" aria-hidden />
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-[13px] font-light text-ivory-secondary transition-colors hover:text-gold"
                >
                  <Mail size={14} className="shrink-0 text-gold" aria-hidden />
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-center gap-3 text-[13px] font-light text-ivory-secondary">
                <Share2 size={14} className="shrink-0 text-gold" aria-hidden />
                TikTok: {CONTACT.tiktok}
              </p>
            </address>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-subtle">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-[11px] text-ivory-muted">
            © 2024 KPM Luxury Rentals. All rights reserved.
          </p>
          <nav className="flex gap-8" aria-label="Legal">
            {['Rental Terms', 'Privacy Policy', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-ivory-muted transition-colors duration-300 hover:text-gold"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
