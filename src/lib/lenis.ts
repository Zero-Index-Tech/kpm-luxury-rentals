import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'

let lenis: Lenis | null = null
let rafId = 0

/** Global Lenis singleton (lerp 0.09, smooth wheel) synced to ScrollTrigger. */
export function getLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  }
  return lenis
}

export function destroyLenis() {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

/** Smooth-scroll to a hash target (e.g. '#services') via Lenis. */
export function scrollToHash(hash: string) {
  // Auth callbacks can contain token fragments, not valid CSS selectors.
  let id: string
  try { id = decodeURIComponent(hash.slice(1)) } catch { return }
  const el = document.getElementById(id)
  if (!el) return
  getLenis().scrollTo(el as HTMLElement, { duration: 1.2 })
}
