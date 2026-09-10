import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Ghost from '@/concept1/components/Ghost'
import CarCard from '@/concept1/components/CarCard'
import { FLEET_VEHICLES, FLEET_FILTERS } from '@/concept1/lib/site'
import type { FleetFilter } from '@/lib/site'

export default function Fleet() {
  const [filter, setFilter] = useState<FleetFilter>('All Vehicles')

  const vehicles = useMemo(() => {
    if (filter === 'All Vehicles') return FLEET_VEHICLES
    return FLEET_VEHICLES.filter((v) => v.category === filter)
  }, [filter])

  return (
    <div className="bg-white">
      <Ghost text="The fleet" className="pt-10" />
      <div className="mx-auto max-w-[1280px] px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-lxrtitle text-5xl font-semibold leading-[1.02] tracking-tight text-lxr-ink sm:text-6xl">
              The <em className="font-lxrbody font-medium italic text-lxr-olive">Fleet.</em>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-lxr-muted">
              Flagship performance coupes, executive saloons and ultra-prestige marques — every
              vehicle maintained to showroom standard and delivered to your door.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FLEET_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === f
                    ? 'border-lxr-black bg-lxr-black text-white'
                    : 'border-lxr-line text-lxr-muted hover:border-lxr-ink hover:text-lxr-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <motion.div
              key={v.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <CarCard vehicle={v} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
