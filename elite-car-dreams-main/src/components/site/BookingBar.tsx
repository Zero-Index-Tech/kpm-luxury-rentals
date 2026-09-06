import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { locations } from "@/data/locations";

export function BookingBar() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [sameReturn, setSameReturn] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const label = "mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-sand";
  const field =
    "h-12 w-full border border-border bg-background px-4 text-sm text-foreground focus:border-sand focus:outline-none";

  function search() {
    const params: Record<string, string> = {};
    if (pickup) params["pickup"] = pickup;
    const drop = sameReturn ? pickup : dropoff;
    if (drop) params["dropoff"] = drop;
    if (start) params["start"] = start;
    if (end) params["end"] = end;
    navigate({ to: "/fleet", search: params });
  }

  return (
    <div className="border-b border-border bg-card px-6 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-4">
          <span className={label}>Pick-up &amp; drop-off location</span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              aria-label="Pick-up location"
              className={field}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            >
              <option value="">Select pick-up…</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            {!sameReturn && (
              <select
                aria-label="Drop-off location"
                className={field}
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              >
                <option value="">Select drop-off…</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            )}
          </div>
          <label className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            <input
              type="checkbox"
              checked={sameReturn}
              onChange={(e) => setSameReturn(e.target.checked)}
              className="size-3 accent-[var(--sand)]"
            />
            Return at pick-up
          </label>
        </div>

        <div className="lg:col-span-3">
          <span className={label}>Collection date</span>
          <input
            type="date"
            aria-label="Collection date"
            className={field}
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className="lg:col-span-3">
          <span className={label}>Return date</span>
          <input
            type="date"
            aria-label="Return date"
            className={field}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div className="lg:col-span-2">
          <button
            onClick={search}
            className="h-12 w-full bg-sand font-display text-[11px] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground"
          >
            Find a Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
