import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SERVICES } from '../lib/site.js'
import { scrollToId } from '../lib/hooks.js'
import Img from '../ui/Img.jsx'
import { KineticHeading, Reveal } from '../ui/Motion.jsx'
import { DrawIcon, ICON_PATHS, Plus } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

/**
 * His current site's accordion, rebuilt: the list on the left opens one service
 * at a time, and the photo of DY's own work for that service crossfades in on
 * the right. On phones the photo sits inside the open panel instead.
 */
export default function Services() {
  const [open, setOpen] = useState(SERVICES[0].id)
  const reduce = useReducedMotion()
  const active = SERVICES.find((s) => s.id === open) ?? SERVICES[0]

  return (
    <section id="services" className="relative bg-void py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><p className="label mb-4">Our services</p></Reveal>
            <KineticHeading lines={['Our specialised', 'renovation services.']} className="display-lg text-white" />
            <Ruler className="mt-6" />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede text-fog/75">
              DY Construction is your go-to partner for kitchen and bathroom renovations in Melbourne. Our professional
              team works with you every step of the way.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-6">
            {SERVICES.map((s) => {
              const isOpen = s.id === open
              return (
                <li key={s.id} className="border-b border-white/10">
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`svc-${s.id}`} onClick={() => setOpen(s.id)}
                      className="group flex w-full items-center gap-4 py-6 text-left">
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] transition-colors ${isOpen ? 'bg-dy text-void' : 'bg-white/5 text-fog/70 group-hover:text-white'}`}>
                        <DrawIcon size={22} draw={false}>{ICON_PATHS[s.icon]}</DrawIcon>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block font-display text-[1.15rem] font-semibold tracking-tight transition-colors sm:text-[1.3rem] ${isOpen ? 'text-white' : 'text-fog/80 group-hover:text-white'}`}>{s.title}</span>
                        <span className="mt-0.5 block text-[14px] text-dim">{s.tagline}</span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={`shrink-0 ${isOpen ? 'text-dy' : 'text-dim'}`}><Plus size={20} /></motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`svc-${s.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="pb-7 pl-[60px]">
                          <p className="text-[15px] leading-relaxed text-fog/75">{s.body}</p>
                          <div className="mt-5 overflow-hidden rounded-[16px] lg:hidden">
                            <Img image={s.image} alt={s.alt} ratio="4 / 3" sizes="92vw" position={s.position} />
                          </div>
                          <button onClick={() => scrollToId('design')} className="mt-5 font-display text-[14px] font-semibold text-dy underline decoration-dy/40 underline-offset-[6px] hover:decoration-dy">
                            Design and quote your {s.id === 'carpentry' ? 'joinery' : s.id === 'interior' ? 'renovation' : s.id}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="relative hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] border border-white/10 bg-coal-800">
              <AnimatePresence initial={false}>
                <motion.div key={active.id} initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
                  <Img image={active.image} alt={active.alt} ratio="auto" sizes="45vw" className="h-full w-full" position={active.position} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-6 pt-20">
                <p className="text-[13px] text-fog/80">A DY Construction {active.id === 'carpentry' ? 'joinery' : active.id} project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
