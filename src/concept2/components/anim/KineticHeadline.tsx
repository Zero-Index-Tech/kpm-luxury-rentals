import { useRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface KineticHeadlineProps {
  /** Text lines; each line is split and clipped by an overflow-hidden wrapper. */
  lines: ReactNode[]
  as?: ElementType
  className?: string
  /** Split granularity — chars only for short hero lines. */
  split?: 'words' | 'chars'
  /** 'load' animates on mount; 'scroll' triggers at top 80%. */
  trigger?: 'load' | 'scroll'
  delay?: number
  stagger?: number
  /** Optional per-line class overrides (e.g. italic gold accent lines). */
  lineClasses?: string[]
}

function splitLine(node: ReactNode, mode: 'words' | 'chars'): ReactNode[] {
  if (typeof node !== 'string') return [node]
  if (mode === 'chars') {
    return node.split('').map((c, i) => (
      <span key={i} className="kinetic-unit inline-block will-change-transform">
        {c === ' ' ? ' ' : c}
      </span>
    ))
  }
  return node.split(' ').map((w, i) => (
    <span key={i} className="kinetic-unit inline-block will-change-transform">
      {w}
      {' '}
    </span>
  ))
}

/**
 * Kinetic serif headline (design.md §5): units rise from y:110% inside
 * overflow-hidden wrappers, power3.out. GSAP-owned; do not nest inside
 * Framer Motion animated elements.
 */
export default function KineticHeadline({
  lines,
  as: Tag = 'h2',
  className,
  split = 'words',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.035,
  lineClasses,
}: KineticHeadlineProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const units = root.querySelectorAll('.kinetic-unit')
      if (!units.length) return
      if (prefersReducedMotion()) {
        gsap.set(units, { y: 0, opacity: 1, rotate: 0 })
        return
      }
      gsap.set(units, { y: '110%', opacity: 0, rotate: split === 'chars' ? 4 : 0 })
      const vars: gsap.TweenVars = {
        y: '0%',
        opacity: 1,
        rotate: 0,
        duration: split === 'chars' ? 1 : 0.9,
        ease: 'power3.out',
        stagger,
        delay,
      }
      if (trigger === 'scroll') {
        vars.scrollTrigger = { trigger: root, start: 'top 80%', once: true }
      }
      gsap.to(units, vars)
      ScrollTrigger.refresh()
    },
    { scope: ref },
  )

  const TagAny = Tag as any
  return (
    <TagAny ref={ref} className={cn('font-c1serif', className)}>
      {lines.map((line, i) => (
        <span key={i} className={cn('block overflow-hidden pb-[0.08em] -mb-[0.08em]', lineClasses?.[i])}>
          {splitLine(line, split)}
        </span>
      ))}
    </TagAny>
  )
}
