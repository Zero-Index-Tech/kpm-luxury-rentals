import { Phone } from 'lucide-react'
import Eyebrow from '@/concept2/components/Eyebrow'
import GoldButton from '@/concept2/components/GoldButton'
import KineticHeadline from '@/concept2/components/anim/KineticHeadline'
import Reveal from '@/concept2/components/anim/Reveal'
import { CONTACT } from '@/concept2/lib/site'

interface CTABandProps {
  eyebrow?: string
  title: string
  copy: string
  buttonLabel?: string
  buttonTo?: string
}

/**
 * CTABand (design.md §7.9): bg-elevated band, hairlines top+bottom, radial
 * gold glow. Left H2 + copy, right gold button + phone link. Left slides from
 * -40px, right from +40px (0.9s power3.out at 80%).
 */
export default function CTABand({
  eyebrow,
  title,
  copy,
  buttonLabel = 'Submit Enquiry',
  buttonTo = '/contact',
}: CTABandProps) {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-night-elevated py-20">
      <div className="gold-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Reveal y={0} x={-40} duration={0.9} start="top 80%" className="max-w-2xl">
          {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
          <KineticHeadline
            lines={[title]}
            className="text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] text-ivory"
          />
          <p className="mt-6 text-[15px] font-light leading-[1.75] text-ivory-secondary">{copy}</p>
        </Reveal>
        <Reveal y={0} x={40} duration={0.9} start="top 80%" className="flex flex-col items-start gap-6 lg:items-end">
          <GoldButton to={buttonTo}>{buttonLabel}</GoldButton>
          <a
            href={CONTACT.phoneHref}
            data-cursor
            className="flex items-center gap-3 font-c1serif text-[1.4rem] text-gold transition-colors duration-300 hover:text-gold-bright"
          >
            <Phone size={18} aria-hidden />
            {CONTACT.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
