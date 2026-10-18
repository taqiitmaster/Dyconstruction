import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BRAND } from '../lib/site.js'
import { scrollToId, useRafScroll } from '../lib/hooks.js'
import { Phone } from '../ui/Icons.jsx'

/** Call and quote one tap away on phones, past the hero — hidden over the quote form itself. */
export default function MobileCallBar() {
  const [past, setPast] = useState(false)
  const [inForm, setInForm] = useState(false)
  useRafScroll((y) => setPast(y > window.innerHeight * 0.7))
  useEffect(() => {
    const el = document.getElementById('design')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInForm(e.isIntersecting), { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const show = past && !inForm
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="glass fixed inset-x-3 z-[50] flex gap-2 rounded-[18px] border border-white/10 p-2 lg:hidden" style={{ bottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <a href={BRAND.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-[12px] border border-white/15 py-3 font-display text-[15px] font-semibold text-white"><Phone size={16} /> Call</a>
          <button onClick={() => scrollToId('design')} className="flex-[1.4] rounded-[12px] bg-dy py-3 font-display text-[15px] font-semibold text-void">Get a free quote</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
