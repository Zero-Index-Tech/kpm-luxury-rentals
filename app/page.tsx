"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, ChevronRight, MessageCircle, Play, ShieldCheck, Sparkles, Users, X } from "lucide-react";

type Concept = "cinematic" | "executive" | "social" | "store";

const concepts: Array<{ id: Concept; number: string; name: string; note: string }> = [
  { id: "cinematic", number: "01", name: "Motion Editorial", note: "Brand-led luxury" },
  { id: "executive", number: "02", name: "Quiet Authority", note: "Corporate confidence" },
  { id: "social", number: "03", name: "Performance Culture", note: "Lifestyle & social" },
  { id: "store", number: "04", name: "Fleet Store", note: "Vehicle-first catalogue" },
];

const fleet = [
  { type: "BMW X5", use: "Luxury SUV · 3.0d / M50d xDrive" },
  { type: "Mercedes-Benz V-Class", use: "People Mover · V300d / V250d" },
  { type: "Volkswagen Golf 8R", use: "Performance · 2025" },
];

const storeFleet = [
  { name: "Toyota Fortuner", detail: "2025 · 2.8 GD-6 VX", category: "SUV", image: "/assets/kpm-suv.webp" },
  { name: "BMW X5", detail: "3.0d / M50d xDrive", category: "SUV", image: "/assets/kpm-suv.webp" },
  { name: "MINI Countryman JCW", detail: "2025", category: "Performance", image: "/assets/kpm-hatch.webp" },
  { name: "Volkswagen Golf 8 GTI", detail: "2025", category: "Performance", image: "/assets/kpm-hatch.webp" },
  { name: "Volkswagen Golf 8R", detail: "2025", category: "Performance", image: "/assets/kpm-hatch.webp" },
  { name: "BMW M440i Convertible", detail: "2024", category: "Performance", image: "/assets/kpm-hero.png" },
  { name: "Mercedes-Benz V-Class", detail: "V300d / V250d", category: "People Movers", image: "/assets/kpm-people-mover.webp" },
  { name: "Hyundai Staria", detail: "2.2D", category: "People Movers", image: "/assets/kpm-people-mover.webp" },
  { name: "BMW 3 Series", detail: "2025 · 320i / 320d", category: "Sedans", image: "/assets/kpm-hero.png" },
  { name: "BMW 5 Series", detail: "2025 · 520d", category: "Sedans", image: "/assets/kpm-hero.png" },
  { name: "Mercedes-Benz C-Class", detail: "2024 · C200 / C220d", category: "Sedans", image: "/assets/kpm-hero.png" },
  { name: "Mercedes-Benz E220d", detail: "2025 · AMG Line", category: "Sedans", image: "/assets/kpm-hero.png" },
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className={`brand-mark ${inverse ? "inverse" : ""}`} aria-label="KPM Luxe Rentals home"><span>KPMLXR</span><small>Luxury in motion</small></a>;
}

