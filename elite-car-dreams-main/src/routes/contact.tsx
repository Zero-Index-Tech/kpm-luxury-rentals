import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Availability — KPM Luxury Rentals Johannesburg" },
      {
        name: "description",
        content:
          "Check vehicle availability with KPM Luxury Rentals. WhatsApp, call or email our Sandton, Johannesburg team for luxury and executive car hire.",
      },
      { property: "og:title", content: "Contact KPMLXR — Luxury Car Rental Johannesburg" },
      {
        property: "og:description",
        content: "Check availability, request a quote, or speak to our Sandton team.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-8 py-24 lg:grid-cols-2">
      <div className="animate-reveal-up">
        <span className="eyebrow mb-6 block">Enquiries</span>
        <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-7xl">
          Check
          <br />
          Availability<span className="text-sand">.</span>
        </h1>
        <p className="mt-8 max-w-[45ch] text-sm leading-relaxed text-muted">
          Send us the vehicle and the dates. We confirm availability, driver eligibility and the
          final price before any reservation deposit is requested.
        </p>

        <div className="mt-12 space-y-6 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-wider">
          {[
            ["Location", "Sandton, Johannesburg"],
            ["Telephone", "+27 11 884 0000"],
            ["Email", "drive@kpmlxr.co.za"],
            ["Hours", "Mon – Sun, 07:00 – 21:00"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-muted">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
        </div>

        <a
          href="https://www.tiktok.com/@kpmluxerentals"
          target="_blank"
          rel="noreferrer"
          className="rule-link mt-12 text-sand"
        >
          @kpmluxerentals on TikTok
          <span className="rule" />
        </a>
      </div>

      <EnquiryForm heading="Availability enquiry" intent="Availability" />
    </section>
  );
}
