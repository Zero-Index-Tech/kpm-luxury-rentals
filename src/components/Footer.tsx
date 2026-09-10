import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'
import { CONTACT, FOOTER_FLEET, FOOTER_SERVICES } from '@/lib/site'

/**
 * Footer (design.md §7.2): bg-ink-deep with rounded-t-[28px] soft top edge
 * (V2 signature), white dot-matrix logo, 4 columns (stack mobile), bottom
 * legal bar. Columns stagger 0.1s fade-up on scroll at 85%.
 */
export default function Footer() {
  return (
    <footer className="rounded-t-[28px] border-t border-hairline-dark bg-ink-deep">
      <div className="container py-20">
        <Reveal staggerChildren={0.1} y={32} start="top 85%" className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo-white.png"
                alt="KPM Luxury Rentals"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <p className="font-display text-[17px] font-bold tracking-[-0.01em] text-ivory">
                KPMLXR
                <span className="block text-[13px] font-semibold tracking-[0.06em] text-ivory-70">
                  RENTALS
                </span>
              </p>
            </div>
            <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.3em] text-taupe">
              Luxury Lived. Memories Captured.
            </p>
            <p className="mt-6 max-w-xs text-[13px] font-normal leading-[1.8] text-ivory-45">
              Providing pristine elite vehicular fleet packages, diplomatic security-cleared
              transfers, and highly customizable personal rental experiences across Gauteng for
              over three years.
            </p>
          </div>

          {/* The Fleet */}
          <nav aria-label="Fleet">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-taupe">
              The Fleet
            </h3>
            <ul className="mt-6 space-y-3">
              {FOOTER_FLEET.map((item) => (
                <li key={item}>
                  <Link
                    to="/c3/fleet"
                    className="text-[13px] font-medium text-ivory-70 transition-colors duration-300 hover:text-ivory"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-taupe">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <Link
                    to="/c3/#services"
                    className="text-[13px] font-medium text-ivory-70 transition-colors duration-300 hover:text-ivory"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sandton Showroom */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-taupe">
              Sandton Showroom
            </h3>
            <address className="mt-6 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-[13px] font-medium leading-relaxed text-ivory-70">
                <MapPin size={14} className="mt-1 shrink-0 text-taupe" aria-hidden />
                <span>{CONTACT.address.join(' ')}</span>
              </p>
              <p>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 text-[13px] font-medium text-ivory-70 transition-colors hover:text-ivory"
                >
                  <Phone size={14} className="shrink-0 text-taupe" aria-hidden />
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-[13px] font-medium text-ivory-70 transition-colors hover:text-ivory"
                >
                  <Mail size={14} className="shrink-0 text-taupe" aria-hidden />
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-center gap-3 text-[13px] font-medium text-ivory-70">
                <Share2 size={14} className="shrink-0 text-taupe" aria-hidden />
                TikTok: {CONTACT.tiktok}
              </p>
            </address>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-hairline-dark">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-[11px] text-ivory-45">
            © 2024 KPM Luxury Rentals. All rights reserved.
          </p>
          <nav className="flex gap-8" aria-label="Legal">
            {['Rental Terms', 'Privacy Policy', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-ivory-45 transition-colors duration-300 hover:text-ivory"
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
