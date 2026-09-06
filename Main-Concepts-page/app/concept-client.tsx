"use client";

import { type ComponentType, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  Gem,
  Heart,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Concept = "signature" | "institutional" | "fleet" | "elite";
type ServiceItem = {
  title: string;
  copy: string;
  slug: string;
  image: string;
  icon: ComponentType<{ size?: number }>;
};

const concepts: Array<{ id: Concept; number: string; name: string; note: string }> = [
  { id: "signature", number: "01", name: "Signature Services", note: "Premium service grid" },
  { id: "institutional", number: "02", name: "Quiet Authority", note: "Corporate & embassy" },
  { id: "fleet", number: "03", name: "Fleet Store", note: "Vehicle-first catalogue" },
  { id: "elite", number: "04", name: "Luxe Concierge", note: "Concierge-led experience" },
];

const fleet = [
  { name: "BMW X5", detail: "Luxury SUV | 3.0d / M50d xDrive", category: "SUV", image: "/assets/kpm-suv.webp" },
  { name: "Mercedes-Benz V-Class", detail: "People mover | V300d / V250d", category: "People Movers", image: "/assets/kpm-people-mover.webp" },
  { name: "Volkswagen Golf 8R", detail: "Performance | 2025", category: "Performance", image: "/assets/kpm-hatch.webp" },
  { name: "Toyota Fortuner", detail: "SUV | 2025 2.8 GD-6 VX", category: "SUV", image: "/assets/kpm-suv.webp" },
  { name: "BMW M440i Convertible", detail: "Performance | 2024", category: "Performance", image: "/assets/kpm-hero.png" },
  { name: "Mercedes-Benz E220d", detail: "Sedan | 2025 AMG Line", category: "Sedans", image: "/assets/kpm-hero.png" },
];

const essentialServices: ServiceItem[] = [
  { title: "Corporate", slug: "corporate", image: "/assets/kpm-suv.webp", copy: "Executive rental support for meetings, client hosting, productions and board-level movement.", icon: BriefcaseBusiness },
  { title: "Long-Term Rental", slug: "long-term-rental", image: "/assets/kpm-people-mover.webp", copy: "Flexible monthly arrangements for founders, teams, partners and clients who need reliable premium mobility.", icon: Clock3 },
  { title: "Short-Term & Events", slug: "events", image: "/assets/kpm-hero.png", copy: "High-impact vehicles for weekends, launches, leisure, weddings and landmark arrivals.", icon: CalendarDays },
];

const signatureServices: ServiceItem[] = [
  { title: "Corporate", slug: "corporate", image: "/assets/kpm-suv.webp", copy: "Polished mobility for executives, guests and high-value business movements.", icon: BriefcaseBusiness },
  { title: "Embassies", slug: "embassies", image: "/assets/kpm-people-mover.webp", copy: "Discreet, consistent transport support for diplomatic and institutional requirements.", icon: Landmark },
  { title: "Matric Dance", slug: "matric-dance", image: "/assets/kpm-hatch.webp", copy: "Memorable arrivals with the right vehicle presence and a clear booking flow.", icon: Sparkles },
  { title: "Weddings", slug: "weddings", image: "/assets/kpm-hero.png", copy: "Elegant arrival and photo-moment vehicles for ceremony, reception and guest movement.", icon: Heart },
  { title: "Long-Term Rental", slug: "long-term-rental", image: "/assets/kpm-people-mover.webp", copy: "Monthly premium vehicle access with tailored terms and direct support.", icon: Clock3 },
  { title: "Short-Term Rental", slug: "short-term-rental", image: "/assets/kpm-suv.webp", copy: "Luxury self-drive and chauffeur-ready options for days, weekends and travel windows.", icon: CalendarDays },
];

const conciergePrompts = [
  "I need a vehicle for a corporate guest",
  "Help me choose a wedding arrival car",
  "Compare long-term rental options",
];

const slides = [
  { label: "Luxury in motion", title: "Premium cars, prepared around the occasion.", image: "/assets/kpm-hero.png" },
  { label: "Fleet confidence", title: "From executive SUVs to people movers.", image: "/assets/kpm-suv.webp" },
  { label: "Concierge-led", title: "A smarter path from interest to booking.", image: "/assets/kpm-people-mover.webp" },
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={`brand-mark ${inverse ? "inverse" : ""}`} aria-label="KPM Luxe Rentals home">
      <span>KPMLXR</span>
      <small>Luxury in motion</small>
    </a>
  );
}

