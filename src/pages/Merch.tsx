import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Gem, Gauge, Sparkles } from 'lucide-react'
import {
  MERCH_MAIN,
  MERCH_ACCESSORIES,
  MERCH_DETAILS,
  MERCH_COLOURWAYS,
} from '@/lib/merch'
import type { MerchProduct } from '@/lib/merch'

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

function SectionTitle({
  title,
  accent,
  copy,
  dark = false,
}: {
  title: string
  accent?: string
  copy?: string
  dark?: boolean
}) {
  return (
    <div>
      <h2
        className={`font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em] ${
          dark ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
        {accent && (
          <em className={`font-serif font-medium italic ${dark ? 'text-taupe' : 'text-taupe'}`}>
            {' '}
            {accent}
          </em>
        )}
      </h2>
      {copy && (
        <p
          className={`mt-5 max-w-xl text-[14px] leading-[1.75] ${
            dark ? 'text-ivory-70' : 'text-taupe'
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  )
}

function ProductCard({ product, tall = false }: { product: MerchProduct; tall?: boolean }) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group"
    >
      <div className="overflow-hidden rounded-[20px] border border-taupe-soft bg-ink">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            tall ? 'aspect-[4/5]' : 'aspect-square'
          }`}
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="font-display text-[15px] font-bold text-ink">{product.name}</h3>
          <p className="mt-1 text-[12.5px] text-taupe">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-display text-[15px] font-bold text-umber">
          {product.price}
        </span>
      </div>
    </motion.div>
  )
}

export default function Merch() {
  return (
    <div className="bg-ivory text-ink">
      {/* Header */}
      <section className="bg-ink text-ivory">
        <div className="container pb-16 pt-20 text-center lg:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-6xl font-bold tracking-[-0.02em] sm:text-7xl lg:text-8xl"
          >
            KPMLXR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-4 text-[12px] font-bold uppercase tracking-[0.5em] text-taupe"
          >
            Luxury in Motion.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.8] text-ivory-70"
          >
            KPMLXR represents more than luxury car rentals — it's a lifestyle built on presence,
            precision and arrival. The brand merch collection carries that identity off the road:
            understated, considered, unmistakably KPM.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-taupe-soft">
        <div className="container grid gap-10 py-16 sm:grid-cols-3">
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-taupe-soft bg-white/60">
                <p.icon className="h-6 w-6 text-umber" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.3em]">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-taupe">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main collection */}
      <section>
        <div className="container py-24">
          <SectionTitle
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
      <section className="bg-ink text-ivory">
        <div className="container py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionTitle
                dark
                title="Branding"
                accent="Details."
                copy="Every piece is finished with considered brand detailing — premium chest embroidery, woven hem labels and dimensional 3D puff print."
              />
              <div className="mt-9">
                <Link
                  to="/c3/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-ivory/25 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
                >
                  Enquire About Merch
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
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
                  <div className="overflow-hidden rounded-[14px] border border-hairline-dark">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory-45">
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
        <div className="container py-24">
          <SectionTitle
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
      <section className="border-t border-taupe-soft bg-ivory-deep">
        <div className="container py-24">
          <SectionTitle
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
                className="flex items-center gap-5 rounded-[20px] border border-taupe-soft bg-white/70 p-6"
              >
                <span
                  className="h-14 w-14 shrink-0 rounded-full border border-ink/10"
                  style={{ backgroundColor: c.swatch }}
                  aria-hidden
                />
                <div>
                  <div className="font-display text-[15px] font-bold text-ink">{c.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-taupe">
                    {c.swatch}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl">
              Wear the <em className="font-serif font-medium italic text-taupe">Arrival.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-taupe">
              Merch enquiries, sizing and bulk corporate orders are handled directly by our
              concierge team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/c3/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-umber"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/c3/fleet"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
              >
                Browse the Fleet
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
