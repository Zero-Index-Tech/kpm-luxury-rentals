import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GrainOverlay from '@/components/GrainOverlay'
import CustomCursor from '@/components/CustomCursor'
import { getLenis, scrollToHash } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { NAV_HEIGHT } from '@/lib/site'

/**
 * Shared layout (nested-route pattern: renders <Outlet/>).
 * Owns the floating-pill navbar offset: the content slot gets top padding
 * (~100px: top-5 + pill height) so every page starts below it — full-bleed
 * hero sections opt out inside the page with `-mt-[100px]` + their own top
 * padding.
 * Page agents: do NOT add nav-height offsets in pages.
 */
export default function Layout() {
  const location = useLocation()

  // Global Lenis smooth scroll (singleton, synced to ScrollTrigger in lib/lenis)
  useEffect(() => {
    getLenis()
  }, [])

  // Scroll reset / hash anchors on navigation
  useEffect(() => {
    if (location.hash) {
      // wait for the incoming page to mount before scrolling to the anchor
      const t = window.setTimeout(() => scrollToHash(location.hash), 120)
      return () => window.clearTimeout(t)
    }
    getLenis().scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-[100dvh] bg-ivory text-charcoal">
      <Navbar />
      <main style={{ paddingTop: NAV_HEIGHT }}>
        <Outlet />
      </main>
      <Footer />
      <GrainOverlay />
      <CustomCursor />
    </div>
  )
}
