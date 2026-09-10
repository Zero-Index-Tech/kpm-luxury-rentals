import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatar: string
}

/**
 * TestimonialCard (design.md §7.7): surface card, gold/40 quote icon,
 * serif-italic quote, avatar + name + role. Hover: border gold/30, -4px lift,
 * avatar gold ring.
 */
export default function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <figure className="group border border-subtle bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(199,191,174,0.3)]">
      <Quote size={28} className="text-gold/40" aria-hidden />
      <blockquote className="mt-6 font-c1serif text-[1.05rem] italic leading-relaxed text-ivory/90">
        “{quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover ring-1 ring-transparent transition duration-500 group-hover:ring-gold"
        />
        <div>
          <p className="text-[13px] font-medium text-ivory">{name}</p>
          <p className="mt-0.5 text-[11px] text-ivory-muted">{role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
