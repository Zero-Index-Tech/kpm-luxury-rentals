import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/concept2/components/Navbar'
import Footer from '@/concept2/components/Footer'
import GrainOverlay from '@/concept2/components/GrainOverlay'
import CustomCursor from '@/concept2/components/CustomCursor'
import { getLenis, scrollToHash } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { NAV_HEIGHT } from '@/concept2/lib/site'

/**
 * Shared layout (nested-route pattern: renders <Outlet/>).
 * Owns the fixed-navbar offset: the content slot gets top padding equal to
 * the 88px nav so every page starts below it — full-bleed hero sections opt
 * out inside the page with `-mt-[88px]` + their own top padding.
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
    <div className="c1-root min-h-[100dvh] bg-night font-c1sans font-light text-ivory">
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
