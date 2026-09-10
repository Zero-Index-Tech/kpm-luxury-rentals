import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CONCEPTS = [
  { id: 1, label: 'Concept 1', prefix: '/c1' },
  { id: 2, label: 'Concept 2', prefix: '/c2' },
  { id: 3, label: 'Concept 3', prefix: '/c3' },
] as const

/**
 * Fixed segmented pill (bottom-left) that lets the client flip between the
 * three design concepts. All concepts share an identical route structure
 * (/fleet, /fleet/:slug, /about, /contact), so switching preserves the page
 * being viewed — e.g. /c1/fleet ↔ /c3/fleet. Styled after the client's reference mockup: dark glass pill, champagne-gold
 * active segment with dark text, muted ivory inactive segments.
 */
export default function ConceptSwitcher() {
  const { pathname } = useLocation()

  const current = CONCEPTS.find((c) => pathname.startsWith(c.prefix)) ?? CONCEPTS[0]

  // equivalent path in another concept (strip current prefix, re-apply target)
  const pathFor = (prefix: string) => prefix + pathname.replace(/^\/c[123]/, '')

  const segment =
    'rounded-full px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 md:px-4 md:py-2.5 md:text-[11px]'

  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Switch design concept"
      className="fixed bottom-4 left-4 z-[95] md:bottom-6 md:left-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[rgba(16,15,14,0.78)] p-1 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        {CONCEPTS.map((c) => (
          <Link
            key={c.id}
            to={pathFor(c.prefix)}
            data-cursor
            aria-current={current.id === c.id ? 'page' : undefined}
            className={cn(
              segment,
              current.id === c.id
                ? 'bg-gold text-[#121110] shadow-[0_6px_18px_-6px_rgba(199,191,174,0.55)]'
                : 'text-white/50 hover:text-white',
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
