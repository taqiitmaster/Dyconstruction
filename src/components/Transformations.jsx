import { TRANSFORMATIONS } from '../lib/site.js'
import { scrollToId } from '../lib/hooks.js'
import BeforeAfter from './BeforeAfter.jsx'
import MagneticButton from '../ui/Button.jsx'
import { KineticHeading, Reveal, Stagger } from '../ui/Motion.jsx'
import Ruler from '../ui/Ruler.jsx'

/**
 * Before/after sliders. The photos in TRANSFORMATIONS are samples carried over
 * from another demo — NOT DY's work — so the section labels them on screen.
 * Swap in DY's own pairs in site.js and delete the notice.
 */
export default function Transformations() {
  return (
    <section id="transformations" className="relative isolate overflow-hidden bg-coal-900 py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal><p className="label mb-4">Before and after</p></Reveal>
            <KineticHeading lines={['See the', 'transformation.']} className="display-lg text-white" />
            <Ruler className="mt-6" />
          </div>
          <Reveal delay={0.1} className="max-w-md">
            <p className="lede text-fog/75">Drag across each photo to compare the room before we started with the finished result.</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12px] text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-dy" /> Sample photos shown — DY’s own projects go here
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6" gap={0.12} amount={0.15}>
          {TRANSFORMATIONS.map((p, i) => (
            <Stagger.Item key={p.id}><BeforeAfter project={p} index={i} /></Stagger.Item>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <MagneticButton variant="outline" size="lg" onClick={() => scrollToId('design')}>Start your transformation</MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
