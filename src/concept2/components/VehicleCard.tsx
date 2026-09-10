import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Vehicle } from '@/concept2/lib/site'
import Parallax from '@/concept2/components/anim/Parallax'

/**
 * VehicleCard (design.md §7.5). Image 3:2 with bottom gradient, category tag,
 * Playfair name, gold price + /day, hairlines, 3-col spec row, VIEW DETAILS.
 * Hover: image scale 1.06, border gold/35, chevron +6px, lift -4px + shadow.
 */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to={`/c2/fleet/${vehicle.slug}`}
      data-cursor
      className="group block border border-subtle bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(199,191,174,0.35)] hover:bg-surface-hover hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Parallax from={-6} to={6} className="absolute inset-[-8%]">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
        </Parallax>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
          {vehicle.category}
        </p>
        <h3 className="mt-3 font-c1serif text-[1.6rem] leading-[1.25] text-ivory">{vehicle.name}</h3>
        <p className="mt-3">
          <span className="text-xl font-semibold text-gold">{vehicle.price}</span>{' '}
          <span className="text-[11px] text-ivory-muted">/day</span>
        </p>

        <div className="my-6 h-px bg-subtle" />

        <div className="grid grid-cols-3 gap-2">
          {vehicle.specs.map((s) => (
            <div key={s.label}>
              <p className="text-[13px] font-medium text-ivory">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="my-6 h-px bg-subtle" />

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory-secondary transition-colors duration-300 group-hover:text-ivory">
            View Details
          </span>
          <ChevronRight
            size={16}
            className="text-gold transition-transform duration-500 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </Link>
  )
}
