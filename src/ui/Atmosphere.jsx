import { motion, useScroll, useSpring } from 'framer-motion'

/** Slow pools of the brand blue in the dark. Transform-only, pointer-events off. */
export function Aurora({ className = '', strong = false }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -right-[14%] top-[-20%] h-[56vw] w-[56vw] animate-drift rounded-full bg-dy blur-[140px]"
        style={{ opacity: strong ? 0.16 : 0.09, willChange: 'transform' }} />
      <div className="absolute -left-[20%] bottom-[-34%] h-[46vw] w-[46vw] rounded-full bg-dy-deep blur-[150px]"
        style={{ opacity: strong ? 0.13 : 0.07 }} />
    </div>
  )
}

/** Thin progress bar along the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 34, restDelta: 0.001 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-dy-deep to-dy-glow" />
}
