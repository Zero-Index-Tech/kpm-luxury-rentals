import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  className?: string
}

/**
 * StatCounter (design.md §7.6): Playfair gold-bright numeral counting
 * 0 → target over 1.6s power2.out at 85% viewport, caps muted label.
 */
export default function StatCounter({ value, suffix = '+', label, className }: StatCounterProps) {
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
        duration: 1.6,
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
      <p className="stat-numeral font-c1serif text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-gold transition-colors duration-500 group-hover:text-gold-bright">
        <span className="stat-numeral-value">0{suffix}</span>
      </p>
      <p className="stat-label mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory-muted">
        {label}
      </p>
    </div>
  )
}
