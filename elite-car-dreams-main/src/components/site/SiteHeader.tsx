import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { DotMark } from "./DotMark";

const links = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/occasions", label: "Occasions" },
  { to: "/corporate", label: "Corporate" },
  { to: "/partners", label: "Partners" },
  { to: "/requirements", label: "Requirements" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md">
      <div className="hidden items-center justify-between border-b border-border px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:flex">
        <div className="flex items-center gap-6">
          <a href="tel:+27118840000" className="transition-colors hover:text-foreground">
            +27 11 884 0000
          </a>
          <span className="text-border">|</span>
          <a href="mailto:drive@kpmlxr.co.za" className="transition-colors hover:text-foreground">
            drive@kpmlxr.co.za
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/corporate" className="transition-colors hover:text-foreground">
            Corporate &amp; Embassy
          </Link>
          <span className="text-border">|</span>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link to="/" className="flex items-center gap-4 text-foreground">
          <DotMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-black tracking-[0.4em]">KPMLXR</span>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.4em] text-muted">
              Rent a car
            </span>
          </span>
        </Link>

        <div className="hidden gap-8 font-display text-[11px] font-bold uppercase tracking-[0.2em] lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground transition-colors hover:text-sand"
              activeProps={{ className: "text-sand" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden rounded-sm bg-foreground px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand sm:block"
          >
            Enquire Now
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] lg:hidden"
          >
            Menu
            <span className="flex flex-col gap-1">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col border-b border-border bg-background px-6 py-4 lg:hidden">
          {links.concat([{ to: "/contact", label: "Contact" }] as never).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-foreground last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
