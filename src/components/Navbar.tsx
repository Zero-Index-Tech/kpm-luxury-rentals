import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/site'
import { scrollToHash } from '@/lib/lenis'
import { cn } from '@/lib/utils'

/**
 * Navbar (design.md §7.1) — floating glass pill. Fixed, centered, top-5,
 * max-w-[1180px]. glass-light rounded-full pill with black logo mark +
 * stacked wordmark, caps links with taupe hover dots, bg-ink RESERVE NOW
 * pill. On scroll past 60px the pill shrinks (py 14px → 10px) and its glass
 * deepens 0.55 → 0.75. It never hides. Mobile: full-screen glass-dark
 * overlay with white logo + staggered Archivo links. Body scroll locked
 * while open.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
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

  const goServices = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === '/c3') {
      scrollToHash('#services')
    } else {
      navigate('/c3/#services')
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-5 z-[80] mx-auto max-w-[1180px] px-2"
      >
        <div
          className={cn(
            'glass-light flex items-center justify-between rounded-full pl-5 pr-2 shadow-nav-pill transition-all duration-500',
            scrolled ? 'py-2.5' : 'py-3.5',
          )}
          style={{
            background: scrolled
              ? 'rgba(244,242,239,0.75)'
              : 'rgba(244,242,239,0.55)',
          }}
        >
          {/* Brand — black dot-matrix mark + stacked wordmark */}
          <Link
            to="/c3"
            className="group flex items-center gap-3"
            aria-label="KPM Luxury Rentals home"
          >
            <img
              src="/logo-black.png"
              alt=""
              width={34}
              height={34}
              className="h-[34px] w-[34px] object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-charcoal">
                KPMLXR
              </span>
              <span className="mt-1 text-[7.5px] font-bold uppercase tracking-[0.32em] text-taupe">
                Rentals · Johannesburg
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const dot = (
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-taupe transition-transform duration-300 group-hover:scale-100 group-[.active]:scale-100"
                />
              )
              return link.hash ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={goServices}
                  className="nav-link group"
                  data-cursor
                >
                  {link.label}
                  {dot}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) => cn('nav-link group', isActive && 'active')}
                >
                  {link.label}
                  {dot}
                </NavLink>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/c3/contact"
              data-cursor
              className="inline-block rounded-full bg-ink px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:bg-umber active:scale-[0.97]"
            >
              Reserve Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-ivory transition-colors hover:bg-umber lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen glass overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[rgba(11,10,9,0.72)] px-8 pb-10 pt-8 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/logo-white.png"
                  alt=""
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] object-contain"
                />
                <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-ivory">
                  KPMLXR
                </span>
              </div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-7" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.hash ? (
                    <a
                      href={link.to}
                      onClick={goServices}
                      className="font-display text-[2.2rem] font-bold text-ivory transition-colors hover:text-ivory-70"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'font-display text-[2.2rem] font-bold text-ivory transition-colors hover:text-ivory-70',
                        location.pathname === link.to && 'text-ivory-70',
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
                  to="/c3/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block rounded-full bg-ivory px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-ink"
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
