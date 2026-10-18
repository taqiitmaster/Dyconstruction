import { PROMISES } from '../lib/site.js'
import { IMG } from '../lib/images.js'
import Img from '../ui/Img.jsx'
import { KineticHeading, Reveal, Stagger, TiltCard } from '../ui/Motion.jsx'
import { DrawIcon, ICON_PATHS } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

export default function WhyUs() {
  return (
    <section className="relative bg-paper py-20 text-ink sm:py-28">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal><p className="label mb-4 !text-dy-deep">Why DY</p></Reveal>
            <KineticHeading lines={['Locally owned and operated,', 'serving Melbourne’s north.']} className="display-lg text-ink" />
            <Ruler className="mt-6" light />
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-xl text-ink/75">
                As a locally owned construction business, we pride ourselves on providing personalised service and
                exceptional craftsmanship. Our team treats every project with care, ensuring your kitchen, bathroom,
                and home renovations are completed to the highest standard.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 overflow-hidden rounded-[20px]">
                <Img image={IMG.joineryBarAngle} alt="Custom black cabinetry with a marble-look benchtop and herringbone splashback" ratio="4 / 5" sizes="(min-width: 1024px) 28vw, 55vw" />
              </div>
              <div className="col-span-2 mt-10 overflow-hidden rounded-[20px]">
                <Img image={IMG.bathroomWalkin} alt="Bathroom with large-format grey tiles and a frameless shower screen" ratio="3 / 5" sizes="(min-width: 1024px) 18vw, 37vw" />
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-3" gap={0.1}>
          {PROMISES.map((p) => (
            <Stagger.Item key={p.title}>
              <TiltCard max={5} className="h-full rounded-[20px]">
                <article className="h-full rounded-[20px] border border-ink/[0.07] bg-white p-7 shadow-[0_24px_50px_-40px_rgba(11,16,22,.5)]">
                  <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-void text-dy">
                    <DrawIcon size={24}>{ICON_PATHS[p.icon]}</DrawIcon>
                  </span>
                  <h3 className="display-md mt-6 text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">{p.body}</p>
                </article>
              </TiltCard>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
