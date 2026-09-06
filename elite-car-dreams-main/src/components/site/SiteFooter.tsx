import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

function SocialIcon({ name }: { name: "tiktok" | "whatsapp" | "instagram" }) {
  if (name === "instagram") return <Instagram className="size-4" strokeWidth={2} aria-hidden="true" />;

  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <path d="M14.5 3h3.1c.3 1.8 1.3 3.1 3.1 3.6v3.2a8.1 8.1 0 0 1-3.1-.8v6.1a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.3a2.7 2.7 0 1 0 1.8 2.5V3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2a9.9 9.9 0 0 0-8.6 14.8L2 22l5.4-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.2.8.8-3.1-.2-.3a8.2 8.2 0 1 1 7.1 4Zm4.5-6.1c-.2-.1-1.2-.6-1.4-.6-.2-.1-.3-.1-.5.1l-.6.8c-.1.2-.2.2-.4.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.3-.4.2-.4c.1-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 1.9.8 2c.1.2 1.4 2.2 3.4 3 .5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.5-.2Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-8 pb-12 pt-24">
      <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h2 className="mb-8 font-display text-4xl font-black uppercase tracking-tighter">
            Luxury Lived.
            <br />
            Memories Captured.
          </h2>
          <div className="flex gap-4">
            {[
              { name: "tiktok" as const, href: "https://www.tiktok.com/@kpmluxerentals", title: "TikTok" },
              { name: "whatsapp" as const, href: "https://wa.me/27118840000", title: "WhatsApp" },
              { name: "instagram" as const, href: "https://www.instagram.com/", title: "Instagram" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                title={s.title}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center border border-border font-mono text-[10px] transition-colors hover:bg-foreground hover:text-background"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-6 block">Operations</h3>
          <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-muted">
            <li>
              <Link to="/fleet" className="hover:text-foreground">
                Fleet
              </Link>
            </li>
            <li>
              <Link to="/partners" className="hover:text-foreground">
                Rental Partner Programme
              </Link>
            </li>
            <li>
              <Link to="/corporate" className="hover:text-foreground">
                Corporate & Embassy
              </Link>
            </li>
            <li>
              <Link to="/requirements" className="hover:text-foreground">
                Requirements & FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-6 block">Enquiries</h3>
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-foreground">
            Sandton, Johannesburg
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">+27 11 884 0000</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">drive@kpmlxr.co.za</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} KPMLUXERENTALS. EST MMXXII.
        </span>
        <span className="mt-4 font-display text-[9px] font-bold uppercase tracking-[0.5em] md:mt-0">
          Luxury In Motion.
        </span>
      </div>
    </footer>
  );
}
