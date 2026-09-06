import { createFileRoute } from "@tanstack/react-router";
import carLimo from "@/assets/car-limo.jpg";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [
      { title: "International Travel Car Rental | KPMLXR" },
      {
        name: "description",
        content:
          "International travel planning with premium vehicle rental, airport transfers and executive mobility arranged around your itinerary.",
      },
    ],
  }),
  component: InternationalTravel,
});

const travelServices = [
  ["Airport transfers", "Meet-and-greet collection, flight-aware timing and a polished arrival experience."],
  ["Cross-border planning", "Share your itinerary and we will coordinate the right vehicle, dates and handover details."],
  ["Executive travel", "Reliable premium transport for business trips, delegations and extended stays."],
];

function InternationalTravel() {
  return (
    <>
      <header className="grid grid-cols-1 border-b border-border lg:grid-cols-12">
        <div className="flex animate-reveal-up flex-col justify-center border-border p-8 lg:col-span-7 lg:border-r lg:p-16">
          <span className="eyebrow mb-6 block">International Travel</span>
          <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            Travel
            <br />
            Further<span className="text-sand">.</span>
          </h1>
          <p className="mt-8 max-w-[45ch] text-sm leading-relaxed text-muted">
            Planning a trip abroad? Tell us where you are going, how long you will be away and what
            support you need. KPM will arrange the right premium travel solution around your itinerary.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={carLimo}
            alt="Executive vehicle ready for international travel transfer"
            width={1024}
            height={640}
            className="size-full min-h-[40vh] object-cover"
          />
        </div>
      </header>

      <section className="bg-foreground px-8 py-24 text-background">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow mb-6 block">Travel support</span>
          <h2 className="mb-16 font-display text-4xl font-black uppercase tracking-tighter lg:text-6xl">
            Your journey, properly arranged.
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {travelServices.map(([title, body], index) => (
              <div key={title} className="border-t border-background/20 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 mt-4 font-display text-xl font-bold uppercase tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed opacity-80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 py-24">
        <EnquiryForm
          heading="Plan your international travel"
          intent="International Travel"
          submitLabel="Request Travel Support via WhatsApp"
        />
      </section>
    </>
  );
}
