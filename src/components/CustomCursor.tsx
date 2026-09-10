import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * Custom cursor (design.md §5, desktop pointer:fine only): 8px charcoal dot +
 * 36px ring (border rgba(75,71,69,0.4)) lerping behind at 0.12. Both use
 * mix-blend-difference with ivory so the pair inverts over dark bands. Ring
 * scales 1.6 over interactive elements (a, button, [data-cursor]). Native
 * cursor stays visible. Hidden on touch devices / reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.6 })
  const ringY = useSpring(my, { stiffness: 400, damping: 40, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      const t = e.target as HTMLElement | null
      setHovering(!!t?.closest('a, button, [data-cursor]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  if (!enabled) return null

  return (
    <>
      {/* dot — charcoal, inverts to ivory over dark bands */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-ivory mix-blend-difference"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
      />
      {/* ring — lerps behind at ~0.12, scales 1.6 over interactive elements */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-[rgba(244,242,239,0.4)] mix-blend-difference"
        animate={{
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? 'rgba(244,242,239,0.10)' : 'rgba(244,242,239,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
