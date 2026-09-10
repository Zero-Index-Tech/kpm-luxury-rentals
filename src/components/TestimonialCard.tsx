import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatar: string
}

/**
 * TestimonialCard (design.md §7.7): ivory card, taupe quote icon, Fraunces
 * italic quote (editorial voice), 44px round avatar with taupe-soft ring +
 * name/role. Hover: lift -4px, border deepens to taupe/50.
 */
export default function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <figure className="group rounded-[24px] border border-taupe-soft bg-[#FBFAF7] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(139,124,115,0.5)] hover:shadow-card-lift">
      <Quote size={26} className="text-taupe/50" aria-hidden />
      <blockquote className="mt-6 font-accent text-[1.1rem] italic leading-[1.6] text-charcoal/85">
        “{quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          width={44}
          height={44}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover ring-2 ring-taupe-soft"
        />
        <div>
          <p className="text-[13px] font-bold text-charcoal">{name}</p>
          <p className="mt-0.5 text-[11px] font-medium text-taupe">{role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