function QuotePanel({ open, onClose, source }: { open: boolean; onClose: () => void; source: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return (
    <div className={`quote-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="quote-backdrop" onClick={onClose} aria-label="Close quote form" />
      <aside className="quote-panel" role="dialog" aria-modal="true" aria-label="Request a quote">
        <button className="quote-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {!sent ? <><span className="eyebrow">Availability first</span><h2>Tell us what the moment needs.</h2><p>Share the essentials. KPM can confirm the right vehicle, availability and a tailored quote.</p>
          <form onSubmit={submit}><div className="form-row"><label>Full name<input name="name" placeholder="Your name" required /></label><label>Mobile number<input name="phone" type="tel" placeholder="e.g. 071 234 5678" required /></label></div><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><div className="form-row"><label>Start date<input name="startDate" type="date" required /></label><label>Return date<input name="returnDate" type="date" required /></label></div><div className="form-row"><label>Service type<select name="type" defaultValue=""><option value="" disabled>Select one</option><option>Self-drive</option><option>Chauffeur</option><option>Corporate / embassy</option><option>Wedding or event</option><option>Group transport</option></select></label><label>Passengers<input name="passengers" type="number" min="1" placeholder="1" /></label></div><div className="form-row"><label>Pickup location<input name="pickup" placeholder="Area or address" required /></label><label>Drop-off location<input name="dropoff" placeholder="Area or address" /></label></div><label>Vehicle or requirements<textarea name="message" placeholder="Preferred vehicle, occasion and anything KPM should know…" rows={3} /></label><button className="submit-quote" type="submit">Request availability <ArrowRight size={18} /></button><small>Prototype form · opened from {source}</small></form>
        </> : <div className="quote-success"><span><Check size={28} /></span><h2>Request captured.</h2><p>In the live site, this would route directly to the KPM sales team and start a tracked lead.</p><button onClick={() => { setSent(false); onClose(); }}>Back to the concept</button></div>}
      </aside>
    </div>
  );
}

function ConceptSwitcher({ active, setActive }: { active: Concept; setActive: (value: Concept) => void }) {
  return <div className="concept-switcher" role="navigation" aria-label="Choose a website direction"><div className="switcher-intro"><span>KPMLXR / Direction study</span><strong>Choose a concept</strong></div><div className="switcher-tabs">{concepts.map((concept) => <button key={concept.id} className={active === concept.id ? "active" : ""} onClick={() => { setActive(concept.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}><b>{concept.number}</b><span>{concept.name}<small>{concept.note}</small></span></button>)}</div></div>;
}

function Cinematic({ quote }: { quote: (source: string) => void }) {
  return <main className="cinematic" id="top">
    <section className="cin-hero"><nav className="cin-nav"><BrandMark inverse /><div className="nav-links"><a href="#cin-fleet">Fleet</a><a href="#cin-occasions">Experiences</a><a href="#cin-story">Why KPMLXR</a></div><button onClick={() => quote("Motion Editorial navigation")}>Request a vehicle</button></nav><div className="cin-hero-copy"><p className="hero-kicker"><span /> KPM Luxe Rentals · Luxury in motion</p><h1>Luxury lived.<br /><em>Memories captured.</em></h1><p className="hero-body">Premium vehicle rental and mobility experiences for business, leisure and unforgettable occasions.</p><div className="hero-actions"><button onClick={() => quote("Motion Editorial hero")}>Explore the fleet <ArrowRight size={18} /></button><a href="#cin-fleet">Find your match</a></div></div><div className="cin-proof"><strong>03</strong><span>Years of premium<br />mobility experience</span></div><div className="scroll-note">Move with purpose <span /></div></section>
    <section className="cin-intro" id="cin-story"><p className="section-tag">The KPMLXR position</p><div><h2>Luxury mobility, delivered with precision.</h2><p>More than car rental: a considered service built around the vehicle, the occasion and the journey. Professional, reliable and distinctly KPM.</p></div></section>
    <section className="cin-fleet" id="cin-fleet"><div className="cin-fleet-image"><span className="image-label">The KPM collection</span></div><div className="cin-fleet-list">{fleet.map((item, index) => <button key={item.type} onClick={() => quote(item.type)}><span>0{index + 1}</span><div><h3>{item.type}</h3><p>{item.use}</p></div><ArrowRight size={22} /></button>)}</div></section>
    <section className="cin-occasions" id="cin-occasions"><p className="section-tag">Choose your experience</p><div className="occasion-grid"><article><span>01</span><h3>Corporate</h3><p>Professional mobility for executives, teams, guests and long-term requirements.</p></article><article><span>02</span><h3>Occasions</h3><p>Weddings and matric dances where the arrival becomes part of the memory.</p></article><article><span>03</span><h3>Leisure</h3><p>Premium self-drive options for weekends, road trips and everyday enjoyment.</p></article></div></section>
    <section className="cin-final"><p>Luxury in motion.</p><h2>Every journey considered.</h2><button onClick={() => quote("Motion Editorial final CTA")}>Request a vehicle <ArrowRight size={18} /></button></section>
  </main>;
}

function Executive({ quote }: { quote: (source: string) => void }) {
  return <main className="executive" id="top">
    <header className="exec-header"><BrandMark /><nav><a href="#exec-solutions">Solutions</a><a href="#exec-fleet">Current fleet</a><a href="#exec-process">Request process</a></nav><div><a href="https://www.tiktok.com/@kpmluxerentals" target="_blank" rel="noreferrer">TikTok</a><button onClick={() => quote("Quiet Authority navigation")}>Request a proposal</button></div></header>
    <section className="exec-hero"><div className="exec-hero-copy"><span className="exec-pill"><ShieldCheck size={16} /> Professional mobility partner</span><h1>Premium mobility.<br />Every detail considered.</h1><p>Flexible vehicle hire for embassies, corporate teams, private clients and rental partners.</p><div className="exec-actions"><button onClick={() => quote("Quiet Authority hero")}>Discuss your requirements <ArrowRight size={18} /></button><a href="#exec-solutions">View solutions</a></div><div className="exec-metrics"><div><strong>3 years</strong><span>Operational experience</span></div><div><strong>Short to long-term</strong><span>Flexible rental periods</span></div><div><strong>Direct support</strong><span>Responsive human service</span></div></div></div><div className="exec-hero-visual"><div className="visual-card"><span>KPM Luxe Rentals</span><strong>Luxury in motion. Service with precision.</strong><button onClick={() => quote("Corporate fleet brief")}>Start a brief <ChevronRight size={17} /></button></div></div></section>
    <section className="exec-trust"><span>Built for organisations that value</span><strong>Reliability</strong><i /> <strong>Discretion</strong><i /> <strong>Flexibility</strong><i /> <strong>Presentation</strong></section>
    <section className="exec-solutions" id="exec-solutions"><div className="exec-heading"><span>Mobility solutions</span><h2>One supplier.<br />Several ways to move.</h2><p>Structured around your people, rental period and level of support—not a one-size-fits-all checkout.</p></div><div className="solution-stack"><article><span><Building2 /></span><div><small>01 / Institutional</small><h3>Embassy & diplomatic rentals</h3><p>Long-term executive transport arrangements with a direct point of contact.</p></div><ArrowRight /></article><article><span><Users /></span><div><small>02 / Business</small><h3>Corporate mobility</h3><p>Vehicles for executives, guests, productions, events and business travel.</p></div><ArrowRight /></article><article><span><ShieldCheck /></span><div><small>03 / Trade</small><h3>Rental partner supply</h3><p>Fleet support for middlemen and other rental operators serving their own clients.</p></div><ArrowRight /></article></div></section>
    <section className="exec-fleet" id="exec-fleet"><div className="exec-fleet-photo"><span>Curated current fleet</span></div><div className="exec-fleet-copy"><span>Featured vehicles</span><h2>Specify the journey.<br />We’ll match the vehicle.</h2>{fleet.map(item => <div className="exec-fleet-row" key={item.type}><strong>{item.type}</strong><span>{item.use}</span><ChevronRight size={18} /></div>)}<button onClick={() => quote("Quiet Authority fleet")}>Request current availability</button></div></section>
    <section className="exec-process" id="exec-process"><div><span>01</span><strong>Request</strong><p>Vehicle, dates, locations and service type.</p></div><div><span>02</span><strong>Confirm</strong><p>KPM verifies availability, terms and the quote.</p></div><div><span>03</span><strong>Secure</strong><p>Approve the selection and complete payment.</p></div><button onClick={() => quote("Quiet Authority process")}>Start a request <ArrowRight size={18} /></button></section>
  </main>;
}

function Social({ quote }: { quote: (source: string) => void }) {
  return <main className="social" id="top">
    <header className="social-nav"><BrandMark inverse /><div><a href="#social-fleet">Fleet</a><a href="#social-moments">Experiences</a><a href="https://www.tiktok.com/@kpmluxerentals" target="_blank" rel="noreferrer">TikTok ↗</a></div><button onClick={() => quote("Performance Culture navigation")}><MessageCircle size={18} /> Request vehicle</button></header>
    <section className="social-hero"><div className="social-copy"><p><Sparkles size={17} /> Luxury · Performance · Lifestyle</p><h1>Drive<br /><span>different.</span><br />Live luxurious.</h1><p className="social-body">KPMLXR is more than luxury car rental—it is a lifestyle of confidence, experience and purpose.</p><div><button onClick={() => quote("Performance Culture hero")}>Find your vehicle <ArrowRight size={19} /></button><a href="https://www.tiktok.com/@kpmluxerentals" target="_blank" rel="noreferrer"><Play size={16} fill="currentColor" /> Watch KPMLXR on TikTok</a></div></div><div className="social-visual"><span className="reel-tag">KPMLXR / LUXURY IN MOTION</span><button className="play-button" aria-label="Play concept reel"><Play size={24} fill="currentColor" /></button><div className="social-sticker">MOVE WITH<br />PURPOSE.</div><div className="social-caption"><b>KPMLXR:</b> premium presence, on every journey.</div></div></section>
    <section className="social-marquee"><div>LUXURY LIVED <i /> MEMORIES CAPTURED <i /> LUXURY IN MOTION <i /> LUXURY LIVED <i /> MEMORIES CAPTURED</div></section>
    <section className="social-moments" id="social-moments"><div className="social-section-heading"><span>Choose your experience</span><h2>Move your way.</h2></div><div className="moment-cards"><button onClick={() => quote("Performance") }><span>01</span><h3>Pure<br />performance</h3><p>Golf 8R · Golf 8 GTI · MINI JCW</p><ArrowRight /></button><button onClick={() => quote("Occasion") }><span>02</span><h3>Make an<br />entrance</h3><p>Weddings · Matric dances · Events</p><ArrowRight /></button><button onClick={() => quote("Corporate") }><span>03</span><h3>Move<br />professionally</h3><p>Corporate · Embassy · Long-term</p><ArrowRight /></button></div></section>
    <section className="social-fleet" id="social-fleet"><div className="social-fleet-top"><span>Curated fleet</span><h2>Choose your<br />kind of motion.</h2><button onClick={() => quote("Performance Culture fleet")}>View availability <ArrowRight size={18} /></button></div><div className="social-fleet-grid">{fleet.map((item, index) => <article key={item.type}><div className={`fleet-crop crop-${index + 1}`} /><small>0{index + 1}</small><h3>{item.type}</h3><p>{item.use}</p></article>)}</div></section>
    <section className="social-how"><h2>Request in<br />three moves.</h2><div><span><CalendarDays /> Share your dates</span><span><MessageCircle /> Receive matched options</span><span><Check /> Confirm your vehicle</span></div><button onClick={() => quote("Performance Culture final CTA")}>Request availability <ArrowRight size={20} /></button></section>
  </main>;
}

const storeSlides = [
  { eyebrow: "The KPMLXR collection", title: "Luxury lived. Memories captured.", body: "Browse the current fleet and request the vehicle that fits your journey." },
  { eyebrow: "Performance in motion", title: "Built for more than transportation.", body: "Performance vehicles for clients who value the experience as much as the destination." },
  { eyebrow: "Corporate mobility", title: "Professional movement, properly handled.", body: "Flexible short- and long-term options for corporate and embassy requirements." },
];

function Storefront({ quote }: { quote: (source: string) => void }) {
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState("All");
  const filters = ["All", "SUV", "Performance", "People Movers", "Sedans"];
  const visibleFleet = filter === "All" ? storeFleet : storeFleet.filter((vehicle) => vehicle.category === filter);
  const current = storeSlides[slide];

  function moveSlide(direction: number) {
    setSlide((value) => (value + direction + storeSlides.length) % storeSlides.length);
  }

  return <main className="store" id="top">
    <header className="store-nav"><BrandMark inverse /><nav><a href="#store-fleet">Fleet</a><a href="#store-about">Why KPMLXR</a><a href="https://www.tiktok.com/@kpmluxerentals" target="_blank" rel="noreferrer">TikTok ↗</a></nav><button onClick={() => quote("Fleet Store navigation")}>Request a vehicle</button></header>
    <section className={`store-slider store-slide-${slide + 1}`}>
      <div className="store-slide-copy"><span>{current.eyebrow}</span><h1>{current.title}</h1><p>{current.body}</p><div><a href="#store-fleet">Shop the fleet <ArrowRight size={18} /></a><button onClick={() => quote("Fleet Store hero")}>Check availability</button></div></div>
      <div className="store-slide-controls"><button onClick={() => moveSlide(-1)} aria-label="Previous slide"><ArrowLeft size={19} /></button><strong>0{slide + 1}</strong><span>/ 03</span><button onClick={() => moveSlide(1)} aria-label="Next slide"><ArrowRight size={19} /></button></div>
    </section>
    <section className="store-catalogue" id="store-fleet">
      <div className="store-catalogue-head"><div><span>Available for rental</span><h2>Explore the fleet.</h2></div><p>Choose a vehicle, share your dates and let KPM confirm current availability and terms.</p></div>
      <div className="store-filters" aria-label="Filter vehicles by category">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="store-grid">{visibleFleet.map((vehicle, index) => <article className="store-card" key={vehicle.name}><div className="store-card-image"><img src={vehicle.image} alt={`${vehicle.name} rental category visual`} /><span>0{String(index + 1).padStart(2, "0")}</span></div><div className="store-card-copy"><small>{vehicle.category}</small><h3>{vehicle.name}</h3><p>{vehicle.detail}</p><div><span>Availability on request</span><button onClick={() => quote(vehicle.name)}>Request this vehicle <ArrowRight size={17} /></button></div></div></article>)}</div>
    </section>
    <section className="store-promise" id="store-about"><div><span>Why KPMLXR</span><h2>A premium fleet.<br />A considered service.</h2></div><div className="store-values"><article><strong>01</strong><h3>Professional</h3><p>A clear request and confirmation process from first contact to collection.</p></article><article><strong>02</strong><h3>Flexible</h3><p>Short-term occasions, business requirements and longer rental arrangements.</p></article><article><strong>03</strong><h3>Personal</h3><p>Real support to match the right vehicle to the journey and the client.</p></article></div></section>
  </main>;
}

export default function Home() {
  const [active, setActive] = useState<Concept>("cinematic");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState("website");
  function openQuote(source: string) { setQuoteSource(source); setQuoteOpen(true); }
  return <><ConceptSwitcher active={active} setActive={setActive} /><div className="concept-stage" key={active}>{active === "cinematic" && <Cinematic quote={openQuote} />}{active === "executive" && <Executive quote={openQuote} />}{active === "social" && <Social quote={openQuote} />}{active === "store" && <Storefront quote={openQuote} />}</div><QuotePanel open={quoteOpen} onClose={() => setQuoteOpen(false)} source={quoteSource} /></>;
}
