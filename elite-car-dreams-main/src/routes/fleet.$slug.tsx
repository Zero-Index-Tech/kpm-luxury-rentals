import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { formatRand, getVehicle } from "@/data/fleet";

export const Route = createFileRoute("/fleet/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Vehicle unavailable — KPMLXR" }, { name: "robots", content: "noindex" }],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.name} Hire Johannesburg — from ${formatRand(vehicle.pricePerDay)}/day | KPMLXR`;
    return {
      meta: [
        { title },
        { name: "description", content: vehicle.description },
        { property: "og:title", content: title },
        { property: "og:description", content: vehicle.description },
      ],
    };
  },
  notFoundComponent: VehicleNotFound,
  component: VehicleDetail,
});

function VehicleNotFound() {
  return (
    <div className="px-8 py-32 text-center">
      <h1 className="font-display text-4xl font-black uppercase tracking-tight">
        Vehicle not found
      </h1>
      <Link to="/fleet" className="rule-link mt-8 inline-flex text-sand">
        Back to the fleet
        <span className="rule" />
      </Link>
    </div>
  );
}

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();

  return (
    <article>
      <div className="grid grid-cols-1 border-b border-border lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img
            src={vehicle.image}
            alt={`${vehicle.name} luxury rental vehicle`}
            width={1024}
            height={640}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center border-border p-8 lg:col-span-5 lg:border-l lg:p-16">
          <span className="eyebrow mb-6 block">{vehicle.ref}</span>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter">
            {vehicle.name}
          </h1>
          <p className="mt-3 text-[11px] uppercase tracking-widest text-muted">
            {vehicle.subtitle}
          </p>
          <p className="mt-8 text-sm leading-relaxed text-muted">{vehicle.description}</p>

          <div className="mt-10 flex items-end justify-between border-t border-border pt-8">
            <div>
              <p className="font-display text-4xl font-black">
                {formatRand(vehicle.pricePerDay)}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-sand">per day</p>
            </div>
            <span className="border border-border px-3 py-1 text-[9px] uppercase tracking-widest text-sand">
              {vehicle.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-8 py-24 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">
            Specification
          </h2>
          <div className="space-y-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-wider">
            {vehicle.specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-muted">{s.label}</span>
                <span className="font-bold">{s.value}</span>
              </div>
            ))}
          </div>
          <Link to="/requirements" className="rule-link mt-12 text-foreground">
            Rental Requirements
            <span className="rule" />
          </Link>
        </div>

        <EnquiryForm
          heading="Check availability"
          intent="Vehicle"
          vehicleLocked={vehicle.name}
        />
      </div>
    </article>
  );
}