function QuotePanel({ open, onClose, source }: { open: boolean; onClose: () => void; source: string }) {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className={`quote-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="quote-backdrop" onClick={onClose} aria-label="Close quote form" />
      <aside className="quote-panel" role="dialog" aria-modal="true" aria-label="Request availability">
        <button className="quote-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {!sent ? (
          <>
            <span className="eyebrow">Availability first</span>
            <h2>Tell us what the journey needs.</h2>
            <p>KPM can confirm the right vehicle class, availability, support level and tailored quote.</p>
            <form onSubmit={submit}>
              <div className="form-row">
                <label>Full name<input name="name" placeholder="Your name" required /></label>
                <label>Mobile number<input name="phone" type="tel" placeholder="071 234 5678" required /></label>
              </div>
              <div className="form-row">
                <label>Start date<input name="startDate" type="date" required /></label>
                <label>Return date<input name="returnDate" type="date" required /></label>
              </div>
              <label>Service type
                <select name="type" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Corporate</option>
                  <option>Embassy</option>
                  <option>Wedding</option>
                  <option>Matric dance</option>
                  <option>Long-term rental</option>
                  <option>Short-term rental</option>
                </select>
              </label>
              <label>Vehicle or requirements<textarea name="message" placeholder="Preferred vehicle, occasion, passengers and pickup details" rows={4} /></label>
              <button className="submit-quote" type="submit">Request availability <ArrowRight size={18} /></button>
              <small>Prototype form | opened from {source}</small>
            </form>
          </>
        ) : (
          <div className="quote-success">
            <span><Check size={28} /></span>
            <h2>Request captured.</h2>
            <p>In production, this would route to the KPM team and start a tracked lead for follow-up.</p>
            <button onClick={() => { setSent(false); onClose(); }}>Back to the concept</button>
          </div>
        )}
      </aside>
    </div>
  );
}

function getConceptHref(concept: Concept) {
  return concept === "signature" ? "/" : `/?concept=${concept}`;
}

function ConceptSwitcher({ active }: { active: Concept }) {
  return (
    <div className="concept-switcher" role="navigation" aria-label="Choose a website direction">
      <div className="switcher-intro"><span>KPM Luxe Rentals</span><strong>Concept directions</strong></div>
      <div className="switcher-tabs">
        {concepts.map((concept) => (
          <a key={concept.id} href={getConceptHref(concept.id)} className={active === concept.id ? "active" : ""}>
            <b>{concept.number}</b><span>{concept.name}<small>{concept.note}</small></span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FloatingConcierge({ quote }: { quote: (source: string) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Good day. I can help with long-term rental, corporate transport, short-term rentals, or wedding and event arrivals.",
    },
  ]);

  function buildReply(prompt: string) {
    const cleaned = prompt.toLowerCase();

    if (cleaned.includes("wedding") || cleaned.includes("matric") || cleaned.includes("event")) {
      return "For a special occasion, I would confirm the event date, arrival time, vehicle image preference, guest count and pickup location before matching the right premium arrival vehicle.";
    }

    if (cleaned.includes("corporate") || cleaned.includes("executive") || cleaned.includes("business")) {
      return "For corporate mobility, I would confirm passengers, date range, delivery point, service level and whether the booking should be short-term or monthly before sending the availability request.";
    }

    if (cleaned.includes("long") || cleaned.includes("monthly") || cleaned.includes("term")) {
      return "Long-term rental is ideal when you want premium vehicle access without ownership. I would confirm the service term, preferred class and pickup or delivery location next.";
    }

    if (cleaned.includes("short") || cleaned.includes("weekend") || cleaned.includes("week")) {
      return "Short-term rental works well for luxury travel windows and spontaneous plans. I would confirm the dates, driver details, and desired vehicle class to match the correct option.";
    }

    return "I can guide you to the right service path. Tell me the occasion, dates and the kind of vehicle experience you want, and I’ll narrow it to the best KPM option.";
  }

  function ask(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: buildReply(trimmed) },
    ]);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    ask(draft.trim());
    setDraft("");
  }

  return (
    <div className={`floating-concierge ${open ? "open" : ""}`}>
      {open && (
        <aside className="floating-chat" aria-label="KPM AI Concierge">
          <div className="chat-head">
            <div><span><Bot size={15} /> KPM AI Concierge</span><strong>How can we move you?</strong></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close AI concierge"><X size={18} /></button>
          </div>
          <div className="chat-message">
            {messages.map((message, index) => (
              <p key={`${message.from}-${index}`} className={message.from === "user" ? "user-msg" : "bot-msg"}>
                {message.text}
              </p>
            ))}
          </div>
          <div className="chat-shortcuts">
            {conciergePrompts.map((prompt) => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}
          </div>
          <form onSubmit={submit} className="chat-form">
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tell us what you need" />
            <button type="submit" aria-label="Send concierge message"><ArrowRight size={18} /></button>
          </form>
          <button type="button" className="chat-quote" onClick={() => quote("Floating AI Concierge")}>Request availability</button>
        </aside>
      )}
      <button type="button" className="chat-launcher" onClick={() => setOpen((value) => !value)} aria-label="Open KPM AI Concierge">
        <Bot size={22} /><span>AI Concierge</span>
      </button>
    </div>
  );
}

function AiConcierge({ tone, quote }: { tone: "dark" | "light"; quote: (source: string) => void }) {
  const [answer, setAnswer] = useState("Share the occasion, dates and passenger count. I will suggest the right class, service type and next step for availability.");

  return (
    <section className={`ai-concierge ${tone}`}>
      <div>
        <span><Bot size={16} /> KPM AI Concierge</span>
        <h2>Your private rental guide is ready.</h2>
        <p>Tell us the occasion, dates, passengers and preferred level of service. The concierge helps match you with the right class before you request availability.</p>
      </div>
      <div className="ai-panel">
        <div className="ai-window">
          <small>Concierge preview</small>
          <p>{answer}</p>
        </div>
        <div className="ai-prompts">
          {conciergePrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => setAnswer(`Recommended path: ${prompt}. We will confirm your dates, pickup area, preferred vehicle class and service level before sending the availability request.`)}>
              {prompt}
            </button>
          ))}
        </div>
        <button type="button" className="ai-cta" onClick={() => quote("AI Concierge")}>Start with concierge <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function ServiceCards({ items, compact = false }: { items: ServiceItem[]; compact?: boolean }) {
  return (
    <div className={`service-grid ${compact ? "compact" : ""}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <a
            key={item.title}
            className="service-card"
            href={`/services/${item.slug}`}
            style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,.88) 0%, rgba(5,5,5,.62) 42%, rgba(5,5,5,.18) 100%), url(${item.image})` }}
          >
            <div><Icon size={24} /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <span className="card-cta">Learn more <ArrowRight size={16} /></span>
          </a>
        );
      })}
    </div>
  );
}

function Footer({ inverse = false, quote }: { inverse?: boolean; quote: (source: string) => void }) {
  return (
    <footer className={`site-footer ${inverse ? "inverse" : ""}`}>
      <BrandMark inverse={inverse} />
      <p>Luxury in motion. Premium mobility for corporate, embassy, occasion and private rental needs.</p>
      <button onClick={() => quote("Footer")}>Request availability <ArrowRight size={17} /></button>
    </footer>
  );
}

function SignatureServices({ quote }: { quote: (source: string) => void }) {
  const [slide, setSlide] = useState(0);
  const current = slides[slide];
  return (
    <main className="signature concept" id="top">
      <header className="nav dark"><BrandMark inverse /><nav><a href="#sig-services">Services</a><a href="#sig-why">Why choose us</a><a href="#sig-ai">AI Concierge</a></nav><button type="button" onClick={() => quote("Signature Services nav")}>Check availability</button></header>
      <section className="premium-slider" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,4,4,.92), rgba(4,4,4,.55), rgba(4,4,4,.12)), url(${current.image})` }}>
        <div>
          <span>{current.label}</span>
          <h1>{current.title}</h1>
          <p>Premium rentals for private clients, corporate teams, embassies and special occasions, guided by a service team that understands the importance of arrival.</p>
          <button type="button" onClick={() => quote("Signature Services hero")}>Begin enquiry <ArrowRight size={18} /></button>
        </div>
        <div className="slider-controls"><button type="button" onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous slide"><ArrowLeft size={18} /></button><strong>0{slide + 1}</strong><button type="button" onClick={() => setSlide((slide + 1) % 3)} aria-label="Next slide"><ArrowRight size={18} /></button></div>
      </section>
      <section className="section warm" id="sig-services"><div className="section-head"><span>Service suite</span><h2>Premium rental services for every high-value occasion.</h2></div><ServiceCards items={signatureServices} /></section>
      <section className="choice-section" id="sig-why"><article><Gem size={24} /><h3>Luxury presence</h3><p>Large image moments, restrained typography and premium spacing make the brand feel established.</p></article><article><ShieldCheck size={24} /><h3>Trust-led conversion</h3><p>The content reduces uncertainty for weddings, matric dances, embassies and corporate rentals.</p></article><article><MessageCircle size={24} /><h3>Concierge ready</h3><p>Every path can hand off to AI guidance or a direct availability form.</p></article></section>
      <div id="sig-ai"><AiConcierge tone="light" quote={quote} /></div>
      <Footer quote={quote} />
    </main>
  );
}

