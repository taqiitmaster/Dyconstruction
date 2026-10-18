import { IMG } from '../lib/images.js'
import { BRAND } from '../lib/site.js'
import { scrollToId } from '../lib/hooks.js'
import Img from '../ui/Img.jsx'
import MagneticButton from '../ui/Button.jsx'
import { CountUp, KineticHeading, Reveal } from '../ui/Motion.jsx'
import Ruler from '../ui/Ruler.jsx'

/** "Renovations crafted with precision" — his intro copy, set against his own work. */
export default function Intro() {
  return (
    <section className="relative bg-paper py-20 text-ink sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-[22px]">
            <Img image={IMG.bathroomEnsuite} alt="Renovated ensuite with a framed glass shower, grey floor tiles and a timber-look vanity"
              ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 92vw" />
          </div>
          {/* Dimension line down the photo edge, like a drawing annotation. */}
          <div aria-hidden="true" className="absolute -right-5 top-0 hidden h-full flex-col items-center sm:flex">
            <span className="h-px w-3 bg-ink/40" /><span className="w-px flex-1 bg-ink/25" />
            <span className="my-2 -rotate-90 whitespace-nowrap text-[11px] text-ink/45">Completed in Melbourne’s north</span>
            <span className="w-px flex-1 bg-ink/25" /><span className="h-px w-3 bg-ink/40" />
          </div>
          <div className="absolute -bottom-6 left-5 rounded-[16px] bg-void px-5 py-4 text-white shadow-2xl sm:left-8">
            <p className="font-display text-3xl font-semibold leading-none"><CountUp to={BRAND.customers} suffix="+" /></p>
            <p className="mt-1.5 text-[13px] text-fog/75">customers trust DY</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal><p className="label mb-4 !text-dy-deep">About DY Construction</p></Reveal>
          <KineticHeading lines={['Renovations crafted with', 'precision and perfection.']} className="display-lg text-ink" />
          <Ruler className="mt-6" light />
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-2xl text-ink/75">
              At DY Construction, we specialise in transforming homes with expert kitchen and bathroom renovations. Our
              team is committed to delivering high-quality craftsmanship, tailored to meet your needs. Whether you’re
              looking to refresh your kitchen, remodel your bathroom, or undertake a full renovation, we ensure every
              project is completed to perfection.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {[['Modern', 'Innovative and fresh, DY Construction is redefining home renovations across Melbourne.'], ['Trusted', 'The trusted choice for many in the community.']].map(([t, b], i) => (
              <Reveal key={t} delay={0.15 + i * 0.08}>
                <div className="h-full rounded-[18px] border border-ink/[0.08] bg-white p-6">
                  <p className="font-display text-2xl font-semibold tracking-tight text-ink">{t}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton variant="dark" size="lg" onClick={() => scrollToId('services')}>Explore our services</MagneticButton>
            <MagneticButton size="lg" onClick={() => scrollToId('design')}>Get a free quote</MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
