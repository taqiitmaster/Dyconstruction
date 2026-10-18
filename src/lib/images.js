/**
 * Every asset goes through the bundler so the single-file build can inline it.
 * 800w variants feed srcset in the normal build only; __SOLO__ collapses SMALL
 * to {} there so Rollup drops them and no photo is inlined twice.
 */
import { IMAGE_META } from './imageMeta.js'
import logo from '../assets/images/logo.png'
import logoNav from '../assets/images/logo-nav.png'
import bathroomEnsuite from '../assets/images/bathroom-ensuite.jpg'
import bathroomOak from '../assets/images/bathroom-oak.jpg'
import bathroomSubway from '../assets/images/bathroom-subway.jpg'
import bathroomWalkin from '../assets/images/bathroom-walkin.jpg'
import heroBathroom from '../assets/images/hero-bathroom.jpg'
import joineryBarAngle from '../assets/images/joinery-bar-angle.jpg'
import joineryBarDetail from '../assets/images/joinery-bar-detail.jpg'
import joineryBarWide from '../assets/images/joinery-bar-wide.jpg'
import kitchenIsland from '../assets/images/kitchen-island.jpg'
import kitchenWhite from '../assets/images/kitchen-white.jpg'
import sample1After from '../assets/images/sample1-after.webp'
import sample1Before from '../assets/images/sample1-before.jpeg'
import sample2After from '../assets/images/sample2-after.webp'
import sample2Before from '../assets/images/sample2-before.webp'
import sample3After from '../assets/images/sample3-after.jpeg'
import sample3Before from '../assets/images/sample3-before.jpeg'
import bathroomEnsuite800 from '../assets/images/bathroom-ensuite-800.jpg'
import bathroomOak800 from '../assets/images/bathroom-oak-800.jpg'
import bathroomSubway800 from '../assets/images/bathroom-subway-800.jpg'
import bathroomWalkin800 from '../assets/images/bathroom-walkin-800.jpg'
import heroBathroom800 from '../assets/images/hero-bathroom-800.jpg'
import joineryBarAngle800 from '../assets/images/joinery-bar-angle-800.jpg'
import joineryBarDetail800 from '../assets/images/joinery-bar-detail-800.jpg'
import joineryBarWide800 from '../assets/images/joinery-bar-wide-800.jpg'
import kitchenIsland800 from '../assets/images/kitchen-island-800.jpg'
import sample1After800 from '../assets/images/sample1-after-800.webp'
import sample2After800 from '../assets/images/sample2-after-800.webp'
import sample2Before800 from '../assets/images/sample2-before-800.webp'

const SMALL = __SOLO__
  ? {}
  : {
      bathroomEnsuite: bathroomEnsuite800,
      bathroomOak: bathroomOak800,
      bathroomSubway: bathroomSubway800,
      bathroomWalkin: bathroomWalkin800,
      heroBathroom: heroBathroom800,
      joineryBarAngle: joineryBarAngle800,
      joineryBarDetail: joineryBarDetail800,
      joineryBarWide: joineryBarWide800,
      kitchenIsland: kitchenIsland800,
      sample1After: sample1After800,
      sample2After: sample2After800,
      sample2Before: sample2Before800,
    }

const build = (key, file, src) => {
  const small = SMALL[key]
  const m = IMAGE_META[file]
  return { src, srcSet: small ? `${small} 800w, ${src} ${m.w}w` : undefined, width: m.w, height: m.h, lqip: m.lqip }
}

export const LOGO = logo
export const LOGO_NAV = logoNav

export const IMG = {
  bathroomEnsuite: build('bathroomEnsuite', 'bathroom-ensuite.jpg', bathroomEnsuite),
  bathroomOak: build('bathroomOak', 'bathroom-oak.jpg', bathroomOak),
  bathroomSubway: build('bathroomSubway', 'bathroom-subway.jpg', bathroomSubway),
  bathroomWalkin: build('bathroomWalkin', 'bathroom-walkin.jpg', bathroomWalkin),
  heroBathroom: build('heroBathroom', 'hero-bathroom.jpg', heroBathroom),
  joineryBarAngle: build('joineryBarAngle', 'joinery-bar-angle.jpg', joineryBarAngle),
  joineryBarDetail: build('joineryBarDetail', 'joinery-bar-detail.jpg', joineryBarDetail),
  joineryBarWide: build('joineryBarWide', 'joinery-bar-wide.jpg', joineryBarWide),
  kitchenIsland: build('kitchenIsland', 'kitchen-island.jpg', kitchenIsland),
  kitchenWhite: build('kitchenWhite', 'kitchen-white.jpg', kitchenWhite),
  sample1After: build('sample1After', 'sample1-after.webp', sample1After),
  sample1Before: build('sample1Before', 'sample1-before.jpeg', sample1Before),
  sample2After: build('sample2After', 'sample2-after.webp', sample2After),
  sample2Before: build('sample2Before', 'sample2-before.webp', sample2Before),
  sample3After: build('sample3After', 'sample3-after.jpeg', sample3After),
  sample3Before: build('sample3Before', 'sample3-before.jpeg', sample3Before),
}
