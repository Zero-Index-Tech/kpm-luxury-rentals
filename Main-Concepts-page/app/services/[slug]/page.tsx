import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceConcierge from "./service-concierge";

type Service = {
  title: string;
  eyebrow: string;
  image: string;
  intro: string;
  promise: string;
  points: Array<{ title: string; text: string }>;
};

const services: Record<string, Service> = {
  corporate: {
    title: "Corporate Rentals",
    eyebrow: "Executive mobility",
    image: "/assets/kpm-suv.webp",
    intro: "Premium vehicle support for executives, visiting clients, production teams and high-value business movement.",
    promise: "KPM can position the right vehicle class around meeting schedules, airport movement, client hosting and longer business requirements, with a clean enquiry path that feels suitable for a premium client.",
    points: [
      { title: "Use case", text: "Board meetings, guest transport, roadshows, client hosting and executive day movement." },
      { title: "Fleet fit", text: "SUVs, sedans and people movers selected around passenger count, presence and comfort." },
      { title: "Next step", text: "Confirm dates, delivery point, driver details and preferred service level." },
    ],
  },
  embassies: {
    title: "Embassy Rentals",
    eyebrow: "Discreet institutional support",
    image: "/assets/kpm-people-mover.webp",
    intro: "Consistent premium rentals for diplomatic, delegation and institutional transport requirements.",
    promise: "This service page frames KPM as calm, reliable and detail aware: clear terms, suitable vehicle classes and a booking journey that avoids unnecessary friction for official movement.",
    points: [
      { title: "Use case", text: "Delegations, official visits, staff transport, airport reception and scheduled appointments." },
      { title: "Fleet fit", text: "Executive SUVs, people movers and sedan options for different levels of presence." },
      { title: "Next step", text: "Share the delegation size, date window, routing and any documentation requirements." },
    ],
  },
  "matric-dance": {
    title: "Matric Dance Rentals",
    eyebrow: "Arrival moments",
    image: "/assets/kpm-hatch.webp",
    intro: "A polished rental path for students and families who want the arrival to feel memorable, premium and well organised.",
    promise: "The page keeps the glamour of the moment while making the practical side clear: availability, arrival timing, vehicle preference, photos and handover expectations.",
    points: [
      { title: "Use case", text: "Matric dance arrivals, photo moments and short evening rental windows." },
      { title: "Fleet fit", text: "Performance cars, SUVs and statement vehicles based on the preferred arrival style." },
      { title: "Next step", text: "Confirm date, venue, arrival time, passenger needs and vehicle image preference." },
    ],
  },
  weddings: {
    title: "Wedding Rentals",
    eyebrow: "Ceremony arrivals",
    image: "/assets/kpm-hero.png",
    intro: "Elegant premium vehicles for ceremony arrival, reception movement and the moments that become part of the wedding record.",
    promise: "KPM can present wedding rental as an experience, not a vehicle list: calm planning, refined options and a clear route from enquiry to availability confirmation.",
    points: [
      { title: "Use case", text: "Bride and groom arrivals, bridal party movement, photo sessions and guest transfers." },
      { title: "Fleet fit", text: "Luxury SUVs, sedans and people movers according to party size and visual direction." },
      { title: "Next step", text: "Share the ceremony date, venues, movement plan and preferred vehicle style." },
    ],
  },
  "long-term-rental": {
    title: "Long-Term Rentals",
    eyebrow: "Monthly premium access",
    image: "/assets/kpm-people-mover.webp",
    intro: "Flexible monthly premium vehicle access for professionals, founders, families and teams who need confidence without ownership.",
    promise: "This page focuses on stability: term length, vehicle class, support expectations, mileage needs and a direct line into the availability process.",
    points: [
      { title: "Use case", text: "Monthly use, contract work, interim vehicles, executive assignments and team mobility." },
      { title: "Fleet fit", text: "SUVs, sedans and people movers based on monthly use pattern and budget range." },
      { title: "Next step", text: "Confirm preferred term, driver details, pickup area and expected mileage." },
    ],
  },
  "short-term-rental": {
    title: "Short-Term Rentals",
    eyebrow: "Day and weekend mobility",
    image: "/assets/kpm-suv.webp",
    intro: "Luxury rental access for travel windows, weekends, shoots, client hosting and personal plans that call for a premium vehicle.",
    promise: "The service page keeps the decision simple: choose the occasion, confirm the dates, match the class and request availability without digging through a generic catalogue.",
    points: [
      { title: "Use case", text: "Weekend escapes, business trips, airport movement, private plans and short booking windows." },
      { title: "Fleet fit", text: "SUVs, performance vehicles and sedans matched to occasion, route and passenger count." },
      { title: "Next step", text: "Send dates, pickup location, return time and preferred vehicle class." },
    ],
  },
  events: {
    title: "Short-Term & Events",
    eyebrow: "High-impact rentals",
    image: "/assets/kpm-hero.png",
    intro: "Premium vehicles for launches, weddings, matric dances, weekends and short-term moments where arrival matters.",
    promise: "This combined page lets a concept keep the simple three-card structure while still opening into a dedicated, more complete event rental story.",
    points: [
      { title: "Use case", text: "Brand launches, private events, photo moments, leisure weekends and special arrivals." },
      { title: "Fleet fit", text: "Statement SUVs, performance cars, sedans and people movers chosen around the occasion." },
      { title: "Next step", text: "Share the date, occasion, arrival time, location and desired vehicle presence." },
    ],
  },
};

const related = Object.entries(services).slice(0, 6);

function BrandMark() {
  return (
    <a href="/" className="brand-mark" aria-label="KPM Luxe Rentals concepts">
      <span>KPMLXR</span>
      <small>Luxury in motion</small>
    </a>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug] ?? services.corporate;

  return (
    <main className="service-page">
      <header className="service-detail-nav">
        <BrandMark />
        <a className="back-link" href="/"><ArrowLeft size={16} /> Concepts</a>
      </header>
      <section
        className="service-detail-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,5,.9), rgba(5,5,5,.58), rgba(5,5,5,.2)), url(${service.image})` }}
      >
        <div>
          <span>{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.intro}</p>
        </div>
      </section>
      <section className="detail-grid">
        <div className="detail-copy">
          <h2>A focused page for this rental need.</h2>
          <p>{service.promise}</p>
          <div className="detail-actions">
            <a href="/#sig-services">View all services <ArrowRight size={16} /></a>
            <a className="secondary" href="/?concept=fleet">Explore fleet</a>
          </div>
        </div>
        <aside className="detail-panel">
          <h3>Service structure</h3>
          <ul>
            {service.points.map((point) => (
              <li key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <section className="related-services">
        <h2>Other KPM service paths</h2>
        <div className="related-row">
          {related.map(([key, item]) => (
            <a
              key={key}
              href={`/services/${key}`}
              style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,.62), rgba(5,5,5,.2), rgba(5,5,5,.82)), url(${item.image})` }}
            >
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </section>
      <ServiceConcierge service={service.title} />
    </main>
  );
}
