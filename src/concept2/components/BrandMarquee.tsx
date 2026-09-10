import { memo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

const BRANDS = [
  'Mercedes-Benz',
  'BMW',
  'Rolls-Royce',
  'Porsche',
  'Lamborghini',
  'Bentley',
  'Audi',
  'Range Rover',
] as const

/**
 * BrandMarquee (design.md §7.11, fleet.md §3): bg-elevated band with centered
 * gold caps label + infinite 40s linear wordmark loop (duplicated track for a
 * seamless wrap). Pauses on hover; wordmark hover brightens gold-dim → gold.
 * Label + wordmarks fade/stagger in on scroll at 82%. Perpetual CSS loop is
 * isolated here and the component is memoized so parents can't restart it.
 */
function BrandMarquee() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const label = root.querySelector('.marquee-label')
      const wordmarks = root.querySelectorAll('.wordmark')
      if (prefersReducedMotion()) {
        gsap.set([label, ...wordmarks], { opacity: 1, y: 0 })
        return
      }
      const st = { trigger: root, start: 'top 82%', once: true } as const
      gsap.fromTo(
        label,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: st },
      )
      gsap.fromTo(
        wordmarks,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 0.15,
          scrollTrigger: st,
        },
      )
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className="group/marquee overflow-hidden border-y border-subtle bg-night-elevated py-16 md:py-20"
      aria-label="Partner brands"
    >
      {/* Loop keyframes live here so global stylesheets stay untouched. */}
      <style>{'@keyframes kpm-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'}</style>

      <p className="marquee-label text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
        Direct Elite Partnerships &amp; Manufacturer Standards
      </p>

      <div className="mt-10 overflow-hidden">
        <div className="flex w-max animate-[kpm-marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="wordmark whitespace-nowrap px-10 font-c1serif text-2xl uppercase tracking-[0.12em] text-gold-dim/60 transition-colors duration-300 hover:text-gold"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(BrandMarquee)
