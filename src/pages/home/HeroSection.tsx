import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import GoldButton from '@/components/GoldButton'
import KineticHeadline from '@/components/anim/KineticHeadline'

/**
 * Home hero (home.md §1): full-bleed Ferrari Purosangue daylight image
 * (LIGHT — no dark overlay; a subtle ivory gradient evens sky and terrace).
 * Charcoal stacked Archivo H1 over the pale-sky zone; frosted glass-light
 * panel (sub + CTAs) over the terrace zone; scroll cue bottom-right.
 * Load sequence: bg scale 1.1 → 1 (2.6s power2.out) → eyebrow (0.4s) →
 * char-split H1 (0.6s) → glass panel materializes (1.2s, blur → 0) →
 * buttons → scroll cue (1.9s). Scrub: text block yPercent 0 → 16 + fade,
 * bg yPercent 0 → 12 over the first 100vh. GSAP-owned.
 */
export default function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const bg = scope.querySelector('.hero-bg')
      const cue = scope.querySelector('.hero-cue')
      const panel = scope.querySelector('.hero-panel')
      const btns = scope.querySelectorAll('.hero-btn')

      if (prefersReducedMotion()) {
        gsap.set([bg, cue, panel, ...btns], { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' })
        return
      }

      // 1. cinematic push-out
      gsap.fromTo(
        bg,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.6, ease: 'power2.out' },
      )
      // 5. glass panel materializes — rise + fade + frost blur resolving
      gsap.fromTo(
        panel,
        { y: 32, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1.2, ease: 'power3.out' },
      )
      // 6. buttons stagger in after the panel
      gsap.fromTo(
        btns,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 1.5, stagger: 0.1, ease: 'power3.out' },
      )
      // 7. scroll cue
      gsap.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.9 })

      // scrub parallax over the first viewport
      gsap.to(bg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(scope.querySelector('.hero-content'), {
        yPercent: 16,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative -mt-[100px] flex min-h-[100dvh] flex-col overflow-hidden"
      aria-label="KPM Luxury Rentals — hero"
    >
      {/* background — light image, subtle ivory evening gradient only */}
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-bg absolute inset-[-6%]">
          <img
            src="/hero-purosangue-front.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(244,242,239,0.78) 0%, rgba(244,242,239,0.42) 34%, rgba(244,242,239,0.04) 58%, rgba(244,242,239,0) 72%, rgba(244,242,239,0.5) 100%)',
          }}
        />
      </div>

      {/* content — headline over the sky zone, glass panel over the terrace */}
      <div className="hero-content container relative flex min-h-[100dvh] flex-col justify-between pb-24 pt-36 md:pb-28">
        <div>
          <HeroEyebrow />
          <KineticHeadline
            as="h1"
            trigger="load"
            split="chars"
            delay={0.6}
            stagger={0.028}
            lines={['Luxury Lived.', 'Memories Captured.']}
            lineClasses={['', 'font-accent font-medium italic text-umber']}
            className="mt-7 text-[clamp(3.5rem,9vw,8rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-charcoal"
          />
        </div>

        {/* frosted glass panel over the terrace zone */}
        <div className="hero-panel glass-light max-w-xl rounded-[28px] p-8 shadow-glass md:p-10">
          <p className="text-[15px] font-medium leading-[1.7] text-charcoal/80">
            South Africa's premier luxury vehicle rental experience. Experience the pinnacle of
            performance, comfort, and white-glove service in Gauteng.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="hero-btn">
              <GoldButton to="/c3/fleet" arrow>
                Explore Our Fleet
              </GoldButton>
            </span>
            <span className="hero-btn">
              <GoldButton to="/c3/contact" variant="glass">
                Get a Quote
              </GoldButton>
            </span>
          </div>
        </div>
      </div>

      {/* scroll cue — bottom right */}
      <div className="hero-cue absolute bottom-10 right-6 flex flex-col items-center gap-3 md:right-10">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-taupe">Scroll</span>
        <span className="relative block h-10 w-px bg-charcoal/30">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-charcoal animate-scroll-dot" />
        </span>
      </div>
    </section>
  )
}

/** Eyebrow — charcoal dash draws in (0.7s, delay 0.4s), taupe label fades up. */
function HeroEyebrow() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const rule = el.querySelector('.eyebrow-rule')
      const label = el.querySelector('.eyebrow-label')
      if (prefersReducedMotion()) {
        gsap.set([rule, label], { scaleX: 1, y: 0, opacity: 1 })
        return
      }
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, delay: 0.4, ease: 'power3.out' },
      )
      gsap.fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.8, ease: 'power3.out' },
      )
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-charcoal" aria-hidden />
      <span className="eyebrow-label eyebrow">Johannesburg, South Africa</span>
    </div>
  )
}
