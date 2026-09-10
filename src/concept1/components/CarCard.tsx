import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Vehicle } from '@/lib/site';

interface CarCardProps {
  vehicle: Vehicle;
}

export default function CarCard({ vehicle }: CarCardProps) {
  return (
    <Link
      to={`/c1/fleet/${vehicle.slug}`}
      className="group flex flex-col overflow-hidden rounded-[6px] border border-lxr-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(17,17,18,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-lxr-gray">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-lxr-ink backdrop-blur">
          {vehicle.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-lxrtitle text-lg font-semibold leading-snug text-lxr-ink">
            {vehicle.name}
          </h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-lxr-mist transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lxr-ink" />
        </div>
        <p className="mt-2 text-sm text-lxr-muted">
          <span className="font-lxrtitle text-base font-semibold text-lxr-ink">
            {vehicle.price}
          </span>{' '}
          / day
        </p>
        <div className="mt-5 grid grid-cols-3 divide-x divide-lxr-line border-t border-lxr-line pt-4">
          {vehicle.specs.map((s) => (
            <div key={s.label} className="px-3 first:pl-0 last:pr-0">
              <div className="font-lxrtitle text-sm font-semibold text-lxr-ink">{s.value}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-lxr-mist">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
