import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/concept1/components/Navbar'
import Footer from '@/concept1/components/Footer'
import { getLenis, scrollToHash } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { NAV_HEIGHT } from '@/concept1/lib/site'

/**
 * KPMLXR layout (nested-route pattern: renders <Outlet/>). Owns the black
 * navbar offset; full-bleed heroes opt out inside the page with a matching
 * negative margin.
 */
export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    getLenis()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const t = window.setTimeout(() => scrollToHash(location.hash), 120)
      return () => window.clearTimeout(t)
    }
    getLenis().scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-[100dvh] bg-white font-lxrbody text-lxr-ink antialiased">
      <Navbar />
      <main style={{ paddingTop: NAV_HEIGHT }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
