import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BRAND } from '../lib/site.js'
import { IMG } from '../lib/images.js'
import { scrollToId } from '../lib/hooks.js'
import Img from '../ui/Img.jsx'
import MagneticButton from '../ui/Button.jsx'
import { Aurora } from '../ui/Atmosphere.jsx'
import { KineticHeading } from '../ui/Motion.jsx'
import { Check, Phone, Sparkle } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'
import PhotoDrop from './PhotoDrop.jsx'

/**
 * Hero. The right-hand card is a working entry point to the design-and-quote
 * flow: a visitor arriving from an ad can drop a photo of their room straight
 * in, and the page carries them down to the visualiser with it already loaded.
 */
export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14])
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    // `isolate` so the section's own background can't paint over the negatively
    // stacked photo layer inside it.
    <section id="top" ref={ref} className="grain relative isolate overflow-hidden bg-void pb-16 pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <Img image={IMG.heroBathroom} alt="" ratio="auto" priority sizes="100vw" className="h-full w-full" position="center 45%" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,6,7,.96)_0%,rgba(5,6,7,.86)_45%,rgba(5,6,7,.55)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,6,7,.6)_0%,transparent_30%,transparent_70%,#050607_100%)]" />
      <Aurora strong className="-z-10" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.1)} className="label mb-5">Kitchen &amp; bathroom renovations in North Melbourne</motion.p>
          <KineticHeading as="h1" delay={0.15} className="display-xl" lines={['Renovating homes', 'across Melbourne’s', 'north.']} />
          <motion.div {...fade(0.5)}><Ruler className="mt-7" ticks={31} /></motion.div>
          <motion.p {...fade(0.55)} className="lede mt-6 max-w-xl text-fog/85">
            Kitchen, bathroom and full home renovations from a locally owned team — completed on time, within
            budget and to the highest standard.
          </motion.p>
          <motion.div {...fade(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton size="lg" onClick={() => scrollToId('design')}><Sparkle size={17} /> Design my room</MagneticButton>
            <MagneticButton as="a" href={BRAND.phoneHref} variant="outline" size="lg"><Phone /> Call {BRAND.phone}</MagneticButton>
          </motion.div>
          <motion.ul {...fade(0.9)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-fog/80">
            {[`Trusted by ${BRAND.customers}+ customers`, 'No hidden fees', 'Locally owned and operated'].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-dy/15 text-dy"><Check size={12} /></span>{t}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...fade(0.45)} className="lg:col-span-5">
          <div className="panel glass relative rounded-[24px] p-5 sm:p-7">
            {/* Set-square corner marks, from the logo. */}
            <span aria-hidden="true" className="absolute -left-px -top-px h-6 w-6 rounded-tl-[24px] border-l-2 border-t-2 border-dy" />
            <span aria-hidden="true" className="absolute -bottom-px -right-px h-6 w-6 rounded-br-[24px] border-b-2 border-r-2 border-dy" />
            <p className="flex items-center gap-2 font-display text-[13px] font-medium text-dy"><Sparkle size={14} /> New: design it before you build it</p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-white">See your room redesigned, then get it quoted.</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-fog/75">Start with a photo of your bathroom or kitchen as it is today.</p>
            <PhotoDrop compact className="mt-5" onPicked={() => setTimeout(() => scrollToId('design'), 250)} />
            <button onClick={() => scrollToId('design')} className="mt-1 w-full text-center text-[13px] text-dim underline-offset-4 hover:text-fog hover:underline">
              Or start without a photo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
