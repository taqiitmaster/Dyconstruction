import { BRAND, REVIEWS } from '../lib/site.js'
import { KineticHeading, Reveal, Stagger } from '../ui/Motion.jsx'
import { Star } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

/** The three testimonials from his current site, verbatim. */
export default function Reviews() {
  return (
    <section className="relative bg-void py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal><p className="label mb-4">Reviews</p></Reveal>
            <KineticHeading lines={['What locals', 'are saying.']} className="display-lg text-white" />
            <Ruler className="mt-6" />
          </div>
          <Reveal delay={0.1}><p className="lede max-w-md text-fog/75">Hear from customers who’ve experienced the difference with {BRAND.short}.</p></Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3" gap={0.1}>
          {REVIEWS.map((r) => (
            <Stagger.Item key={r.name}>
              <figure className="panel flex h-full flex-col rounded-[20px] p-7">
                <span className="flex text-dy" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} />)}</span>
                <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-white">“{r.text}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-dy font-display text-[14px] font-semibold text-void">{r.name.charAt(0)}</span>
                  <span className="font-display text-[15px] font-medium text-white">{r.name}</span>
                </figcaption>
              </figure>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
