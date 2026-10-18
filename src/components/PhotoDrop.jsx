import { useId, useRef, useState } from 'react'
import { checkPhoto, MAX_PHOTO_MB, useDesign } from '../lib/design.jsx'
import { Upload } from '../ui/Icons.jsx'

/**
 * Drag-and-drop / tap-to-choose photo picker. `accept="image/*"` without
 * `capture` lets phones offer both the camera and the photo library, which is
 * what a homeowner standing in their bathroom actually wants.
 */
export default function PhotoDrop({ compact = false, onPicked, className = '' }) {
  const { photo, setPhoto } = useDesign()
  const [over, setOver] = useState(false)
  const [error, setError] = useState('')
  const input = useRef(null)
  const id = useId()

  const take = (file) => {
    const msg = checkPhoto(file)
    setError(msg)
    if (msg) return
    setPhoto(file)
    onPicked?.(file)
  }

  return (
    <div className={className}>
      <label
        htmlFor={id}
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files?.[0]) }}
        className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[18px] border border-dashed text-center transition-colors duration-200 ${
          over ? 'border-dy bg-dy/10' : 'border-white/20 bg-white/[0.025] hover:border-dy/70 hover:bg-dy/[0.05]'
        } ${compact ? 'px-5 py-7' : 'min-h-[260px] px-6 py-10'}`}
      >
        {photo && !compact ? (
          <>
            <img src={photo.url} alt="Your room" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
            <span className="relative mt-auto flex w-full items-center justify-between gap-3 text-left">
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold text-white">Photo added</span>
                <span className="block truncate text-[13px] text-fog/75">{photo.name}</span>
              </span>
              <span className="shrink-0 rounded-full bg-white/15 px-4 py-2 font-display text-[13px] text-white backdrop-blur-md transition-colors group-hover:bg-white/25">Replace</span>
            </span>
          </>
        ) : (
          <>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-dy/15 text-dy transition-transform duration-300 group-hover:-translate-y-0.5">
              <Upload size={24} />
            </span>
            <span className="mt-4 font-display text-[16px] font-semibold text-white">
              {compact ? 'Upload a photo of your room' : 'Add a photo of your room'}
            </span>
            <span className="mt-1.5 text-[14px] text-fog/70">
              Drag it here, or <span className="text-dy underline decoration-dy/40 underline-offset-4">choose a photo</span>
            </span>
            {!compact && <span className="mt-3 text-[12px] text-dim">JPG, PNG or HEIC, up to {MAX_PHOTO_MB} MB. Your photo stays on your device until you send it.</span>}
          </>
        )}
        <input ref={input} id={id} type="file" accept="image/*" className="sr-only"
          onChange={(e) => { take(e.target.files?.[0]); e.target.value = '' }} />
      </label>
      <p aria-live="polite" className={`text-[13px] text-dy-glow ${error ? 'mt-2' : ''}`}>{error}</p>
    </div>
  )
}
