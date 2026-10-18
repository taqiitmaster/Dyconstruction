import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BRAND, BUDGETS, FEATURES, PALETTES, ROOM_TYPES, SERVICE_AREAS, STYLES, TIMINGS } from '../lib/site.js'
import { useDesign } from '../lib/design.jsx'
import { burstConfetti } from '../lib/confetti.js'
import PhotoDrop from './PhotoDrop.jsx'
import MagneticButton from '../ui/Button.jsx'
import { Aurora } from '../ui/Atmosphere.jsx'
import { KineticHeading, Reveal } from '../ui/Motion.jsx'
import { DrawIcon, ICON_PATHS, Lock, Phone, Sparkle } from '../ui/Icons.jsx'
import Ruler from '../ui/Ruler.jsx'

/**
 * Design-and-quote flow — the conversion centrepiece, placed second on the page.
 *
 *   1 Your room   room type + a photo of it
 *   2 Your style  style, features and palette as tappable keywords
 *   3 Visualise   their photo beside the AI redesign slot (generation disabled
 *                 in this demo — the button is shown, locked, and labelled)
 *   4 Details     contact details, budget and timing, then "send for quote"
 *
 * The keywords are assembled live into a one-line design brief. That sentence
 * is what the AI visualiser will eventually be prompted with, and it is what
 * the business receives with the quote request — so the flow is useful today,
 * before any AI is connected.
 *
 * Front end only: nothing is uploaded or sent.
 */

const STEPS = ['Your room', 'Your style', 'Visualise', 'Your details']
const MAX_STYLES = 2
const MAX_FEATURES = 5

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const phoneOk = (v) => v.replace(/\D/g, '').length >= 8
const PROPER_STYLES = new Set(['Hamptons', 'Japandi', 'Scandinavian'])
const listJoin = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`)

export function buildBrief({ room, styles, features, palette, notes }) {
  const roomName = ROOM_TYPES.find((r) => r.id === room)?.title.toLowerCase() ?? 'room'
  // Proper-noun styles keep their capital: "a Japandi bathroom", not "a japandi bathroom".
  const styleWord = (s) => (PROPER_STYLES.has(s) ? s : s.toLowerCase())
  const style = styles.length ? `${listJoin(styles.map(styleWord))} ` : ''
  const feat = features.length ? ` with ${listJoin(features.map((f) => f.toLowerCase()))}` : ''
  const pal = PALETTES.find((p) => p.id === palette)
  const palText = pal ? `, in a ${pal.title.toLowerCase()} palette` : ''
  const article = /^[aeiou]/i.test(style || roomName) ? 'An' : 'A'
  const base = `${article} ${style}${roomName}${feat}${palText}.`
  return notes.trim() ? `${base} ${notes.trim()}` : base
}

/* ---------- small building blocks ---------- */

function Chip({ selected, onClick, children, disabled }) {
  return (
    <button type="button" role="checkbox" aria-checked={selected} onClick={onClick} disabled={disabled && !selected}
      className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-200 ${
        selected ? 'border-dy bg-dy text-void shadow-[0_8px_24px_-12px_rgba(58,182,251,.9)]'
          : 'border-white/12 bg-white/[0.03] text-fog hover:border-white/30 hover:text-white disabled:opacity-35 disabled:hover:border-white/12'
      }`}>
      {children}
    </button>
  )
}

function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-[13px] text-fog/80">{label}{hint && <span className="text-dim">{hint}</span>}</span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-dy-glow">{error}</span>}
    </label>
  )
}

const inputCls = 'w-full rounded-[12px] border border-white/12 bg-void/70 px-4 py-3 text-[15px] text-white placeholder:text-dim transition-colors focus:border-dy focus:outline-none'

function StepRail({ step }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Progress">
      {STEPS.map((s, i) => (
        <li key={s} className="min-w-0">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-dy" initial={false} animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }}
              transition={{ type: 'spring', stiffness: 140, damping: 24 }} />
          </div>
          <p className={`mt-2 truncate text-[12px] sm:text-[13px] ${i === step ? 'text-white' : 'text-dim'}`} aria-current={i === step ? 'step' : undefined}>
            <span className="font-display">{i + 1}</span><span className="hidden sm:inline"> {s}</span>
          </p>
        </li>
      ))}
    </ol>
  )
}

