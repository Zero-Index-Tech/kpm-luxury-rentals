import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

/**
 * KPM buttons (design.md §7.3). Primary = gold fill + sheen sweep,
 * outline = ghost gold border. Magnetic on desktop (±4px within 60px,
 * spring stiffness 150 / damping 15). Framer-Motion-owned.
 */
export default function GoldButton({
  children,
  to,
  href,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
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
    'inline-flex items-center justify-center gap-2 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] rounded-[2px] transition-all duration-300 active:scale-[0.97] select-none',
    variant === 'primary'
      ? 'btn-sheen bg-gold text-ink hover:bg-gold-bright hover:-translate-y-0.5'
      : 'border border-[rgba(199,191,174,0.4)] text-ivory hover:border-gold hover:bg-[rgba(199,191,174,0.08)] hover:text-gold',
    className,
  )

  const content = (
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
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={base} onClick={onClick} data-cursor>
          {children}
        </a>
      ) : (
        <button type={type} className={base} onClick={onClick} data-cursor>
          {children}
        </button>
      )}
    </motion.span>
  )

  return content
}
