import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Eyebrow from '@/components/Eyebrow'
import VehicleCard from '@/components/VehicleCard'
import BrandMarquee from '@/components/BrandMarquee'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import { ScrollTrigger } from '@/lib/gsap'
import { FLEET_FILTERS, FLEET_VEHICLES } from '@/lib/site'
import type { FleetFilter } from '@/lib/site'
import { cn } from '@/lib/utils'

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number]

/**
 * Fleet page (/fleet — fleet.md V2): ivory typographic hero (eyebrow, huge
 * Archivo H1 with a Fraunces italic accent line, glass badge card), pill
 * filter tabs with Framer Motion layout-animated filtering of the 9-card
 * stat-strip grid, and the BrandMarquee band.
 */
export default function Fleet() {
  const [active, setActive] = useState<FleetFilter>('All Vehicles')
  /** Distinguishes the initial load stagger (0.08s, rise 40px, after tabs)
   *  from filter-transition entrances (0.06s, rise 24px). */
  const loaded = useRef(false)
  useEffect(() => {
    loaded.current = true
  }, [])

  const filtered =
    active === 'All Vehicles'
      ? FLEET_VEHICLES
      : FLEET_VEHICLES.filter((v) => v.category === active)

  // Re-measure GSAP scroll triggers (card parallax) once the grid re-flows.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700)
    return () => window.clearTimeout(t)
  }, [active])

  return (
    <PageTransition>
      {/* Section 1 — Page hero (fleet.md §1) */}
      <section className="relative overflow-hidden bg-ivory pb-16 pt-10 md:pt-14">
        {/* decorative taupe wash so the glass badge card's blur reads on ivory */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(139,124,115,0.14), transparent 60%)',
          }}
        />
        <div className="container relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>The Showroom Collection</Eyebrow>
            <KineticHeadline
              as="h1"
              lines={['Our Curated', 'Fleet']}
              split="chars"
              trigger="load"
              delay={0.5}
              lineClasses={[
                '',
                'font-accent font-medium italic tracking-[-0.02em] text-umber',
              ]}
              className="mt-6 text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-charcoal"
            />
            <Reveal y={24} duration={1} delay={1.1}>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-taupe md:text-base">
                Explore peerless luxury lived and captured. Each vehicle is meticulously
                inspected, detailed, and delivered in pristine showroom condition to Sandton
                or your requested location across Gauteng.
              </p>
            </Reveal>
          </div>

          {/* frosted glass badge card — materializes in from the right */}
          <motion.div
            initial={{ opacity: 0, x: 36, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.9, ease: EASE_OUT }}
            className="shrink-0"
          >
            <div
              data-cursor
              className="glass-light group flex items-center gap-5 rounded-[24px] px-8 py-6 shadow-glass transition-colors duration-500 hover:bg-[rgba(244,242,239,0.75)]"
            >
              <span className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] text-charcoal transition-colors duration-500 group-hover:text-umber">
                200+
              </span>
              <span className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-[0.22em] text-taupe">
                <span>Elite Vehicles</span>
                <span>Available</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Filter pills + fleet grid (fleet.md §2) */}
      <section className="bg-ivory pb-32">
        <div className="container">
          <Reveal y={-14} duration={0.6} delay={1.1}>
            <div
              role="tablist"
              aria-label="Filter fleet by category"
              className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {FLEET_FILTERS.map((filter) => (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={active === filter}
                  onClick={() => setActive(filter)}
                  className={cn(
                    'shrink-0 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300',
                    active === filter
                      ? 'bg-ink text-ivory'
                      : 'border border-taupe-soft bg-[#FBFAF7] text-taupe hover:border-charcoal hover:text-charcoal',
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((vehicle, i) => {
                const initial = !loaded.current
                return (
                  <motion.div
                    key={vehicle.slug}
                    layout
                    initial={{ opacity: 0, y: initial ? 40 : 24 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: initial ? 1 : 0.5,
                        delay: initial ? 1.3 + i * 0.08 : i * 0.06,
                        ease: EASE_OUT,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.25, delay: 0, ease: 'easeIn' },
                    }}
                    transition={{ layout: { type: 'spring', stiffness: 200, damping: 26 } }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Defensive empty state (fleet.md §2) */}
          {filtered.length === 0 && (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="max-w-md text-[15px] leading-[1.75] text-taupe">
                No vehicles in this category — speak to our concierge for bespoke sourcing.
              </p>
              <Link
                to="/c3/contact"
                data-cursor
                className="mt-8 inline-block rounded-full border border-taupe-soft bg-[#FBFAF7] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-ivory-deep"
              >
                Speak With Concierge
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Section 3 — Brand marquee band (fleet.md §3) */}
      <div className="bg-ivory pb-32">
        <BrandMarquee />
      </div>
    </PageTransition>
  )
}
