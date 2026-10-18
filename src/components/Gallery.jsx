import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GALLERY } from '../lib/site.js'
import { useScrollLock } from '../lib/hooks.js'
import Img from '../ui/Img.jsx'
import { KineticHeading, Reveal } from '../ui/Motion.jsx'
import { ChevronLeft, ChevronRight, Close } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

function Lightbox({ index, onClose, onStep }) {
  const item = GALLERY[index]
  useScrollLock(true)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  const stop = (e) => e.stopPropagation()
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={item.caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-void/95 p-4 backdrop-blur-md">
      <motion.img key={index} src={item.img.src} alt={item.caption} onClick={stop} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="max-h-[76vh] w-auto rounded-[14px] object-contain" />
      <p onClick={stop} className="mt-5 max-w-lg text-center text-[14px] text-fog/85">{item.caption}</p>
      <div onClick={stop} className="mt-5 flex items-center gap-3">
        <button onClick={() => onStep(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:border-dy"><ChevronLeft size={18} /></button>
        <span className="min-w-[56px] text-center font-display text-[14px] text-dim">{index + 1} / {GALLERY.length}</span>
        <button onClick={() => onStep(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:border-dy"><ChevronRight size={18} /></button>
      </div>
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Close size={18} /></button>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const step = useCallback((d) => setOpen((i) => (i + d + GALLERY.length) % GALLERY.length), [])
  return (
    <section id="gallery" className="relative bg-paper py-20 text-ink sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal><p className="label mb-4 !text-dy-deep">Gallery</p></Reveal>
            <KineticHeading lines={['See our', 'latest work.']} className="display-lg text-ink" />
            <Ruler className="mt-6" light />
          </div>
          <Reveal delay={0.1}><p className="lede max-w-md text-ink/70">Some of our recent renovation projects. We believe in delivering work that speaks for itself.</p></Reveal>
        </div>
        <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {GALLERY.map((g, i) => (
            <button key={g.caption} onClick={() => setOpen(i)} aria-label={`View: ${g.caption}`}
              className="group relative mb-3 block w-full overflow-hidden rounded-[16px] text-left sm:mb-4">
              <Img image={g.img} alt={g.caption} sizes="(min-width: 1024px) 33vw, 50vw" className="w-full"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-void/85 to-transparent p-3 pt-10 text-[12px] leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-4 sm:text-[13px]">
                {g.caption}
              </span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />}</AnimatePresence>
    </section>
  )
}
