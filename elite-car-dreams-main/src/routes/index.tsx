import { createFileRoute, Link } from "@tanstack/react-router";
import heroSuv from "@/assets/hero-suv.jpg";
import detailInterior from "@/assets/detail-interior.jpg";
import { BookingBar } from "@/components/site/BookingBar";
import { VehicleCard } from "@/components/site/VehicleCard";
import { fleet, whatsappLink } from "@/data/fleet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KPMLXR — Luxury Car Rental Johannesburg | KPM Luxury Rentals" },
      {
        name: "description",
        content:
          "Premium car rental in Johannesburg. Executive sedans, luxury SUVs and chauffeur transport for weddings, matric dances, corporate and embassy clients.",
      },
      { property: "og:title", content: "KPMLXR — Luxury Car Rental Johannesburg" },
      {
        property: "og:description",
        content:
          "Luxury Lived. Memories Captured. Executive fleet hire across Gauteng with WhatsApp enquiry and deposit-only reservations.",
      },
    ],
  }),
  component: Home,
});

const reasons = [
  "Johannesburg-based since MMXXII, with a team that lives in the executive travel market every day",
  "One of the most diverse independently owned luxury fleets in Gauteng",
  "Delivery and collection at any Gauteng address, including O.R. Tambo and Lanseria",
  "Vetted chauffeurs, armoured options and protocol vehicles for embassy and executive protection work",
  "Transparent rand pricing, no holding deposit until availability and driver approval are confirmed",
];

const services = [
  {
    title: "Monthly Rentals",
    body: "Long-term fleet agreements for business, embassy and personal travel.",
    to: "/corporate" as const,
    cta: "Learn more",
  },
  {
    title: "International Travel",
    body: "Planning a trip abroad? We have international bookings sorted.",
    to: "/international" as const,
    cta: "Book now",
  },
];