function Institutional({ quote }: { quote: (source: string) => void }) {
  return (
    <main className="institutional concept" id="top">
      <header className="nav light"><BrandMark /><nav><a href="#inst-services">Solutions</a><a href="#inst-process">Process</a><a href="#inst-ai">AI Concierge</a></nav><button type="button" onClick={() => quote("Quiet Authority nav")}>Request proposal</button></header>
      <section className="authority-hero">
        <div><span className="pill"><ShieldCheck size={15} /> Professional mobility partner</span><h1>Premium movement for organisations with standards.</h1><p>For embassies, corporate offices, rental partners and private clients who expect reliability, discretion and a polished client-facing experience.</p><button type="button" onClick={() => quote("Quiet Authority hero")}>Discuss requirements <ArrowRight size={18} /></button></div>
        <img src="/assets/kpm-suv.webp" alt="Executive SUV rental" />
      </section>
      <section className="section light" id="inst-services"><div className="section-head"><span>Core solutions</span><h2>Business-first services without losing luxury.</h2></div><ServiceCards items={signatureServices.slice(0, 6)} /></section>
      <section className="process-strip" id="inst-process"><div><span>01</span><strong>Request</strong><p>Dates, class, pickup and service type.</p></div><div><span>02</span><strong>Confirm</strong><p>KPM verifies availability and terms.</p></div><div><span>03</span><strong>Secure</strong><p>The booking moves into payment and handover.</p></div></section>
      <div id="inst-ai"><AiConcierge tone="dark" quote={quote} /></div>
      <Footer inverse quote={quote} />
    </main>
  );
}

