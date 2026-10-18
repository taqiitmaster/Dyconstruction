import { motion } from 'framer-motion'
import { useReveal } from '../lib/hooks.js'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/**
 * Line icons drawn as stroked paths so they can animate themselves on — the
 * dash offset runs from "unbuilt" to "built", which suits a trade that
 * literally assembles things.
 */
export function DrawIcon({ children, size = 28, className = '', draw = true, delay = 0 }) {
  const [ref, inView] = useReveal({ amount: 0.4 })
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      initial={draw ? 'hidden' : false}
      animate={inView || !draw ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      {...base}
    >
      {children}
    </motion.svg>
  )
}

const Stroke = (props) => (
  <motion.path
    variants={{
      hidden: { pathLength: 0, opacity: 0 },
      show: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      },
    }}
    {...props}
  />
)

export const ICON_PATHS = {
  carpentry: (<><Stroke d="M5 24 19 10" /><Stroke d="m17 6 5-2 6 6-2 5-4 1-6-6z" /><Stroke d="M4 27h10" /></>),
  interior: (<><Stroke d="M5 18v-4a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v4" /><Stroke d="M4 18h24v6H4z" /><Stroke d="M7 24v3M25 24v3" /></>),
  fees: (<><Stroke d="M4 9h24v15H4z" /><Stroke d="M16 12v9M19 13.5h-4a1.75 1.75 0 0 0 0 3.5h2a1.75 1.75 0 0 1 0 3.5h-4.5" /></>),
  comms: (<><Stroke d="M5 6h22v15H13l-6 5v-5H5z" /><Stroke d="M10 12h12M10 16h8" /></>),
  clock: (<><Stroke d="M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24z" /><Stroke d="M16 9v7l5 3" /></>),
  laundry: (<><Stroke d="M6 4h20v24H6z" /><Stroke d="M16 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" /><Stroke d="M10 8h2M15 8h2" /></>),
  room: (<><Stroke d="M4 14 16 5l12 9" /><Stroke d="M7 13v14h18V13" /><Stroke d="M13 27v-7h6v7" /></>),

  // Services trio
  renovations: (
    <>
      <Stroke d="M4 14 16 5l12 9" />
      <Stroke d="M7 13v13h18V13" />
      <Stroke d="M13 26v-7h6v7" />
    </>
  ),
  kitchen: (
    <>
      <Stroke d="M5 6h22v20H5z" />
      <Stroke d="M5 16h22" />
      <Stroke d="M10 10v2M10 21v2" />
      <Stroke d="M21 10h2M21 21h2" />
    </>
  ),
  bathroom: (
    <>
      <Stroke d="M4 17h24" />
      <Stroke d="M6 17v4a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-4" />
      <Stroke d="M9 17V8a3 3 0 0 1 6 0v1" />
      <Stroke d="M12 9h5" />
    </>
  ),
  // Feature grid
  bolt: <Stroke d="M18 4 7 18h7l-1 10 11-14h-7z" />,
  gem: (
    <>
      <Stroke d="M9 5h14l5 8-12 14L4 13z" />
      <Stroke d="M4 13h24" />
      <Stroke d="M12 13 16 5l4 8-4 14z" />
    </>
  ),
  support: (
    <>
      <Stroke d="M6 19v-4a10 10 0 0 1 20 0v4" />
      <Stroke d="M6 17h3v7H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" />
      <Stroke d="M26 17h-3v7h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z" />
      <Stroke d="M23 24v1a3 3 0 0 1-3 3h-3" />
    </>
  ),
  wave: (
    <>
      <Stroke d="M3 12c3.5-4 7-4 10.5 0S21 16 24.5 12 29 8 29 8" />
      <Stroke d="M3 22c3.5-4 7-4 10.5 0S21 26 24.5 22 29 18 29 18" />
    </>
  ),
  rule: (
    <>
      <Stroke d="M3 11h26v10H3z" />
      <Stroke d="M8 11v4M13 11v6M18 11v4M23 11v6" />
    </>
  ),
  scan: (
    <>
      <Stroke d="M4 10V6a2 2 0 0 1 2-2h4" />
      <Stroke d="M28 10V6a2 2 0 0 0-2-2h-4" />
      <Stroke d="M4 22v4a2 2 0 0 0 2 2h4" />
      <Stroke d="M28 22v4a2 2 0 0 1-2 2h-4" />
      <Stroke d="M4 16h24" />
    </>
  ),
}

export function Phone({ className = '', size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...base}
      strokeWidth={1.7}
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.4 4.6 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3z" />
    </svg>
  )
}

export function Arrow({ className = '', size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...base}
      strokeWidth={1.7}
    >
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </svg>
  )
}

export function Star({ className = '', size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z"
      />
    </svg>
  )
}

/** Animated tick used by the credentials checklist. */
export function CheckDraw({ className = '', size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" {...base} strokeWidth={2.2}>
      <motion.path
        d="M5 12.5 10 17.5 19.5 7"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        }}
      />
    </svg>
  )
}

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
const mk = (d) => function Icon({ className = '', size = 16 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" {...line}>{d}</svg>
}
export const Upload = mk(<><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" /><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" /></>)
export const Sparkle = mk(<><path d="M12 3.5 13.8 9a2 2 0 0 0 1.2 1.2l5.5 1.8-5.5 1.8a2 2 0 0 0-1.2 1.2L12 20.5 10.2 15A2 2 0 0 0 9 13.8L3.5 12 9 10.2A2 2 0 0 0 10.2 9z" /></>)
export const Lock = mk(<><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>)
export const Mail = mk(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>)
export const Pin = mk(<><path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>)
export const Check = mk(<path d="m5 12.5 4.5 4.5L19 7.5" />)
export const Close = mk(<path d="M6 6l12 12M18 6 6 18" />)
export const ChevronLeft = mk(<path d="M15 6l-6 6 6 6" />)
export const ChevronRight = mk(<path d="M9 6l6 6-6 6" />)
export const Plus = mk(<path d="M12 5v14M5 12h14" />)
