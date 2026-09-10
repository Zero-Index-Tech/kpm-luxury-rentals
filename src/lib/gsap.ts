import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE_OUT = 'power3.out'
export const EASE_IN_OUT = 'power2.inOut'

/** True when the user prefers reduced motion — skip split/parallax/scrub effects. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
