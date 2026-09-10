import { motion } from 'framer-motion'
import { Gem, Gauge, Sparkles } from 'lucide-react'
import LxrButton from '@/concept1/components/LxrButton'
import SectionHead from '@/concept1/components/SectionHead'
import {
  MERCH_MAIN,
  MERCH_ACCESSORIES,
  MERCH_DETAILS,
  MERCH_COLOURWAYS,
} from '@/concept1/lib/site'
import type { MerchProduct } from '@/concept1/lib/site'

const EASE = [0.22, 1, 0.36, 1] as const
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

const PILLARS = [
  {
    icon: Gem,
    title: 'Luxury',
    body: 'Premium heavyweight fabrics, refined fits and tonal finishes — apparel held to the same standard as the fleet.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    body: 'Built for movement. Durable construction, breathable weaves and detailing made to be worn daily.',
  },
  {
    icon: Sparkles,
    title: 'Lifestyle',
    body: 'A statement beyond the driver’s seat — KPMLXR pieces carry the brand wherever you arrive.',
  },
]

function ProductCard({ product, tall = false }: { product: MerchProduct; tall?: boolean }) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group"
    >
      <div className="overflow-hidden rounded-[6px] border border-lxr-linedark bg-lxr-panel">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            tall ? 'aspect-[4/5]' : 'aspect-square'
          }`}
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-lxrtitle text-[15px] font-semibold text-white">{product.name}</h3>
          <p className="mt-1 text-[12.5px] text-white/50">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-lxrtitle text-[15px] font-semibold text-lxr-sand">
          {product.price}
        </span>
      </div>
    </motion.div>
  )
}

export default function Merch() {
  return (
    <div className="bg-lxr-black text-white">
      {/* Header */}
      <section className="border-b border-lxr-linedark">
        <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-20 text-center lg:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-lxrtitle text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
          >
            KPMLXR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-4 text-[12px] font-medium uppercase tracking-[0.5em] text-lxr-sand"
          >
            Luxury in Motion.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.8] text-white/60"
          >
            KPMLXR represents more than luxury car rentals — it's a lifestyle built on presence,
            precision and arrival. The brand merch collection carries that identity off the road:
            understated, considered, unmistakably KPM.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-lxr-linedark">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-lxr-linedark">
                <p.icon className="h-6 w-6 text-lxr-sand" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-lxrtitle text-sm font-semibold uppercase tracking-[0.3em]">
                {p.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-white/55">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main collection */}
      <section>
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead
            dark
            title="The"
            accent="Collection."
            copy="Signature tees and core tracksuits — the foundation pieces of the KPMLXR wardrobe."
          />
          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {MERCH_MAIN.map((p) => (
              <ProductCard key={p.name} product={p} tall />
            ))}
          </div>
        </div>
      </section>

      {/* Branding details */}
      <section className="bg-lxr-panel">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHead
                dark
                title="Branding"
                accent="Details."
                copy="Every piece is finished with considered brand detailing — premium chest embroidery, woven hem labels and dimensional 3D puff print."
              />
              <div className="mt-9">
                <LxrButton to="/c1/contact" variant="outlineLight">
                  Enquire About Merch
                </LxrButton>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {MERCH_DETAILS.map((d, i) => (
                <motion.figure
                  key={d.title}
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <div className="overflow-hidden rounded-[4px] border border-lxr-linedark">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {d.title}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional pieces */}
      <section>
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead
            dark
            title="Additional"
            accent="Pieces."
            copy="Complete the set — heavyweight hoodie, six-panel cap and the everyday crossbody."
          />
          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-3">
            {MERCH_ACCESSORIES.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Colourways */}
      <section className="border-t border-lxr-linedark">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <SectionHead
            dark
            title="Brand"
            accent="Colourways."
            copy="A restrained palette drawn from the KPMLXR identity — worn across the full collection."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {MERCH_COLOURWAYS.map((c, i) => (
              <motion.div
                key={c.name}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="flex items-center gap-5 rounded-[6px] border border-lxr-linedark bg-lxr-panel p-6"
              >
                <span
                  className="h-14 w-14 shrink-0 rounded-full border border-white/15"
                  style={{ backgroundColor: c.swatch }}
                  aria-hidden
                />
                <div>
                  <div className="font-lxrtitle text-[15px] font-semibold text-white">{c.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {c.swatch}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h2 className="mx-auto max-w-2xl font-lxrtitle text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Wear the{' '}
              <em className="font-lxrbody font-medium italic text-lxr-sand">Arrival.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
              Merch enquiries, sizing and bulk corporate orders are handled directly by our
              concierge team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <LxrButton to="/c1/contact" variant="light">
                Enquire Now
              </LxrButton>
              <LxrButton to="/c1/fleet" variant="outlineLight">
                Browse the Fleet
              </LxrButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