/** Their room beside the slot the AI redesign will fill. No fake output. */
function Visualiser({ photo, brief }) {
  return (
    <div>
      <div className="grid overflow-hidden rounded-[18px] border border-white/10 sm:grid-cols-2">
        <figure className="relative aspect-[4/3] bg-coal-800">
          {photo ? (
            <img src={photo.url} alt="Your room as it is now" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center text-[14px] text-dim">No photo added. Go back a step to add one and see it redesigned.</div>
          )}
          <figcaption className="absolute left-3 top-3 rounded-full bg-void/75 px-3 py-1 text-[12px] text-white backdrop-blur-md">Your room</figcaption>
        </figure>
        <figure className="blueprint relative aspect-[4/3] overflow-hidden border-t border-white/10 bg-coal-900 sm:border-l sm:border-t-0">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-dy/10 to-transparent" />
          <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-dy/40 bg-dy/10 text-dy"><Sparkle size={22} /></span>
            <p className="mt-4 font-display text-[16px] font-semibold text-white">Your redesign appears here</p>
            <p className="mt-1.5 max-w-[16rem] text-[13px] leading-relaxed text-dim">The AI visualiser restyles this exact room using your brief.</p>
          </div>
          <figcaption className="absolute left-3 top-3 rounded-full bg-dy px-3 py-1 text-[12px] font-medium text-void">AI redesign</figcaption>
        </figure>
      </div>

      <div className="mt-5 rounded-[14px] border border-white/10 bg-void/50 p-4 sm:p-5">
        <p className="text-[13px] text-dim">Your design brief</p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white">“{brief}”</p>
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        {/* Shown, locked and labelled: generation isn't connected in this demo. */}
        <span className="group relative" tabIndex={0} aria-describedby="ai-soon">
          <button type="button" disabled aria-disabled="true"
            className="inline-flex h-12 cursor-not-allowed items-center gap-2.5 rounded-full border border-dy/40 bg-dy/10 px-6 font-display text-[14px] font-semibold text-dy/70">
            <Sparkle size={17} /> Generate my design <Lock size={14} />
          </button>
          <span role="tooltip" className="pointer-events-none absolute -top-11 left-0 whitespace-nowrap rounded-md bg-coal-600 px-3 py-1.5 text-[12px] text-fog opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus:opacity-100">
            AI visualiser launching soon
          </span>
        </span>
        <p id="ai-soon" className="text-[13px] text-dim">AI visualiser launching soon. Your brief and photo still go with your quote.</p>
      </div>
    </div>
  )
}

/* ---------- the section ---------- */

