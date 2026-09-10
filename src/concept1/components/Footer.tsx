import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT, FOOTER_SERVICES, VEHICLES } from '@/lib/site';

const EXPLORE = [
  { label: 'Home', to: '/c1' },
  { label: 'Fleet', to: '/c1/fleet' },
  { label: 'Services', to: '/c1/#services' },
  { label: 'About', to: '/c1/about' },
  { label: 'Merch', to: '/c1/merch' },
  { label: 'Contact', to: '/c1/contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-lxr-black text-white">
      <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/c1" className="inline-flex items-center gap-3">
              <img src="/logo-white.png" alt="KPMLXR" className="h-10 w-auto" />
              <span className="leading-tight">
                <span className="block font-lxrtitle text-lg font-semibold tracking-wide">KPMLXR</span>
                <span className="block text-[7.5px] font-medium uppercase tracking-[0.42em] text-white/45">
                  Luxury in Motion.
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Premium luxury car rentals from the heart of Sandton. A hand-picked flagship fleet,
              white-glove concierge service, and delivery to your door — every journey, elevated.
            </p>
          </div>

          <div>
            <h4 className="font-lxrtitle text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-lxrtitle text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              The Fleet
            </h4>
            <ul className="mt-5 space-y-3">
              {VEHICLES.map((v) => (
                <li key={v.slug}>
                  <Link
                    to={`/c1/fleet/${v.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 font-lxrtitle text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((s) => (
                <li key={s} className="text-sm text-white/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-lxrtitle text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Concierge
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lxr-sand" />
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lxr-sand" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lxr-sand" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none px-2" aria-hidden="true">
        <div className="whitespace-nowrap text-center font-lxrtitle text-[13.5vw] font-extrabold leading-[0.8] tracking-tight text-white/[0.05]">
          KPMLUXERENTALS
        </div>
      </div>

      <div className="border-t border-lxr-linedark">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-white/35 sm:flex-row">
          <span>© {new Date().getFullYear()} KPM Luxury Rentals</span>
          <span>Luxury in Motion. Sandton, Johannesburg</span>
        </div>
      </div>
    </footer>
  );
}
