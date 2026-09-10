import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import GoldButton from '@/concept2/components/GoldButton'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'

/**
 * Home hero (home.md §1): full-viewport, hero-home.jpg at ~35% under layered
 * overlays, left-aligned content. Load sequence: bg scale 1.12 → 1 (2.4s
 * power2.out) + fade, eyebrow, char-split H1, sub, buttons, scroll cue.
 * Scrub: text yPercent 0 → 18 + fade, bg yPercent 0 → 12 over first 100vh.
 * GSAP-owned (no Framer Motion inside).
 */
export default function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const bg = scope.querySelector('.hero-bg')
      const cue = scope.querySelector('.hero-cue')

      if (prefersReducedMotion()) {
        gsap.set(bg, { scale: 1, opacity: 1 })
        gsap.set(cue, { opacity: 1 })
        return
      }

      // 1. cinematic push-out
      gsap.fromTo(
        bg,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' },
      )
      // 6. scroll cue
      gsap.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.8 })
      // 4. sub copy, 5. buttons
      gsap.fromTo(
        scope.querySelector('.hero-sub'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' },
      )
      gsap.fromTo(
        scope.querySelectorAll('.hero-btn'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 1.4, stagger: 0.1, ease: 'power3.out' },
      )

      // scrub parallax over the first viewport
      gsap.to(bg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(scope.querySelector('.hero-content'), {
        yPercent: 18,
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
      className="relative -mt-[88px] flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="KPM Luxury Rentals — hero"
    >
      {/* background + overlays */}
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-bg absolute inset-[-6%]">
          <img src="/hero-i8.jpg" alt="" className="h-full w-full object-cover opacity-[0.9]" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.55) 55%, rgba(10,10,11,0.75) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night to-transparent" />
        <div className="gold-glow absolute inset-0" />
      </div>

      {/* content */}
      <div className="hero-content container relative pt-[88px]">
        <div className="max-w-3xl">
          {/* eyebrow — rule then label, sequenced on load */}
          <HeroEyebrow />
          <KineticHeadline
            as="h1"
            trigger="load"
            split="words"
            delay={0.5}
            stagger={0.03}
            lines={['Luxury Lived.', 'Memories Captured.']}
            lineClasses={['', 'italic text-gold-bright']}
            className="mt-8 text-[clamp(2.6rem,5.8vw,5rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ivory"
          />
          <p className="hero-sub mt-8 max-w-xl text-base font-light leading-[1.75] text-ivory-secondary">
            South Africa's premier luxury vehicle rental experience. Experience the pinnacle of
            performance, comfort, and white-glove service in Gauteng.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <span className="hero-btn">
              <GoldButton to="/c2/fleet">Explore Our Fleet</GoldButton>
            </span>
            <span className="hero-btn">
              <GoldButton to="/c2/contact" variant="outline">
                Get a Quote
              </GoldButton>
            </span>
          </div>
        </div>
      </div>

      {/* scroll cue — bottom right */}
      <div className="hero-cue absolute bottom-10 right-6 flex flex-col items-center gap-3 md:right-10">
        <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-gold">
          Scroll
        </span>
        <span className="relative block h-10 w-px bg-gold/30">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold animate-scroll-dot" />
        </span>
      </div>
    </section>
  )
}

/** Eyebrow with load-sequenced rule + label (delays 0s / 0.3s). */
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
      gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo(
        label,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' },
      )
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className="flex items-center gap-6">
      <span className="eyebrow-rule inline-block h-px w-6 origin-left bg-gold" aria-hidden />
      <span className="eyebrow-label c1-eyebrow">Johannesburg, South Africa</span>
    </div>
  )
}
