import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../lib/hooks.js'

/** Blue is reserved for the actions that win jobs: design/quote and call. */
const VARIANTS = {
  primary: 'bg-dy text-void font-semibold shadow-[0_14px_44px_-16px_rgba(58,182,251,.9)] hover:bg-dy-glow',
  outline: 'border border-white/20 text-white hover:border-dy bg-white/[0.03]',
  light: 'bg-white text-void font-semibold hover:bg-paper',
  dark: 'bg-void text-white font-semibold hover:bg-coal-700',
}
const SIZES = { sm: 'h-10 px-4 text-[13px]', md: 'h-12 px-6 text-[14px]', lg: 'h-14 px-7 text-[15px]' }

/** Leans toward the cursor with a pointer-tracked highlight; plain on touch and reduced motion. */
export default function MagneticButton({ as = 'button', children, variant = 'primary', size = 'md', className = '', strength = 12, ...props }) {
  const ref = useRef(null)
  // Both hooks always run: `a() && !b()` would skip b() on touch devices and
  // break React's hook order, which crashed the page on phones.
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const onMove = (e) => {
    if (!enabled || !ref.current || props.disabled) return
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength)
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength * 0.6)
    ref.current.style.setProperty('--bx', `${((e.clientX - r.left) / r.width) * 100}%`)
    ref.current.style.setProperty('--by', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const reset = () => { x.set(0); y.set(0) }
  const Cmp = motion[as] ?? motion.button
  return (
    <Cmp ref={ref} onPointerMove={onMove} onPointerLeave={reset} onBlur={reset}
      style={{ x: enabled ? x : 0, y: enabled ? y : 0 }}
      className={`group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-display transition-colors duration-300 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(110px circle at var(--bx,50%) var(--by,50%), rgba(255,255,255,.3), transparent 60%)' }} />
      <span className="relative z-10 inline-flex items-center gap-2.5 whitespace-nowrap">{children}</span>
    </Cmp>
  )
}
