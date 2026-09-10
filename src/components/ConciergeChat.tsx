import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Sparkles, X } from 'lucide-react'
import { CONTACT } from '@/lib/site'
import { cn } from '@/lib/utils'

type Msg = { from: 'ai' | 'user'; text: string }

const QUICK_CHIPS = ['Fleet & rates', 'Wedding hire', 'Corporate leases', 'Book a viewing']

const GREETING: Msg = {
  from: 'ai',
  text: "Good day — I'm the KPM AI Concierge. Whether it's a weekend escape, a wedding arrival, or a long-term corporate fleet, I'll point you in the right direction. How may I assist?",
}

/** Scripted concierge responses (frontend demo — no live AI wired up). */
function conciergeReply(q: string): string {
  const s = q.toLowerCase()
  if (/(rate|price|cost|fee|charge|how much)/.test(s))
    return 'Our rates are tailored to the vehicle, duration and occasion — day, weekend and long-term structures are all available. Share the vehicle and dates you have in mind on the contact page, or call our concierge line, and we will prepare a precise quotation within the hour.'
  if (/(fleet|car|vehicle|ferrari|lamborghini|porsche|range rover|rolls|mercedes|bmw|bentley|audi)/.test(s))
    return 'The collection spans grand tourers, supercars and executive SUVs — from the Rolls-Royce Ghost and Range Rover to the Ferrari F8 Tributo and Lamborghini Huracán. You can browse the full fleet on the Fleet page; every listing includes specifications and a direct reservation option.'
  if (/(wed|bride|groom|matric)/.test(s))
    return 'For weddings and matric dances we arrange chauffeured or self-drive packages with red-carpet delivery, ribbon dressing and photography time built in. Dates around peak season book out quickly — I recommend reserving 4–6 weeks ahead.'
  if (/(corpor|embassy|business|lease|long.?term)/.test(s))
    return 'Our corporate and diplomatic programmes cover long-term leases, chauffeur services and multi-vehicle fleets, with dedicated account management for boards and embassies across Gauteng. The concierge team will draft a proposal around your fleet requirements.'
  if (/(airport|transfer|chauffeur|driver)/.test(s))
    return 'Chauffeured airport transfers to and from OR Tambo and Lanseria are available across the executive range — meet-and-greet, flight tracking and waiting time are all included.'
  if (/(book|reserve|view|appointment|test|visit)/.test(s))
    return `Wonderful — viewings at our Sandton showroom are by private appointment. Leave your details on the contact page or call ${CONTACT.phone} and we will confirm a time that suits you.`
  if (/(where|location|address|find you|sandton|johannesburg)/.test(s))
    return `You'll find us at ${CONTACT.address.join(' ')} — viewings and handovers are by appointment, and delivery is available throughout Gauteng.`
  if (/(hour|open|when)/.test(s))
    return `The showroom operates by appointment seven days a week, and the concierge line — ${CONTACT.phone} — is answered around the clock for existing clients.`
  if (/(deposit|license|licence|require|document|age)/.test(s))
    return "For self-drive hire we require a valid driver's licence, ID or passport, and a refundable security deposit that varies by vehicle. Chauffeured hire has no deposit requirements."
  if (/(human|person|call|phone|email|whatsapp|contact)/.test(s))
    return `Of course — our human concierge is on ${CONTACT.phone} or ${CONTACT.email}. Mention anything I've promised you here and they will pick it right up.`
  if (/(hi|hello|hey|good)/.test(s))
    return 'A warm welcome to KPM Luxury Rentals. Are you hiring for an occasion — a wedding, a weekend, or business travel? I can tailor a recommendation.'
  return `I'd love to help with that. For anything detailed, our concierge team responds within minutes on ${CONTACT.phone} or ${CONTACT.email} — or ask me about the fleet, rates, weddings, or corporate leases.`
}

/**
 * Floating AI concierge (landing pages of both concepts only). Gold pill —
 * styled after the client's reference mockup — opens a dark-glass chat panel
 * with a scripted concierge (frontend demo).
 */
export default function ConciergeChat() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/' || pathname === '/c1' || pathname === '/c2' || pathname === '/c3'

  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing, open])

  if (!isLanding) return null

  const send = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return
    setMsgs((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: 'ai', text: conciergeReply(text) }])
      setTyping(false)
    }, 900)
  }

  return (
    <>
      {/* floating gold pill — bottom right (per client reference mockup) */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen((v) => !v)}
        data-cursor
        aria-label={open ? 'Close AI concierge' : 'Open AI concierge chat'}
        className={cn(
          'fixed bottom-4 right-4 z-[96] flex h-14 items-center rounded-full bg-gold text-[#121110] shadow-[0_18px_44px_-14px_rgba(199,191,174,0.7)] transition-transform duration-300 hover:scale-[1.04] active:scale-95 md:bottom-6 md:right-6',
          open ? 'gap-2.5 px-5' : 'w-14 justify-center px-0',
        )}
      >
        {open ? (
          <>
            <X size={17} strokeWidth={2.4} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Close</span>
          </>
        ) : (
          <img
            src="/logo-black.png"
            alt=""
            width={34}
            height={34}
            className="h-[34px] w-[34px] object-contain"
          />
        )}
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="KPM AI concierge chat"
            className="fixed bottom-[4.5rem] right-4 z-[96] flex h-[min(560px,72dvh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(14,14,17,0.86)] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:bottom-24 md:right-6"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[#121110]">
                <Sparkles size={16} strokeWidth={2.2} />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[13px] font-semibold tracking-wide text-[#F4F2EF]">
                  KPM AI Concierge
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · replies instantly
                </p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}>
                  <p
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-[1.55]',
                      m.from === 'user'
                        ? 'rounded-br-md bg-gold font-medium text-[#121110]'
                        : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-[#F4F2EF]/90',
                    )}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/80"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* quick chips */}
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {QUICK_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => send(c)}
                  className="rounded-full border border-gold/40 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-[#121110]"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the fleet, rates, occasions…"
                aria-label="Message the AI concierge"
                className="h-10 flex-1 rounded-full border border-white/12 bg-white/[0.05] px-4 text-[13px] text-[#F4F2EF] outline-none placeholder:text-white/35 focus:border-gold/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-[#121110] transition-transform hover:scale-105 active:scale-95"
              >
                <Send size={15} strokeWidth={2.4} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
