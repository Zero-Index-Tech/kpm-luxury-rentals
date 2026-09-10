import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Rise distance in px (design default 48). */
  y?: number
  x?: number
  delay?: number
  duration?: number
  /** Stagger direct children instead of animating the wrapper itself. */
  staggerChildren?: number
  /** ScrollTrigger start, e.g. 'top 82%'. */
  start?: string
  once?: boolean
}

/**
 * Standard section reveal (design.md §5): y 48 → 0, opacity 0 → 1,
 * 1s power3.out at 'top 82%', once. GSAP-owned.
 */
export default function Reveal({
  children,
  className,
  y = 48,
  x = 0,
  delay = 0,
  duration = 1,
  staggerChildren = 0,
  start = 'top 82%',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const targets = staggerChildren > 0 ? Array.from(root.children) : root
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, x: 0 })
        return
      }
      gsap.fromTo(
        targets,
        { y, x, opacity: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          stagger: staggerChildren > 0 ? staggerChildren : 0,
          scrollTrigger: { trigger: root, start, once },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
