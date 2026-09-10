import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: string
  center?: boolean
  /** 'light' (default, taupe on ivory) or 'dark' (ivory-45 on dark bands). */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Eyebrow label (design.md §7.4): 24px dash rule + Manrope 11px/700 caps
 * 0.32em. Taupe on light, ivory-45 on dark. Rule draws scaleX 0 → 1 (0.7s),
 * label fades up 12px.
 */
export default function Eyebrow({ children, center, tone = 'light', className }: EyebrowProps) {
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
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }).fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.35',
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('flex items-center gap-4', center && 'justify-center', className)}>
      <span
        className={cn(
          'eyebrow-rule inline-block h-px w-6 origin-left',
          tone === 'dark' ? 'bg-ivory-45' : 'bg-taupe',
        )}
        aria-hidden
      />
      <span className={cn('eyebrow-label eyebrow', tone === 'dark' && 'eyebrow-on-dark')}>
        {children}
      </span>
    </div>
  )
}
