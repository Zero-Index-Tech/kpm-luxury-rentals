import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Vehicle } from '@/lib/site'
import Parallax from '@/components/anim/Parallax'

/**
 * VehicleCard v2 (design.md §7.5 — rydex stat-strip DNA):
 * rounded-[24px] ivory card; 3:2 image with slow scale on hover; body p-6
 * with category tag + Archivo 700 name; 4-column stat strip (label ABOVE
 * value, 1px taupe-soft verticals) — DAILY RENTAL price cell + three specs.
 * Hover: image scale 1.05 (0.8s), card lifts -6px with deeper soft shadow,
 * circular bg-ink arrow-up-right button (44px) fades+slides in top-right.
 * Click → /fleet/[slug].
 */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const stats = [{ value: vehicle.price, label: 'Daily Rental' }, ...vehicle.specs]

  return (
    <Link
      to={`/c3/fleet/${vehicle.slug}`}
      data-cursor
      className="group block overflow-hidden rounded-[24px] border border-taupe-soft bg-[#FBFAF7] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-lift"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Parallax from={-5} to={5} className="absolute inset-[-8%]">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="img-warm h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
        </Parallax>
        {/* circular arrow button — fades + slides in on hover */}
        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ink text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-taupe">
          {vehicle.category}
        </p>
        <h3 className="mt-2.5 font-display text-[1.5rem] font-bold leading-[1.15] tracking-[-0.015em] text-charcoal">
          {vehicle.name}
        </h3>

        {/* stat strip — label above value, 1px verticals */}
        <div className="mt-5 grid grid-cols-4 border-t border-taupe-soft py-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i > 0 ? 'border-l border-taupe-soft pl-3' : ''}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-taupe">
                {s.label}
              </p>
              <p className="mt-1.5 font-display text-[0.95rem] font-bold leading-none tracking-[-0.01em] text-charcoal">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
