import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/concept2/lib/site'
import { SERVICE_PAGES } from '@/lib/services'
import { cn } from '@/lib/utils'

/**
 * Navbar (design.md §7.1): fixed top, h-[88px], transparent over hero →
 * rgba(24,24,24,0.85) + blur + bottom hairline after 40px. Hides on
 * scroll-down past 120px, reveals on scroll-up (0.3s slide). Mobile:
 * full-screen overlay menu with staggered Playfair links.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > 120 && y > lastY + 4) setHidden(true)
      else if (y < lastY - 4 || y <= 120) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close overlay + body scroll lock
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const servicePath = (slug: string) => `/c2/services/${slug}`

  return (
    <>
      <header
        className={cn(
          'theme-dark fixed inset-x-0 top-0 z-[80] h-[88px] transition-all duration-300',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
          scrolled || open
            ? 'border-b border-hairline bg-[rgba(24,24,24,0.85)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container flex h-full items-center justify-between">
          <Link to="/c2" className="group flex items-center gap-3.5 leading-none" aria-label="Kpmluxerentals home">
            <img
              src="/logo-white.png"
              alt="Kpmluxerentals logo"
              className="h-9 w-9 object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="flex flex-col leading-none">
              <span className="font-c1serif text-[22px] tracking-wide text-copy transition-colors group-hover:text-copy-accent">
                Kpmluxerentals
              </span>
              <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.35em] text-copy-accent">
                Rentals · Johannesburg
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              link.label === 'Services' ? (
                <div
                  key={link.label}
                  className="group relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                >
                  <button type="button" aria-expanded={servicesOpen} aria-haspopup="true" onClick={() => setServicesOpen((value) => !value)} className="c1-nav-link flex items-center gap-1" data-cursor>
                    Services <ChevronDown size={14} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4">
                      <div className="overflow-hidden border border-hairline bg-night-elevated p-2 shadow-xl">
                        {SERVICE_PAGES.map((service) => (
                          <Link key={service.slug} to={servicePath(service.slug)} onClick={() => setServicesOpen(false)} className="block px-4 py-3 text-sm text-copy-muted transition-colors hover:bg-white/5 hover:text-copy">
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : link.hash ? (
                <a key={link.label} href={link.to} onClick={(event) => { event.preventDefault(); navigate('/c2/#services') }} className="c1-nav-link" data-cursor>
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) => cn('c1-nav-link', isActive && 'active')}
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/c2/contact"
              data-cursor
              className="btn-sheen inline-block bg-gold px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-gold-bright hover:text-ink active:scale-[0.97]"
            >
              Reserve Now
            </Link>
          </div>

          <button
            type="button"
            className="text-copy lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
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
            className="fixed inset-0 z-[70] flex flex-col justify-center bg-[rgba(24,24,24,0.98)] px-8 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-7" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label === 'Services' ? (
                    <div>
                      <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)} className="flex items-center gap-3 font-c1serif text-[2rem] text-copy transition-colors hover:text-copy-accent">
                        Services <ChevronDown size={22} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      </button>
                      {servicesOpen && (
                        <div className="mt-3 flex flex-col gap-3 border-l border-white/20 pl-5">
                          {SERVICE_PAGES.map((service) => (
                            <Link key={service.slug} to={servicePath(service.slug)} onClick={() => { setOpen(false); setServicesOpen(false) }} className="text-base text-copy-muted hover:text-copy">
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.hash ? (
                    <a
                      href={link.to}
                      onClick={(event) => { event.preventDefault(); setOpen(false); navigate('/c2/#services') }}
                      className="font-c1serif text-[2rem] text-copy transition-colors hover:text-copy-accent"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'font-c1serif text-[2rem] text-copy transition-colors hover:text-copy-accent',
                        location.pathname === link.to && 'text-copy-accent',
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.07, duration: 0.5 }}
              >
                <Link
                  to="/c2/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block bg-gold px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-white"
                >
                  Reserve Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
