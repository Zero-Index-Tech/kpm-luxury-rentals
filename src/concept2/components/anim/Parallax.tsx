import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Scrub range; hero/gallery -8→8, split images -6→6 (design.md §5). */
  from?: number
  to?: number
}

/**
 * Scroll-scrubbed parallax wrapper (yPercent from → to). GSAP-owned,
 * dedicated component with scoped cleanup.
 */
export default function Parallax({ children, className, from = -8, to = 8 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || prefersReducedMotion()) return
      gsap.fromTo(
        root,
        { yPercent: from },
        {
          yPercent: to,
          ease: 'none',
          scrollTrigger: {
            trigger: root.parentElement ?? root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
