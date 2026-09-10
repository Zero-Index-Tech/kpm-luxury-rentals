import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * Global page transition (design.md §5): incoming page fades in over 0.5s
 * with a slight settle; exit handled by AnimatePresence in App (fade + slide
 * up 24px over 0.35s). Framer-Motion-owned wrapper div only.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  if (prefersReducedMotion()) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, y: -24, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
    >
      {children}
    </motion.div>
  )
}
