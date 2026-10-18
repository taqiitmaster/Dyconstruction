import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Shared state for the design-and-quote flow.
 *
 * It lives in context so the hero's upload card and the booking section work
 * on the same photo: drop a photo in the hero and it is already loaded when the
 * page scrolls to the visualiser. Nothing leaves the browser — the photo is an
 * object URL, revoked when it is replaced or the page unloads.
 */
const DesignCtx = createContext(null)

export const MAX_PHOTO_MB = 15

export function DesignProvider({ children }) {
  const [photo, setPhotoState] = useState(null) // { url, name, size }
  const [room, setRoom] = useState('')
  const urlRef = useRef(null)

  const setPhoto = useCallback((file) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    if (!file) { urlRef.current = null; setPhotoState(null); return }
    const url = URL.createObjectURL(file)
    urlRef.current = url
    setPhotoState({ url, name: file.name, size: file.size })
  }, [])

  useEffect(() => () => urlRef.current && URL.revokeObjectURL(urlRef.current), [])

  const value = useMemo(() => ({ photo, setPhoto, room, setRoom }), [photo, setPhoto, room])
  return <DesignCtx.Provider value={value}>{children}</DesignCtx.Provider>
}

export const useDesign = () => useContext(DesignCtx)

/** Returns an error message for a picked file, or '' if it is usable. */
export function checkPhoto(file) {
  if (!file) return 'Choose a photo to continue.'
  if (!/^image\//.test(file.type)) return 'That file isn’t an image. Choose a JPG, PNG or HEIC photo.'
  if (file.size > MAX_PHOTO_MB * 1024 * 1024) return `That photo is over ${MAX_PHOTO_MB} MB. Choose a smaller one.`
  return ''
}
