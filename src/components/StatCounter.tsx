import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  /** 'light' (charcoal on ivory, default) or 'dark' (ivory on dark bands). */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * StatCounter (design.md §7.6): Archivo 800 numeral counting 0 → target over
 * 1.8s power2.out at 85% viewport, 10px caps muted label under it. Numeral
 * shifts charcoal → umber on hover (0.3s).
 */
export default function StatCounter({
  value,
  suffix = '+',
  label,
  tone = 'light',
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const numEl = root.querySelector<HTMLElement>('.stat-numeral-value')
      const labelEl = root.querySelector('.stat-label')
      if (!numEl) return
      if (prefersReducedMotion()) {
        numEl.textContent = `${value}${suffix}`
        gsap.set(labelEl, { opacity: 1, y: 0 })
        return
      }
      const counter = { v: 0 }
      gsap.to(counter, {
        v: value,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        onUpdate: () => {
          numEl.textContent = `${Math.round(counter.v)}${suffix}`
        },
      })
      gsap.fromTo(
        labelEl,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('group text-center', className)}>
      <p
        className={cn(
          'stat-numeral font-display text-[clamp(2.6rem,4.5vw,3.8rem)] font-extrabold leading-none tracking-[-0.03em] transition-colors duration-300',
          tone === 'dark' ? 'text-ivory group-hover:text-ivory-70' : 'text-charcoal group-hover:text-umber',
        )}
      >
        <span className="stat-numeral-value">0{suffix}</span>
      </p>
      <p
        className={cn(
          'stat-label mt-3 text-[10px] font-bold uppercase tracking-[0.22em]',
          tone === 'dark' ? 'text-ivory-45' : 'text-taupe',
        )}
      >
        {label}
      </p>
    </div>
  )
}
