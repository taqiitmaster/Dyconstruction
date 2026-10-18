import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BRAND, NAV } from '../lib/site.js'
import { LOGO_NAV } from '../lib/images.js'
import { scrollToId, useRafScroll, useScrollLock } from '../lib/hooks.js'
import MagneticButton from '../ui/Button.jsx'
import { Phone } from '../ui/Icons.jsx'

function SoonLink({ label }) {
  return (
    <span aria-disabled="true" className="group relative cursor-not-allowed text-fog/45 transition-colors hover:text-fog/70">
      {label}
      <span className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-coal-600 px-2.5 py-1 text-[11px] text-fog opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        Coming soon
      </span>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useScrollLock(open)
  useRafScroll((y) => setScrolled(y > 30))

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 280 : 0)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] border-b transition-colors duration-500 ${scrolled ? 'glass border-white/[0.07]' : 'border-transparent'}`}>
        <nav className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? 'h-[68px]' : 'h-[84px]'}`}>
          <a href="#top" onClick={(e) => { e.preventDefault(); go('top') }} className="flex items-center gap-3" aria-label={`${BRAND.name}, back to top`}>
            <img src={LOGO_NAV} alt="" width={155} height={132} className={`w-auto transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'}`} />
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-[15px] font-semibold tracking-tight text-white">DY Construction</span>
              <span className="mt-1 block text-[11px] text-dim">Group</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 font-display text-[14px] lg:flex">
            {NAV.map((l) => (
              <li key={l.label}>
                {l.active ? (
                  <a href="#top" onClick={(e) => { e.preventDefault(); go('top') }} className="relative text-white">
                    {l.label}
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-dy" />
                  </a>
                ) : <SoonLink label={l.label} />}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={BRAND.phoneHref} className="flex items-center gap-2 font-display text-[14px] font-medium text-white transition-colors hover:text-dy">
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 text-dy">
                <span aria-hidden="true" className="absolute inset-0 animate-pulsering rounded-full border border-dy/50" />
                <Phone size={15} />
              </span>
              {BRAND.phone}
            </a>
            <MagneticButton size="sm" strength={7} onClick={() => go('design')}>Get a free quote</MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={BRAND.phoneHref} aria-label={`Call ${BRAND.phone}`} className="grid h-10 w-10 place-items-center rounded-full bg-dy text-void">
              <Phone size={16} />
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5">
              <span className="relative block h-3 w-4">
                <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 block h-[1.5px] w-4 bg-white" />
                <motion.span animate={{ opacity: open ? 0 : 1 }} className="absolute left-0 top-[5px] block h-[1.5px] w-4 bg-white" />
                <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="absolute left-0 top-[10px] block h-[1.5px] w-4 bg-white" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] bg-void/97 backdrop-blur-xl lg:hidden">
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <ul>
                {NAV.map((l, i) => (
                  <motion.li key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }} className="border-b border-white/[0.07] py-4">
                    {l.active ? (
                      <a href="#top" onClick={(e) => { e.preventDefault(); go('top') }} className="font-display text-3xl font-semibold text-white">{l.label}</a>
                    ) : (
                      <span className="flex items-baseline justify-between font-display text-3xl font-semibold text-fog/30">
                        {l.label}<span className="text-xs font-normal text-dim">Coming soon</span>
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-3">
                <MagneticButton size="lg" className="w-full" onClick={() => go('design')}>Get a free quote</MagneticButton>
                <MagneticButton as="a" href={BRAND.phoneHref} variant="outline" size="lg" className="w-full"><Phone /> Call {BRAND.phone}</MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
