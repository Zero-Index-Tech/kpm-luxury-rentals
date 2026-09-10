import { Phone } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import GoldButton from '@/components/GoldButton'
import KineticHeadline from '@/components/anim/KineticHeadline'
import Reveal from '@/components/anim/Reveal'
import { CONTACT } from '@/lib/site'

interface CTABandProps {
  eyebrow?: string
  title: string
  copy: string
  buttonLabel?: string
  buttonTo?: string
  /** One word of the title rendered in Fraunces italic (design.md §3 accent rule). */
  accentWord?: string
}

/**
 * CTABand (design.md §7.9): rounded-[28px] bg-ink slab inset within the
 * container (NOT full-bleed — a floating rounded slab, V2 signature), warm
 * taupe radial glow from the bottom, hairline-dark inner border. Left: H2 +
 * copy; right: ivory pill button + phone link. Entrance: left slides -40px,
 * right +40px, 0.9s power3.out at 80%.
 */
export default function CTABand({
  eyebrow,
  title,
  copy,
  buttonLabel = 'Submit Enquiry',
  buttonTo = '/contact',
  accentWord,
}: CTABandProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[28px] border border-hairline-dark bg-ink px-8 py-14 md:px-14 md:py-20">
          <div className="taupe-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <Reveal y={0} x={-40} duration={0.9} start="top 80%" className="max-w-2xl">
              {eyebrow && <Eyebrow tone="dark" className="mb-6">{eyebrow}</Eyebrow>}
              <KineticHeadline
                lines={[title]}
                accentWords={accentWord ? [accentWord] : undefined}
                accentClassName="font-accent font-normal italic text-[#B4A89E]"
                className="text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ivory"
              />
              <p className="mt-6 text-[15px] font-normal leading-[1.75] text-ivory-70">{copy}</p>
            </Reveal>
            <Reveal
              y={0}
              x={40}
              duration={0.9}
              start="top 80%"
              className="flex flex-col items-start gap-6 lg:items-end"
            >
              <GoldButton to={buttonTo} className="bg-ivory text-ink hover:bg-ivory-deep">
                {buttonLabel}
              </GoldButton>
              <a
                href={CONTACT.phoneHref}
                className="group flex items-center gap-4"
                data-cursor
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 transition-colors duration-300 group-hover:bg-ivory/20">
                  <Phone size={16} className="text-ivory" aria-hidden />
                </span>
                <span className="font-display text-[1.35rem] font-bold tracking-[-0.01em] text-ivory">
                  {CONTACT.phone}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
