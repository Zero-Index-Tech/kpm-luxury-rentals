import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '@/concept2/components/PageTransition'
import Eyebrow from '@/concept2/components/Eyebrow'
import GoldButton from '@/concept2/components/GoldButton'
import VehicleCard from '@/concept2/components/VehicleCard'
import BrandMarquee from '@/concept2/components/BrandMarquee'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import { ScrollTrigger } from '@/lib/gsap'
import { FLEET_FILTERS, FLEET_VEHICLES } from '@/concept2/lib/site'
import type { FleetFilter } from '@/concept2/lib/site'
import { cn } from '@/lib/utils'

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number]

/**
 * Fleet page (/fleet — fleet.md): page hero with stat badge, working category
 * filter tabs, 9-vehicle grid with Framer Motion layout filtering, brand marquee.
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
      <section className="bg-night pt-40 pb-16">
        <div className="container flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>The Showroom Collection</Eyebrow>
            <KineticHeadline
              as="h1"
              lines={['Our Curated Fleet']}
              split="words"
              trigger="load"
              delay={0.5}
              className="mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ivory"
            />
            <Reveal y={24} duration={1} delay={1}>
              <p className="mt-6 text-[15px] font-light leading-[1.75] text-ivory-secondary md:text-base">
                Explore peerless luxury lived and captured. Each vehicle is meticulously
                inspected, detailed, and delivered in pristine showroom condition to Sandton
                or your requested location across Gauteng.
              </p>
            </Reveal>
          </div>

          <Reveal x={40} y={0} duration={1} delay={0.9} className="shrink-0">
            <div
              data-cursor
              className="group flex items-center gap-5 rounded-[2px] border border-[rgba(199,191,174,0.3)] px-8 py-6 transition-colors duration-500 hover:border-gold"
            >
              <span className="btn-sheen font-c1serif text-[2.5rem] leading-none text-gold-bright transition-transform duration-500 group-hover:scale-[1.04]">
                200+
              </span>
              <span className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted">
                <span>Elite Vehicles</span>
                <span>Available</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Filter tabs + fleet grid (fleet.md §2) */}
      <section className="bg-night pb-32">
        <div className="container">
          <Reveal y={-16} duration={0.6} delay={1.1}>
            <div
              role="tablist"
              aria-label="Filter fleet by category"
              className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {FLEET_FILTERS.map((filter) => (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={active === filter}
                  onClick={() => setActive(filter)}
                  className={cn(
                    'shrink-0 rounded-[2px] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300',
                    active === filter
                      ? 'bg-gold text-ink'
                      : 'border border-subtle text-ivory-secondary hover:border-gold/50 hover:text-ivory',
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
                    transition={{ layout: { type: 'spring', stiffness: 200, damping: 25 } }}
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
              <p className="max-w-md text-[15px] font-light leading-[1.75] text-ivory-muted">
                No vehicles in this category — speak to our concierge for bespoke sourcing.
              </p>
              <GoldButton to="/c2/contact" variant="outline" className="mt-8">
                Speak With Concierge
              </GoldButton>
            </div>
          )}
        </div>
      </section>

      {/* Section 3 — Brand marquee band (fleet.md §3) */}
      <BrandMarquee />
    </PageTransition>
  )
}
