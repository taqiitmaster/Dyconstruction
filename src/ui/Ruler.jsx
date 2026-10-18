import { motion, useReducedMotion } from 'framer-motion'

/**
 * The page's signature detail, lifted from the logo's tape measure and set
 * square: a short ruler whose ticks draw in left to right when it scrolls into
 * view. Used under headings as a measured underline — "precision" shown rather
 * than claimed.
 */
export default function Ruler({ className = '', ticks = 25, light = false }) {
  const reduce = useReducedMotion()
  const w = (ticks - 1) * 7 + 2
  return (
    <motion.svg viewBox={`0 0 ${w} 14`} width={w} height="14" className={className} aria-hidden="true"
      initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.8 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.018 } } }}>
      <motion.line x1="1" y1="13" x2={w - 1} y2="13" stroke={light ? 'rgba(11,16,22,.25)' : 'rgba(255,255,255,.18)'} strokeWidth="1"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6 } } }} />
      {Array.from({ length: ticks }, (_, i) => {
        const major = i % 5 === 0
        return (
          <motion.line key={i} x1={1 + i * 7} x2={1 + i * 7} y1={major ? 2 : 7} y2="13"
            stroke={major ? '#3AB6FB' : light ? 'rgba(11,16,22,.35)' : 'rgba(255,255,255,.35)'} strokeWidth={major ? 1.6 : 1}
            variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }} />
        )
      })}
    </motion.svg>
  )
}
