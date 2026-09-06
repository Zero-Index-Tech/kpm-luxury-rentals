import { Link } from "@tanstack/react-router";
import { formatRand, type Vehicle } from "@/data/fleet";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/fleet/$slug"
      params={{ slug: vehicle.slug }}
      className="group block bg-background p-6"
    >
      <div className="mb-6 aspect-16/10 overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} available from KPMLXR in Johannesburg`}
          loading="lazy"
          width={1024}
          height={640}
          className="size-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            {vehicle.name}
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
            {vehicle.subtitle}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-black">{formatRand(vehicle.pricePerDay)}</p>
          <p className="text-[9px] uppercase tracking-widest text-sand">per day</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {vehicle.tags.map((tag) => (
          <span
            key={tag}
            className={`border border-border px-3 py-1 text-[9px] uppercase tracking-widest ${
              tag === vehicle.status && tag !== "Available" ? "text-sand" : ""
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