export default function DesignQuote() {
  const reduce = useReducedMotion()
  const { photo, room, setRoom } = useDesign()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [skipPhoto, setSkipPhoto] = useState(false)
  const [touched, setTouched] = useState(false)
  const [styles, setStyles] = useState([])
  const [features, setFeatures] = useState([])
  const [palette, setPalette] = useState('')
  const [notes, setNotes] = useState('')
  const [f, setF] = useState({ name: '', phone: '', email: '', suburb: '', budget: '', timing: '' })
  const panelRef = useRef(null)
  const canvasRef = useRef(null)

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))
  const toggle = (list, setList, max) => (item) =>
    setList(list.includes(item) ? list.filter((x) => x !== item) : list.length < max ? [...list, item] : list)

  // Switching room type clears features that only made sense for the old room.
  useEffect(() => { setFeatures((fs) => fs.filter((x) => (FEATURES[room] ?? []).includes(x))) }, [room])

  const brief = useMemo(() => buildBrief({ room, styles, features, palette, notes }), [room, styles, features, palette, notes])

  const check = () => {
    if (step === 0) {
      if (!room) return 'Choose which room you’re renovating.'
      if (!photo && !skipPhoto) return 'Add a photo of your room, or continue without one.'
    }
    if (step === 1 && !styles.length && !features.length) return 'Pick at least one style or feature so we know the look you’re after.'
    if (step === 3) {
      if (!f.name.trim()) return 'Add your name so we know who to ask for.'
      if (!phoneOk(f.phone)) return 'Add a phone number with at least 8 digits.'
      if (!emailOk(f.email)) return 'Add a valid email address, like name@example.com.'
    }
    return ''
  }

  const goTo = (n) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    setError('')
    setTouched(false)
    // On phones the panel's height changes a lot between steps; keep its top in view.
    const el = panelRef.current
    if (el && el.getBoundingClientRect().top < 70) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  const next = () => {
    setTouched(true)
    const msg = check()
    if (msg) return setError(msg)
    if (step === 3) { setError(''); setDone(true); return }
    goTo(step + 1)
  }

  useEffect(() => { if (done && !reduce && canvasRef.current) burstConfetti(canvasRef.current) }, [done, reduce])

  const slide = {
    enter: (d) => ({ opacity: 0, x: reduce ? 0 : d * 36 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d * -36 }),
  }

  const roomTitle = ROOM_TYPES.find((r) => r.id === room)?.title

  return (
    <section id="design" className="relative isolate overflow-hidden bg-coal-900 py-20 sm:py-28">
      <Aurora />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal><p className="label mb-4">Design and quote</p></Reveal>
          <KineticHeading lines={['Design your room.', 'We’ll quote it.']} className="display-lg text-white" />
          <Ruler className="mt-6" />
          <Reveal delay={0.1}>
            <p className="lede mt-6 text-fog/80">
              Upload a photo of your bathroom or kitchen, choose the look you want in a few taps, and send it
              straight to our team for a free quote.
            </p>
            {/* Desktop only: on phones the form itself should come straight after the intro. */}
            <ol className="mt-8 hidden space-y-4 lg:block">
              {[['Snap your room', 'A phone photo of the space as it is today.'], ['Pick your look', 'Styles, features and colours. No design skills needed.'], ['Get it quoted', 'We price your design and get back to you.']].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-dy/40 font-display text-[13px] font-semibold text-dy">{i + 1}</span>
                  <span><span className="block font-display text-[15px] font-semibold text-white">{t}</span><span className="block text-[14px] text-dim">{b}</span></span>
                </li>
              ))}
            </ol>
            <p className="mt-8 hidden border-t border-white/10 pt-6 text-[14px] text-dim lg:block">
              Rather talk it through?{' '}
              <a href={BRAND.phoneHref} className="inline-flex items-center gap-1.5 font-display font-semibold text-white hover:text-dy"><Phone size={14} />{BRAND.phone}</a>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div ref={panelRef} className="panel relative overflow-hidden rounded-[24px] p-5 sm:p-8">
            <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

            {done ? (
              <div role="status" className="py-6 text-center sm:py-10">
                {photo && (
                  <div className="mx-auto mb-6 h-28 w-40 overflow-hidden rounded-[14px] border border-white/10">
                    <img src={photo.url} alt="Your room" className="h-full w-full object-cover" />
                  </div>
                )}
                <svg viewBox="0 0 64 64" width="64" height="64" className="mx-auto" aria-hidden="true">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(58,182,251,.25)" strokeWidth="2" />
                  <motion.path d="M19 33.5 28 42.5 46 23" fill="none" stroke="#3AB6FB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.15 }} />
                </svg>
                <h3 className="display-md mt-5 text-white">Design sent for quoting</h3>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-fog/80">
                  Thanks {f.name.trim().split(' ')[0]}. The DY team has your {roomTitle?.toLowerCase()} brief{photo ? ' and photo' : ''}, and will be in touch on {f.phone} to talk through your quote.
                </p>
                <p className="mx-auto mt-5 max-w-lg rounded-[14px] border border-white/10 bg-void/50 p-4 text-left text-[14px] text-fog">“{brief}”</p>
                <p className="mt-6 text-[12px] text-dim">This is a demo — nothing has been sent.</p>
              </div>
            ) : (
              <>
                <StepRail step={step} />
                <div className="relative mt-8 min-h-[360px]">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
                      {step === 0 && (
                        <div className="space-y-7">
                          <fieldset>
                            <legend className="display-md mb-4 text-white">Which room are you renovating?</legend>
                            <div role="radiogroup" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                              {ROOM_TYPES.map((r) => (
                                <button key={r.id} type="button" role="radio" aria-checked={room === r.id} onClick={() => setRoom(r.id)}
                                  className={`flex flex-col items-center gap-2 rounded-[14px] border px-3 py-4 transition-all ${room === r.id ? 'border-dy bg-dy/12 text-white shadow-[0_0_0_1px_rgba(58,182,251,.45)]' : 'border-white/10 bg-white/[0.03] text-fog hover:border-white/25'}`}>
                                  <DrawIcon size={28} draw={false} className={room === r.id ? 'text-dy' : 'text-fog/70'}>{ICON_PATHS[r.icon]}</DrawIcon>
                                  <span className="font-display text-[14px] font-medium">{r.title}</span>
                                </button>
                              ))}
                            </div>
                          </fieldset>
                          <div>
                            <p className="mb-3 font-display text-[15px] font-semibold text-white">A photo of it as it is now</p>
                            <PhotoDrop onPicked={() => setSkipPhoto(false)} />
                            {!photo && (
                              <label className="mt-3 inline-flex cursor-pointer items-center gap-2.5 text-[14px] text-dim hover:text-fog">
                                <input type="checkbox" checked={skipPhoto} onChange={(e) => setSkipPhoto(e.target.checked)} className="h-4 w-4 accent-[#3AB6FB]" />
                                No photo handy? Continue without one
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="space-y-7">
                          <fieldset>
                            <legend className="display-md mb-1 text-white">What style do you love?</legend>
                            <p className="mb-4 text-[13px] text-dim">Choose up to {MAX_STYLES}.</p>
                            <div className="flex flex-wrap gap-2">
                              {STYLES.map((s) => <Chip key={s} selected={styles.includes(s)} disabled={styles.length >= MAX_STYLES} onClick={() => toggle(styles, setStyles, MAX_STYLES)(s)}>{s}</Chip>)}
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend className="display-md mb-1 text-white">Must-have features</legend>
                            <p className="mb-4 text-[13px] text-dim">Choose up to {MAX_FEATURES}.</p>
                            <div className="flex flex-wrap gap-2">
                              {(FEATURES[room] ?? FEATURES.other).map((s) => <Chip key={s} selected={features.includes(s)} disabled={features.length >= MAX_FEATURES} onClick={() => toggle(features, setFeatures, MAX_FEATURES)(s)}>{s}</Chip>)}
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend className="display-md mb-4 text-white">Colour palette</legend>
                            <div role="radiogroup" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                              {PALETTES.map((p) => (
                                <button key={p.id} type="button" role="radio" aria-checked={palette === p.id} onClick={() => setPalette(palette === p.id ? '' : p.id)}
                                  className={`rounded-[14px] border p-3 text-left transition-all ${palette === p.id ? 'border-dy bg-dy/10 shadow-[0_0_0_1px_rgba(58,182,251,.45)]' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}>
                                  <span className="flex h-8 overflow-hidden rounded-[8px]">{p.swatch.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}</span>
                                  <span className="mt-2.5 block text-[13px] text-white">{p.title}</span>
                                </button>
                              ))}
                            </div>
                          </fieldset>
                          <Field label="Anything else?" hint={`${notes.length} of 200`}>
                            <textarea className={`${inputCls} min-h-[84px] resize-y`} maxLength={200} value={notes} onChange={(e) => setNotes(e.target.value)}
                              placeholder="e.g. keep the window where it is, more storage, a bath for the kids" />
                          </Field>
                          <div className="rounded-[14px] border border-dy/25 bg-dy/[0.06] p-4">
                            <p className="flex items-center gap-2 text-[13px] text-dy"><Sparkle size={14} /> Your design brief so far</p>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-white">“{brief}”</p>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h3 className="display-md mb-5 text-white">See it before it’s built</h3>
                          <Visualiser photo={photo} brief={brief} />
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-5">
                          <h3 className="display-md mb-1 text-white">Where should we send your quote?</h3>
                          <Field label="Name" error={touched && !f.name.trim() ? 'Required' : ''}>
                            <input className={inputCls} value={f.name} onChange={set('name')} autoComplete="name" />
                          </Field>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Phone" error={touched && !phoneOk(f.phone) ? 'At least 8 digits' : ''}>
                              <input className={inputCls} type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
                            </Field>
                            <Field label="Email" error={touched && !emailOk(f.email) ? 'Check the format' : ''}>
                              <input className={inputCls} type="email" inputMode="email" value={f.email} onChange={set('email')} autoComplete="email" />
                            </Field>
                          </div>
                          <Field label="Suburb" hint="Optional">
                            <input className={inputCls} list="dy-suburbs" value={f.suburb} onChange={set('suburb')} autoComplete="address-level2" placeholder="e.g. Reservoir" />
                            <datalist id="dy-suburbs">{SERVICE_AREAS.map((s) => <option key={s} value={s} />)}</datalist>
                          </Field>
                          <fieldset>
                            <legend className="mb-2.5 text-[13px] text-fog/80">Rough budget <span className="text-dim">(optional)</span></legend>
                            <div className="flex flex-wrap gap-2">{BUDGETS.map((b) => <Chip key={b} selected={f.budget === b} onClick={() => setF((v) => ({ ...v, budget: v.budget === b ? '' : b }))}>{b}</Chip>)}</div>
                          </fieldset>
                          <fieldset>
                            <legend className="mb-2.5 text-[13px] text-fog/80">When would you like to start? <span className="text-dim">(optional)</span></legend>
                            <div className="flex flex-wrap gap-2">{TIMINGS.map((b) => <Chip key={b} selected={f.timing === b} onClick={() => setF((v) => ({ ...v, timing: v.timing === b ? '' : b }))}>{b}</Chip>)}</div>
                          </fieldset>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p aria-live="polite" className="mt-5 min-h-[22px] text-[14px] text-dy-glow">{error}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  {step > 0 ? <button onClick={() => goTo(step - 1)} className="rounded-full px-4 py-3 font-display text-[15px] text-fog/80 transition-colors hover:text-white">Back</button> : <span />}
                  <MagneticButton size="lg" onClick={next}>
                    {step === 2 ? 'Continue to my quote' : step === 3 ? 'Send for a free quote' : 'Continue'}
                  </MagneticButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
