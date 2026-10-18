import { BRAND, SERVICE_AREAS } from '../lib/site.js'
import { scrollToId } from '../lib/hooks.js'
import MagneticButton from '../ui/Button.jsx'
import { KineticHeading, Reveal } from '../ui/Motion.jsx'
import { Mail, Phone, Pin } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

export default function Areas() {
  return (
    <section id="contact" className="relative bg-coal-900 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><p className="label mb-4">Service area</p></Reveal>
          <KineticHeading lines={['All throughout', 'North Melbourne.']} className="display-lg text-white" />
          <Ruler className="mt-6" />
          <Reveal delay={0.1}>
            <p className="lede mt-6 text-fog/75">Ready to get started on your kitchen or bathroom renovation? Get in touch for a free quote and take the first step towards your dream home.</p>
            <ul className="mt-8 space-y-4 text-[15px]">
              <li><a href={BRAND.phoneHref} className="flex items-center gap-3 font-display text-xl font-semibold text-white hover:text-dy"><span className="grid h-10 w-10 place-items-center rounded-full bg-dy text-void"><Phone size={17} /></span>{BRAND.phone}</a></li>
              <li><a href={BRAND.emailHref} className="flex items-center gap-3 break-all text-fog hover:text-dy"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-dy"><Mail size={17} /></span>{BRAND.email}</a></li>
            </ul>
            <MagneticButton size="lg" className="mt-9" onClick={() => scrollToId('design')}>Get a free quote</MagneticButton>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="panel rounded-[22px] p-6 sm:p-8">
            <p className="flex items-center gap-2 text-[14px] text-dim"><Pin size={16} className="text-dy" /> Including, but not limited to</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((a) => (
                <li key={a} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-display text-[14px] text-white transition-colors hover:border-dy/60">{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
