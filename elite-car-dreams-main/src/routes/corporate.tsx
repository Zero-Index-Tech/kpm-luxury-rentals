import { createFileRoute } from "@tanstack/react-router";
import carLimo from "@/assets/car-limo.jpg";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate & Embassy Car Rental Johannesburg | KPMLXR" },
      {
        name: "description",
        content:
          "Long-term corporate and embassy vehicle rental in Johannesburg: monthly fleet agreements, scheduled invoicing, replacement vehicles and executive transport.",
      },
      { property: "og:title", content: "Corporate & Embassy Fleet Rental — KPMLXR" },
      {
        property: "og:description",
        content:
          "Monthly rentals, account invoicing and executive transport for organisations across Gauteng.",
      },
    ],
  }),
  component: Corporate,
});

const capabilities = [
  ["Monthly fleet agreements", "One to twenty-four months, one vehicle or twenty."],
  ["Scheduled invoicing", "Account terms with a single monthly invoice and statement."],
  ["Replacement vehicles", "A like-for-like vehicle within 24 hours of a breakdown."],
  ["Account management", "A named contact who knows your drivers and your schedule."],
  ["Maintenance & roadside", "Servicing, licensing and 24/7 roadside support included."],
  ["Executive transport", "Vetted chauffeurs for delegations, protocol and airport runs."],
];

function Corporate() {
  return (
    <>
      <header className="grid grid-cols-1 border-b border-border lg:grid-cols-12">
        <div className="flex animate-reveal-up flex-col justify-center border-border p-8 lg:col-span-7 lg:border-r lg:p-16">
          <span className="eyebrow mb-6 block">Corporate & Embassy</span>
          <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            Fleet On
            <br />
            Account<span className="text-sand">.</span>
          </h1>
          <p className="mt-8 max-w-[45ch] text-sm leading-relaxed text-muted">
            KPM Luxury Rentals supplies long-term vehicles to corporates, embassies and other
            rental operators. Send your requirements and we return a tailored written proposal —
            not an instant checkout.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={carLimo}
            alt="Executive limousine waiting at a hotel entrance at night in Johannesburg"
            width={1024}
            height={640}
            className="size-full min-h-[40vh] object-cover"
          />
        </div>
      </header>

      <section className="bg-foreground px-8 py-24 text-background">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 font-display text-4xl font-black uppercase tracking-tighter">
            Capabilities
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, body], i) => (
              <div key={title} className="border-t border-background/20 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 mt-4 font-display text-xl font-bold uppercase tracking-tight">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed opacity-80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 py-24">
        <EnquiryForm
          heading="Request a corporate proposal"
          intent="Corporate"
          showVehicle={false}
          submitLabel="Request Proposal via WhatsApp"
        />
      </section>
    </>
  );
}
