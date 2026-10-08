import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/concept1/lib/site'
import { SERVICE_PAGES } from '@/lib/services'
import { cn } from '@/lib/utils'

/**
 * KPMLXR navbar — solid black bar (h-76px), dot-matrix logo + KPMLXR
 * wordmark left, DM Sans links right. No CTA button (client instruction).
 * Mobile: full-screen black overlay with large Montserrat links.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const servicePath = (slug: string) => `/c1/services/${slug}`

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] h-[76px] bg-lxr-black theme-dark transition-shadow duration-300',
          scrolled ? 'shadow-[0_12px_36px_-18px_rgba(0,0,0,0.7)]' : '',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link to="/c1" className="group flex items-center gap-3" aria-label="Kpmluxerentals home">
            <img
              src="/logo-white.png"
              alt="Kpmluxerentals logo"
              className="h-9 w-9 object-contain transition-opacity duration-300 group-hover:opacity-75"
            />
            <span className="flex flex-col leading-none">
              <span className="font-lxrtitle text-[17px] font-semibold tracking-[0.06em] text-white">
                Kpmluxerentals
              </span>
              <span className="mt-1 text-[7.5px] font-medium uppercase tracking-[0.42em] text-white/45">
                Luxury Lived. Memories Captured
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              link.label === 'Services' ? (
                <div
                  key={link.label}
                  className="group relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((value) => !value)}
                    className="flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    Services <ChevronDown size={14} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4">
                      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-lxr-black p-2 shadow-xl">
                        {SERVICE_PAGES.map((service) => (
                          <Link key={service.slug} to={servicePath(service.slug)} onClick={() => setServicesOpen(false)} className="block px-4 py-3 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white">
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : link.hash ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(event) => { event.preventDefault(); navigate('/c1/#services') }}
                  className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === '/c1'}
                  className={({ isActive }) =>
                    cn(
                      'text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <button
            type="button"
            className="text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col justify-center bg-lxr-black theme-dark px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label === 'Services' ? (
                    <div>
                      <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)} className="flex items-center gap-3 font-lxrtitle text-[1.9rem] font-semibold text-white">
                        Services <ChevronDown size={22} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      </button>
                      {servicesOpen && (
                        <div className="mt-3 flex flex-col gap-3 border-l border-white/25 pl-5">
                          {SERVICE_PAGES.map((service) => (
                            <Link key={service.slug} to={servicePath(service.slug)} onClick={() => { setOpen(false); setServicesOpen(false) }} className="text-base text-white/70 hover:text-white">
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.hash ? (
                    <a
                      href={link.to}
                      onClick={(event) => { event.preventDefault(); setOpen(false); navigate('/c1/#services') }}
                      className="font-lxrtitle text-[1.9rem] font-semibold text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'font-lxrtitle text-[1.9rem] font-semibold transition-colors',
                        location.pathname === link.to ? 'text-copy-accent' : 'text-white',
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
