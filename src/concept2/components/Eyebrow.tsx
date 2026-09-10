import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: string
  center?: boolean
  className?: string
}

/**
 * Eyebrow label (design.md §7.4): gold em-dash rule + 11px caps label.
 * Rule draws scaleX 0 → 1 (0.6s), label fades up 12px.
 */
export default function Eyebrow({ children, center, className }: EyebrowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const rule = root.querySelector('.eyebrow-rule')
      const label = root.querySelector('.eyebrow-label')
      if (prefersReducedMotion()) {
        gsap.set([rule, label], { opacity: 1, scaleX: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }).fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3',
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('flex items-center gap-6', center && 'justify-center', className)}>
      <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-gold" aria-hidden />
      <span className="eyebrow-label c1-eyebrow">{children}</span>
    </div>
  )
}
