import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const steps = [
  ["Register", "Submit your details and the kind of clients you refer."],
  ["Get approved", "We confirm your partner rate and issue your referral code."],
  ["Refer a client", "Send the client to us with your code, or pass the booking directly."],
  ["Get paid", "Commission is tracked per booking and settled on a monthly statement."],
];

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Rental Partner Programme — Refer & Earn | KPMLXR" },
      {
        name: "description",
        content:
          "Join the KPM Luxury Rentals partner programme: agreed partner rates, tracked referrals, protected commission and monthly statements for agents and rental operators.",
      },
      { property: "og:title", content: "Rental Partner Programme — KPMLXR" },
      {
        property: "og:description",
        content:
          "Agreed rates, tracked referrals and protected commission for agents and rental operators.",
      },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <>
      <header className="animate-reveal-up border-b border-border px-8 py-24 lg:px-16">
        <span className="eyebrow mb-6 block">Trade & Referral</span>
        <h1 className="max-w-[16ch] text-balance font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
          Rental Partner Programme<span className="text-sand">.</span>
        </h1>
        <p className="mt-8 max-w-[55ch] text-sm leading-relaxed text-muted">
          Agents, event planners and rental operators have built a large part of this business. The
          programme formalises it: agreed rates, tracked bookings and commission that cannot be
          bypassed.
        </p>
      </header>

      <section className="px-8 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, body], i) => (
            <div key={title} className="bg-background p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mb-3 mt-4 font-display text-xl font-bold uppercase tracking-tight">
                {title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground px-8 py-24 text-background">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter">
              Fleet Supply
              <br />& White Label.
            </h2>
          </div>
          <div>
            <p className="mb-8 text-sm leading-relaxed opacity-80">
              KPM supplies vehicles to other rental businesses — overflow during peak periods,
              replacements for vehicles off the road, and premium models you do not own. Vehicles
              can be supplied under your own rental brand by arrangement.
            </p>
            <div className="space-y-4 border-t border-background/20 pt-8 font-mono text-[11px] uppercase tracking-wider">
              {[
                ["Trade rates", "By agreement"],
                ["Turnaround", "From 24 hours"],
                ["White label", "On approval"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span>{k}</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 py-24">
        <EnquiryForm
          heading="Become a rental partner"
          intent="Partner"
          showVehicle={false}
          submitLabel="Apply via WhatsApp"
        />
      </section>
    </>
  );
}
