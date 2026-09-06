"use client";

import { useState } from "react";
import { ArrowRight, Bot, X } from "lucide-react";

export default function ServiceConcierge({ service }: { service: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    `Good day. I can help you shape a ${service.toLowerCase()} enquiry around dates, vehicle class, passenger needs and handover details.`,
  ]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      value,
      `For ${service.toLowerCase()}, I would confirm the date window, pickup area, preferred vehicle class and service level before sending availability to the KPM team.`,
    ]);
    setDraft("");
  }

  return (
    <div className={`floating-concierge ${open ? "open" : ""}`}>
      {open && (
        <aside className="floating-chat" aria-label="KPM AI Concierge">
          <div className="chat-head">
            <div><span><Bot size={15} /> KPM AI Concierge</span><strong>{service}</strong></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close AI concierge"><X size={18} /></button>
          </div>
          <div className="chat-message">
            {messages.map((message, index) => <p key={`${service}-${index}`}>{message}</p>)}
          </div>
          <form onSubmit={submit} className="chat-form">
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about this service" />
            <button type="submit" aria-label="Send concierge message"><ArrowRight size={18} /></button>
          </form>
          <a className="chat-quote service-chat-link" href="/#sig-services">View service cards</a>
        </aside>
      )}
      <button type="button" className="chat-launcher" onClick={() => setOpen((value) => !value)} aria-label="Open KPM AI Concierge">
        <Bot size={22} /><span>AI Concierge</span>
      </button>
    </div>
  );
}
