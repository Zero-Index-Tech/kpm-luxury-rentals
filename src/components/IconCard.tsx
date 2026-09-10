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
  /** 'ivory' (default, light card) or 'glass' (glass-card-dark on ink bands). */
  variant?: 'ivory' | 'glass'
  className?: string
}

/**
 * IconCard (design.md §7.8). Ivory variant: bg-[#FBFAF7] rounded-[24px] card,
 * 44px taupe/12 circle chip with charcoal icon; hover chip → bg-ink + ivory
 * icon, lift -4px. Glass variant: glass-card-dark on dark bands, ivory title
 * and icon; hover border brightens, chip → ivory + ink icon.
 */
export default function IconCard({
  icon: Icon,
  title,
  body,
  to,
  state,
  variant = 'ivory',
  className,
}: IconCardProps) {
  const navigate = useNavigate()
  const glass = variant === 'glass'

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
        'group relative rounded-[24px] p-8 transition-all duration-500 hover:-translate-y-1',
        to && 'cursor-pointer',
        glass
          ? 'glass-card-dark hover:border-[rgba(244,242,239,0.3)]'
          : 'border border-taupe-soft bg-[#FBFAF7] hover:shadow-card-lift',
        className,
      )}
    >
      <span
        className={cn(
          'icon-chip flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500',
          glass
            ? 'bg-[rgba(244,242,239,0.12)] group-hover:bg-ivory'
            : 'bg-[rgba(139,124,115,0.12)] group-hover:bg-ink',
        )}
      >
        <Icon
          size={18}
          className={cn(
            'transition-colors duration-500',
            glass ? 'text-ivory group-hover:text-ink' : 'text-charcoal group-hover:text-ivory',
          )}
          aria-hidden
        />
      </span>
      <h3
        className={cn(
          'mt-6 font-display text-[1.3rem] font-bold leading-[1.15] tracking-[-0.015em]',
          glass ? 'text-ivory' : 'text-charcoal',
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'mt-3 text-sm font-normal leading-[1.75]',
          glass ? 'text-ivory-70' : 'text-taupe',
        )}
      >
        {body}
      </p>
    </div>
  )
}