function FleetStore({ quote }: { quote: (source: string) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "SUV", "Performance", "People Movers", "Sedans"];
  const visibleFleet = filter === "All" ? fleet : fleet.filter((vehicle) => vehicle.category === filter);
  return (
    <main className="fleet-store concept" id="top">
      <header className="nav dark"><BrandMark inverse /><nav><a href="#fleet-catalogue">Fleet</a><a href="#fleet-services">Services</a><a href="#fleet-ai">AI Concierge</a></nav><button type="button" onClick={() => quote("Fleet Store nav")}>Reserve interest</button></header>
      <section className="storefront-hero"><div><span>Fleet showroom</span><h1>Browse the fleet like a premium showroom.</h1><p>Explore vehicle categories, compare the right class for your plans and request availability with direct KPM support.</p><button type="button" onClick={() => quote("Fleet Store hero")}>Check vehicle availability <ArrowRight size={18} /></button></div></section>
      <section className="section warm" id="fleet-services"><div className="section-head"><span>Rental paths</span><h2>Start with the service, then choose the vehicle.</h2></div><ServiceCards items={essentialServices} compact /></section>
      <section className="catalogue" id="fleet-catalogue"><div className="section-head"><span>Fleet preview</span><h2>Filter by vehicle need.</h2></div><div className="filters">{filters.map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="fleet-grid">{visibleFleet.map((vehicle) => <article key={vehicle.name}><img src={vehicle.image} alt={`${vehicle.name} rental`} /><div><small>{vehicle.category}</small><h3>{vehicle.name}</h3><p>{vehicle.detail}</p><button type="button" onClick={() => quote(vehicle.name)}>Request this vehicle <ArrowRight size={16} /></button></div></article>)}</div></section>
      <div id="fleet-ai"><AiConcierge tone="light" quote={quote} /></div>
      <Footer quote={quote} />
    </main>
  );
}

function LuxeConcierge({ quote }: { quote: (source: string) => void }) {
  return (
    <main className="luxe concept" id="top">
      <header className="nav dark glass"><BrandMark inverse /><nav><a href="#luxe-services">Services</a><a href="#luxe-fleet">Fleet</a><a href="#luxe-ai">AI Concierge</a></nav><button type="button" onClick={() => quote("Luxe Concierge nav")}>Plan journey</button></header>
      <section className="luxe-hero">
        <div className="luxe-copy"><span>Private concierge rental</span><h1>Luxury mobility with a concierge mind.</h1><p>A bright, premium rental experience where clients can choose a service, browse the fleet and let the concierge guide the next step.</p><button type="button" onClick={() => quote("Luxe Concierge hero")}>Plan with concierge <ArrowRight size={18} /></button></div>
        <div className="concierge-card"><Bot size={26} /><strong>What are you booking for?</strong><p>Corporate guest, embassy movement, wedding arrival, matric dance, long-term rental or short-term self-drive.</p></div>
      </section>
      <section className="section light" id="luxe-services"><div className="section-head"><span>Guided services</span><h2>Choose the occasion. Let KPM guide the vehicle.</h2></div><ServiceCards items={signatureServices} /></section>
      <section className="mini-fleet" id="luxe-fleet">{fleet.slice(0, 3).map((vehicle) => <article key={vehicle.name}><img src={vehicle.image} alt={vehicle.name} /><span>{vehicle.category}</span><h3>{vehicle.name}</h3></article>)}</section>
      <div id="luxe-ai"><AiConcierge tone="dark" quote={quote} /></div>
      <Footer inverse quote={quote} />
    </main>
  );
}

export default function ConceptClient({ initialActive = "signature" }: { initialActive?: Concept }) {
  const active = initialActive;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState("website");

  function openQuote(source: string) {
    setQuoteSource(source);
    setQuoteOpen(true);
  }

  return (
    <>
      <ConceptSwitcher active={active} />
      <div className="concept-stage" key={active}>
        {active === "signature" && <SignatureServices quote={openQuote} />}
        {active === "institutional" && <Institutional quote={openQuote} />}
        {active === "fleet" && <FleetStore quote={openQuote} />}
        {active === "elite" && <LuxeConcierge quote={openQuote} />}
      </div>
      <FloatingConcierge quote={openQuote} />
      <QuotePanel open={quoteOpen} onClose={() => setQuoteOpen(false)} source={quoteSource} />
    </>
  );
}
