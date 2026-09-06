import { createFileRoute } from "@tanstack/react-router";
import carSport from "@/assets/car-sport.jpg";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const packages = [
  {
    name: "Wedding",
    body: "Ribbons, detailing, delivery to the venue and a chauffeur for the couple. Multi-vehicle convoys available for the bridal party.",
    extras: ["Décor & ribbons", "Chauffeur", "Venue delivery", "Convoy pricing"],
  },
  {
    name: "Matric Dance",
    body: "A safe, supervised arrival with a vetted chauffeur, parent contact and a fixed pick-up and drop-off schedule.",
    extras: ["Vetted chauffeur", "Parent contact", "Photo stop", "Fixed schedule"],
  },
  {
    name: "Corporate Events",
    body: "Delegate shuttles, executive arrivals and multi-day event fleets billed on a single invoice.",
    extras: ["Multiple vehicles", "Single invoice", "Branded arrival", "Standby driver"],
  },
  {
    name: "Photoshoot & Music Video",
    body: "Hourly and half-day studio hire with a handler on site. Static and driving shots both permitted.",
    extras: ["Hourly rates", "On-site handler", "Driving shots", "Location delivery"],
  },
  {
    name: "Airport & Executive Travel",
    body: "OR Tambo and Lanseria transfers with flight tracking, meet-and-greet and waiting time included.",
    extras: ["Flight tracking", "Meet & greet", "Waiting time", "Fixed rate"],
  },
  {
    name: "Weekend Luxury Experience",
    body: "Friday-to-Monday hire with extended mileage, delivery and collection anywhere in Gauteng.",
    extras: ["Extended mileage", "Delivery & collection", "Fuel arranged", "48h notice"],
  },
];

export const Route = createFileRoute("/occasions")({
  head: () => ({
    meta: [
      { title: "Occasion Packages — Wedding & Matric Dance Car Hire | KPMLXR" },
      {
        name: "description",
        content:
          "Wedding car hire, matric dance transport, corporate events, photoshoots and airport transfers in Johannesburg. Request an occasion quote from KPM Luxury Rentals.",
      },
      { property: "og:title", content: "Occasion Packages — KPMLXR Johannesburg" },
      {
        property: "og:description",
        content:
          "Wedding, matric dance, corporate event, photoshoot and airport packages with delivery and chauffeur extras.",
      },
    ],
  }),
  component: Occasions,
});

function Occasions() {
  return (
    <>
      <header className="grid grid-cols-1 border-b border-border lg:grid-cols-12">
        <div className="flex animate-reveal-up flex-col justify-center border-border p-8 lg:col-span-7 lg:border-r lg:p-16">
          <span className="eyebrow mb-6 block">Packages</span>
          <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            Built For
            <br />
            The Occasion<span className="text-sand">.</span>
          </h1>
          <p className="mt-8 max-w-[45ch] text-sm leading-relaxed text-muted">
            Every package is quoted around the day itself — the vehicle, the hours, the route and
            the extras. Tell us the date and we will price it.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={carSport}
            alt="White convertible dressed with wedding ribbon outside an elegant venue"
            width={1024}
            height={640}
            className="size-full min-h-[40vh] object-cover"
          />
        </div>
      </header>

      <section className="px-8 py-24">
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className="bg-background p-10">
              <h2 className="mb-4 font-display text-2xl font-black uppercase tracking-tight">
                {p.name}
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-muted">{p.body}</p>
              <ul className="space-y-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
                {p.extras.map((e) => (
                  <li key={e} className="flex items-center gap-3">
                    <span className="size-1 rounded-full bg-sand" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 pb-24">
        <EnquiryForm
          heading="Request an event quote"
          intent="Occasion"
          submitLabel="Request Quote via WhatsApp"
        />
      </section>
    </>
  );
}
