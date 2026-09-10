import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface IconCardProps {
  icon: LucideIcon
  title: string
  body: string
  /** Optional click target (e.g. '/contact' with pre-selection state). */
  to?: string
  state?: unknown
  className?: string
}

/**
 * IconCard (design.md §7.8): surface card, 40px gold/10 circle chip with gold
 * icon, Playfair title, secondary body. Hover: chip gold/20, border gold/30,
 * icon rotates -6°, 1px gold top-edge draws left → right.
 */
export default function IconCard({ icon: Icon, title, body, to, state, className }: IconCardProps) {
  const navigate = useNavigate()

  return (
    <div
      role={to ? 'link' : undefined}
      tabIndex={to ? 0 : undefined}
      data-cursor={to ? true : undefined}
      onClick={() => to && navigate(to, { state })}
      onKeyDown={(e) => {
        if (to && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          navigate(to, { state })
        }
      }}
      className={cn(
        'group relative border border-subtle bg-surface p-8 transition-all duration-500',
        to && 'cursor-pointer',
        'hover:border-[rgba(199,191,174,0.3)] hover:bg-surface-hover',
        className,
      )}
    >
      {/* gold top-edge draw on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <span className="icon-chip flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
        <Icon
          size={18}
          className="text-gold transition-transform duration-500 group-hover:-rotate-6"
          aria-hidden
        />
      </span>
      <h3 className="mt-6 font-c1serif text-[1.35rem] leading-[1.25] text-ivory">{title}</h3>
      <p className="mt-3 text-sm font-light leading-[1.75] text-ivory-secondary">{body}</p>
    </div>
  )
}
