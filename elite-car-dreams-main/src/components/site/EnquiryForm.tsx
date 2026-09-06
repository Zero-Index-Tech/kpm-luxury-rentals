import { useState } from "react";
import { fleet, whatsappLink } from "@/data/fleet";

type Props = {
  heading: string;
  intent: string;
  vehicleLocked?: string;
  showVehicle?: boolean;
  submitLabel?: string;
};

export function EnquiryForm({
  heading,
  intent,
  vehicleLocked,
  showVehicle = true,
  submitLabel = "Send via WhatsApp",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState(vehicleLocked ?? fleet[0]?.name ?? "");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");

  const message = [
    `${intent} enquiry — KPMLXR`,
    name && `Name: ${name}`,
    phone && `Contact: ${phone}`,
    showVehicle && `Vehicle: ${vehicleLocked ?? vehicle}`,
    start && `From: ${start}`,
    end && `To: ${end}`,
    notes && `Notes: ${notes}`,
    "Source: Website",
  ]
    .filter(Boolean)
    .join("\n");

  const fieldClass =
    "w-full border-b border-border bg-transparent py-2 text-sm text-foreground focus:border-sand focus:outline-none";
  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-muted";

  return (
    <div className="border border-border p-8">
      <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">{heading}</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Full name</span>
          <input
            className={fieldClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Contact number</span>
          <input
            className={fieldClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+27"
          />
        </label>

        {showVehicle && !vehicleLocked && (
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={labelClass}>Vehicle</span>
            <select
              className={`${fieldClass} appearance-none`}
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              {fleet.map((v) => (
                <option key={v.slug} value={v.name} className="bg-background">
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Collection date</span>
          <input
            type="date"
            className={fieldClass}
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Return date</span>
          <input
            type="date"
            className={fieldClass}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className={labelClass}>Requirements</span>
          <textarea
            rows={3}
            className={`${fieldClass} resize-none`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Delivery, chauffeur, occasion, number of vehicles…"
          />
        </label>
      </div>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        className="mt-10 flex w-full items-center justify-center bg-foreground py-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
      >
        {submitLabel}
      </a>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
        Reservation deposit payable only after availability and driver approval.
      </p>
    </div>
  );
}
