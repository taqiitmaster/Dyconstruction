import { BRAND, NAV, SERVICES } from '../lib/site.js'
import { LOGO } from '../lib/images.js'
import { scrollToId } from '../lib/hooks.js'

export default function Footer() {
  return (
    <footer className="relative bg-void pb-24 pt-16 lg:pb-8">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={LOGO} alt={BRAND.name} width={352} height={300} loading="lazy" className="h-24 w-auto" />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-fog/60">
              We provide home improvement and renovation work, with the quality and care we bring to every project.
            </p>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-display text-[15px] font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-fog/70">
              {SERVICES.map((s) => <li key={s.id}><button onClick={() => scrollToId('services')} className="text-left hover:text-dy">{s.title}</button></li>)}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="font-display text-[15px] font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {NAV.map((l) => (
                <li key={l.label}>
                  {l.active
                    ? <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId('top') }} className="text-fog/80 hover:text-dy">{l.label}</a>
                    : <span aria-disabled="true" title="Coming soon" className="cursor-not-allowed text-fog/35">{l.label}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-display text-[15px] font-semibold text-white">Contact us</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li><a href={BRAND.phoneHref} className="font-display text-lg font-semibold text-white hover:text-dy">{BRAND.phone}</a></li>
              <li><a href={BRAND.emailHref} className="break-all text-fog/80 hover:text-dy">{BRAND.email}</a></li>
              <li className="text-fog/60">Throughout North Melbourne</li>
            </ul>
          </div>
        </div>
        <p className="pt-7 text-[13px] text-fog/45">© {new Date().getFullYear()} DY Construction. All rights reserved.</p>
      </div>
      {/* Studio credit — the last line on the page. */}
      <div className="mt-8 border-t border-white/10 pt-6 text-center">
        <p className="font-display text-[14px] text-fog/60">Designed and developed by <span className="font-semibold text-white">Inphint</span></p>
      </div>
    </footer>
  )
}
