import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VehicleCard } from "@/components/site/VehicleCard";
import { fleet, fleetCategories } from "@/data/fleet";

type FleetSearch = {
  pickup?: string;
  dropoff?: string;
  start?: string;
  end?: string;
};

export const Route = createFileRoute("/fleet/")({
  validateSearch: (search: Record<string, unknown>): FleetSearch => {
    const out: FleetSearch = {};
    for (const key of ["pickup", "dropoff", "start", "end"] as const) {
      const value = search[key];
      if (typeof value === "string" && value) out[key] = value;
    }
    return out;
  },
  head: () => ({
    meta: [
      { title: "The Fleet — Luxury Cars for Hire in Johannesburg | KPMLXR" },
      {
        name: "description",
        content:
          "Browse the KPM Luxury Rentals fleet: executive sedans, luxury SUVs, chauffeur-driven people movers and event vehicles with daily rates in rand.",
      },
      { property: "og:title", content: "The KPMLXR Fleet — Luxury Car Hire Johannesburg" },
      {
        property: "og:description",
        content: "Executive sedans, luxury SUVs and chauffeur transport available across Gauteng.",
      },
    ],
  }),
  component: FleetIndex,
});

function FleetIndex() {
  const { pickup, dropoff, start, end } = Route.useSearch();
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? fleet : fleet.filter((v) => v.category === active);

  const hasSearch = Boolean(pickup || dropoff || start || end);

  return (
    <section className="px-8 py-24">
      {hasSearch && (
        <div className="mb-12 border border-border bg-card p-6">
          <span className="eyebrow mb-4 block">Your search</span>
          <div className="grid grid-cols-2 gap-6 font-mono text-[11px] uppercase tracking-wider lg:grid-cols-4">
            {[
              ["Pick-up", pickup],
              ["Drop-off", dropoff],
              ["From", start],
              ["To", end],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <span className="text-muted">{k}</span>
                <span className="text-foreground">{v || "—"}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            All vehicles below can be delivered to your pick-up point. Availability for these dates
            is confirmed on enquiry.{" "}
            <Link to="/contact" className="text-sand underline">
              Request availability
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow mb-4 block">The Collection</span>
          <h1 className="font-display text-5xl font-black uppercase tracking-tight lg:text-7xl">
            The Fleet
          </h1>
          <p className="mt-6 max-w-[50ch] text-sm leading-relaxed text-muted">
            Rates shown are per day, excluding delivery and optional chauffeur. Availability is
            confirmed on enquiry.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest">
          {fleetCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={
                active === c
                  ? "border-b-2 border-foreground pb-2 text-foreground"
                  : "pb-2 text-muted transition-colors hover:text-foreground"
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
