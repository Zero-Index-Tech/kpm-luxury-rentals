import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  children: ReactNode
  to?: string
  href?: string
  /** primary = bg-ink pill · glass = frosted glass-light · outline = on-dark ghost pill */
  variant?: 'primary' | 'glass' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  /** Append an arrow-right icon that slides +4px on hover (design.md §7.3). */
  arrow?: boolean
}

/**
 * V2 pill buttons (design.md §7.3). Kept under the legacy export name
 * `GoldButton` so existing pages keep compiling — the API is unchanged,
 * only the visual language (rounded-full pill, ink fill / glass / ghost).
 * Magnetic on desktop (±4px within 60px, spring 150/15). Framer-Motion-owned.
 */
export default function GoldButton({
  children,
  to,
  href,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  arrow = false,
}: GoldButtonProps) {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })

  const magnetic =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !prefersReducedMotion()

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const dist = Math.hypot(dx, dy)
    if (dist < 60 + Math.max(r.width, r.height) / 2) {
      x.set(Math.max(-4, Math.min(4, dx * 0.12)))
      y.set(Math.max(-4, Math.min(4, dy * 0.12)))
    }
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base = cn(
    'group/btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97] select-none',
    variant === 'primary' && 'bg-ink text-ivory hover:-translate-y-0.5 hover:bg-umber',
    variant === 'glass' &&
      'glass-light text-charcoal hover:-translate-y-0.5 hover:bg-[rgba(244,242,239,0.75)] hover:border-[rgba(255,255,255,0.7)]',
    variant === 'outline' &&
      'border border-[rgba(244,242,239,0.35)] text-ivory hover:-translate-y-0.5 hover:bg-[rgba(244,242,239,0.1)]',
    className,
  )

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  )

  return (
    <motion.span
      ref={(el) => {
        ref.current = el
      }}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex"
    >
      {to ? (
        <Link to={to} className={base} onClick={onClick} data-cursor>
          {inner}
        </Link>
      ) : href ? (
        <a href={href} className={base} onClick={onClick} data-cursor>
          {inner}
        </a>
      ) : (
        <button type={type} className={base} onClick={onClick} data-cursor>
          {inner}
        </button>
      )}
    </motion.span>
  )
}
