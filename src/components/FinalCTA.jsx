import { BRAND } from '../lib/site.js'
import { scrollToId } from '../lib/hooks.js'
import MagneticButton from '../ui/Button.jsx'
import { KineticHeading, Reveal } from '../ui/Motion.jsx'
import { Phone, Sparkle } from '../ui/Icons.jsx'

/** The one full-blue band on the page, saved for the close. */
export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-dy py-20 text-void sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_90%_at_88%_10%,rgba(255,255,255,.45),transparent_60%)]" />
      {/* The logo's set square, oversized and faint. */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -right-8 bottom-[-20%] -z-10 h-[150%] text-void/[0.08]">
        <path d="M100 0 0 100h100z M78 46 46 78h32z" fill="currentColor" fillRule="evenodd" />
      </svg>
      <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <KineticHeading lines={['Transform your', 'home today.']} className="display-lg text-void" />
          <Reveal delay={0.1}>
            <p className="lede mt-5 max-w-xl text-void/80">
              Get a free quote and see how our team can bring your kitchen or bathroom renovation to life — on time, on budget, and stress-free.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row">
          <MagneticButton variant="dark" size="lg" onClick={() => scrollToId('design')}><Sparkle size={17} /> Design my room</MagneticButton>
          <MagneticButton as="a" href={BRAND.phoneHref} variant="light" size="lg"><Phone /> {BRAND.phone}</MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