const serviceImages = {
  "Monthly Rentals": "/assets/car-suv.jpg",
  "International Travel": "/assets/car-limo.jpg",
} as const;

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const image = serviceImages[service.title];

  return (
    <Link
      to={service.to}
      className="group relative min-h-[440px] overflow-hidden bg-foreground text-background transition-transform duration-500 hover:-translate-y-2"
      style={{ backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover" }}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/85 transition-colors duration-500 group-hover:from-black/65" />
      <div className="relative flex h-full min-h-[440px] flex-col items-center justify-between p-8 text-center lg:p-10">
        <div>
          <h3 className="font-display text-3xl font-black uppercase tracking-tight lg:text-4xl">
            {service.title}
          </h3>
          <p className="mx-auto mt-6 max-w-[28ch] text-sm leading-relaxed text-foreground/90">
            {service.body}
          </p>
        </div>
        <span className="border border-background px-8 py-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group-hover:bg-background group-hover:text-foreground">
          {service.cta}
        </span>
      </div>
    </Link>
  );
}

function Home() {
  return (
    <>
      <BookingBar />

      <header className="relative min-h-[70vh] overflow-hidden border-b border-border">
        <img
          src={heroSuv}
          alt="Matte black luxury SUV parked in Sandton, Johannesburg at night"
          width={1088}
          height={1920}
          className="absolute inset-0 size-full object-cover brightness-50"
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl animate-reveal-up flex-col justify-end px-8 py-20">
          <p className="eyebrow mb-6">Johannesburg, South Africa</p>
          <h1 className="text-balance font-display text-6xl font-black leading-[0.9] tracking-tighter lg:text-8xl">
            LUXURY
            <br />
            IN MOTION<span className="text-sand">.</span>
          </h1>
          <p className="mt-8 max-w-[48ch] text-sm leading-relaxed text-foreground/80">
            Executive sedans, luxury SUVs and chauffeur transport for private clients, corporates,
            embassies and event customers across Gauteng.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              to="/fleet"
              className="bg-foreground px-8 py-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
            >
              View the Fleet
            </Link>
            <Link to="/corporate" className="rule-link text-foreground">
              Corporate &amp; Embassy
              <span className="rule" />
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-sand px-8 py-16 text-center text-background">
        <h2 className="font-display text-5xl font-black uppercase tracking-tighter lg:text-7xl">
          Zero Holding Deposit
        </h2>
        <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.2em]">
          Because trust goes both ways.
        </p>
      </section>

      <section className="border-b border-border px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow mb-6 block">Fast, secure and trusted</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight lg:text-5xl">
            KPM Luxury Rentals South Africa
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Proudly South African, KPM Luxury Rentals supplies executive and luxury vehicles to
            clients across Gauteng and beyond. Our fleet spans premium sedans, luxury SUVs,
            chauffeur-driven people movers, sports convertibles and protocol limousines — with
            delivery, chauffeur and event packages arranged around your itinerary.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow mb-4 block">Where confidence meets the road</span>
          <h2 className="mb-16 font-display text-4xl font-black uppercase tracking-tight lg:text-5xl">
            Why rent with KPMLXR
          </h2>
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r, i) => (
              <div key={r} className="bg-background p-8">
                <span className="font-display text-5xl font-black tracking-tighter text-sand">
                  {i + 1}
                </span>
                <p className="mt-6 text-sm leading-relaxed text-muted">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border px-8 py-24">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow mb-4 block">The Collection</span>
            <h2 className="font-display text-5xl font-black uppercase tracking-tight">
              Available Fleet
            </h2>
          </div>
          <Link to="/fleet" className="rule-link text-foreground">
            All Vehicles
            <span className="rule" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {fleet.slice(0, 3).map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-foreground px-8 py-24 text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative animate-reveal-up">
            <span className="pointer-events-none absolute -left-12 -top-12 select-none font-display text-[200px] font-black leading-none tracking-tighter opacity-5">
              B6
            </span>
            <img
              src={detailInterior}
              alt="Quilted leather interior detail of a KPMLXR luxury vehicle"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full object-cover"
            />
          </div>

          <div>
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.4em]">
              Go further. Go safer. Go KPMLXR.
            </span>
            <h2 className="mb-8 font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-6xl">
              Embrace
              <br />
              The Journey.
            </h2>
            <p className="mb-10 text-sm leading-relaxed opacity-80">
              Select your dates, pick-up and drop-off point, then browse the vehicles available for
              your trip. Monthly rentals, multiple vehicles, scheduled invoicing and replacement
              vehicles are all arranged on account for organisations operating across Gauteng.
            </p>

            <div className="space-y-4 border-t border-background/20 pt-8 font-mono text-[11px] uppercase tracking-wider">
              {[
                ["Rental terms", "1 – 24 Months"],
                ["Invoicing", "Monthly, on account"],
                ["Replacement", "Within 24 hours"],
                ["Support", "24/7 roadside"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span>{k}</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>

            <Link to="/corporate" className="rule-link mt-12 text-background">
              Request Corporate Proposal
              <span className="rule" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow mb-4 block">Go further. Go safer. Go KPMLXR.</span>
          <h2 className="mb-16 font-display text-4xl font-black uppercase tracking-tight lg:text-5xl">
            Book your rental today
          </h2>
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Book a vehicle online", v: "Start with the search bar", type: "link" as const },
              { k: "Telephone reservations", v: "+27 11 884 0000", href: "tel:+27118840000" },
              { k: "Email reservations", v: "drive@kpmlxr.co.za", href: "mailto:drive@kpmlxr.co.za" },
              {
                k: "WhatsApp enquiries",
                v: "Chat to the team",
                href: whatsappLink("Hi KPMLXR, I would like to book a vehicle."),
              },
            ].map((c) => (
              <div key={c.k} className="bg-background p-10">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em]">
                  {c.k}
                </h3>
                {"type" in c ? (
                  <Link to="/fleet" className="rule-link text-sand">
                    {c.v}
                    <span className="rule" />
                  </Link>
                ) : (
                  <a href={c.href} className="rule-link text-sand">
                    {c.v}
                    <span className="rule" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
