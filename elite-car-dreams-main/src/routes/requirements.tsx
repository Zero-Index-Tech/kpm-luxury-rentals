import { createFileRoute } from "@tanstack/react-router";

const requirements = [
  ["Minimum age", "25 years for standard vehicles, 30 for sport and premium models."],
  ["Licence", "A valid unendorsed licence held for at least three years."],
  ["Documents", "ID or passport, proof of address and the payment card in your name."],
  ["Deposit", "A refundable security deposit is held for the rental period."],
  ["Mileage", "250km per day included; additional mileage billed per kilometre."],
  ["Territory", "Gauteng standard. Cross-border and out-of-province by written approval."],
];

const faqs = [
  [
    "How do I reserve a vehicle?",
    "Send an enquiry with your dates. We confirm availability and price, approve the driver, then request a reservation deposit. The balance is settled on collection.",
  ],
  [
    "Do you deliver?",
    "Yes. Delivery and collection anywhere in Gauteng, quoted by distance. Airport delivery to OR Tambo and Lanseria is available.",
  ],
  [
    "Can I hire a chauffeur?",
    "Chauffeurs are available on all vehicles and are included on the people movers and the protocol limousine.",
  ],
  [
    "Do you handle long-term corporate rentals?",
    "Yes. Monthly agreements with account invoicing, replacement vehicles and maintenance are handled through our corporate desk.",
  ],
  [
    "What happens if the vehicle is unavailable?",
    "We offer a comparable alternative from the fleet or from our partner network, or refund the reservation in full.",
  ],
];

export const Route = createFileRoute("/requirements")({
  head: () => ({
    meta: [
      { title: "Rental Requirements & FAQ — KPM Luxury Rentals" },
      {
        name: "description",
        content:
          "Driver age, licence, documentation, deposit and mileage requirements for renting with KPM Luxury Rentals in Johannesburg, plus answers to common questions.",
      },
      { property: "og:title", content: "Rental Requirements & FAQ — KPMLXR" },
      {
        property: "og:description",
        content: "What you need to rent with KPM Luxury Rentals, and answers to common questions.",
      },
    ],
  }),
  component: Requirements,
});

function Requirements() {
  return (
    <>
      <header className="animate-reveal-up border-b border-border px-8 py-24 lg:px-16">
        <span className="eyebrow mb-6 block">Before You Book</span>
        <h1 className="max-w-[16ch] text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
          Requirements & FAQ<span className="text-sand">.</span>
        </h1>
      </header>

      <section className="px-8 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">
              Rental Requirements
            </h2>
            <div className="space-y-6 border-t border-border pt-8">
              {requirements.map(([k, v]) => (
                <div key={k}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand">
                    {k}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">
              Frequently Asked
            </h2>
            <div className="border-t border-border">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-border py-6">
                  <summary className="cursor-pointer list-none font-display text-sm font-bold uppercase tracking-wide marker:hidden">
                    {q}
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
