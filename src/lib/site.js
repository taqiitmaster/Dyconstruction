import { IMG } from './images.js'

/**
 * Every word on the page lives here. Copy comes from the client's current site
 * wherever it exists. Where his site had a heading with no body (three of the
 * four service panels), the body is written plainly and marked below so it can
 * be checked with him.
 */
export const BRAND = {
  name: 'DY Construction Group',
  short: 'DY Construction',
  phone: '1800 980 913',
  phoneHref: 'tel:1800980913',
  email: 'admin@dyconstructiongroup.com.au',
  emailHref: 'mailto:admin@dyconstructiongroup.com.au',
  customers: 200,
}

/** Home is built; the rest render in the nav but don't route yet. */
export const NAV = [
  { label: 'Home', active: true },
  { label: 'About' },
  { label: 'Services' },
  { label: 'Gallery' },
  { label: 'Blog' },
  { label: 'Contact' },
]

export const SERVICES = [
  {
    id: 'kitchen',
    title: 'Kitchen renovations & remodels',
    tagline: 'Creating your ideal kitchen',
    body: 'DY Construction specialises in kitchen renovations, offering expert design and remodel services to suit your lifestyle. From more storage space to modern, stylish designs, we ensure your kitchen is both functional and beautiful. Let us help you design the heart of your home.',
    image: IMG.kitchenIsland,
    position: 'center 78%', // portrait shot — frame the island, not the ceiling
    alt: 'Renovated kitchen with a white island bench, timber stools and timber floors',
    icon: 'kitchen',
  },
  {
    id: 'bathroom',
    title: 'Bathroom renovations & remodels',
    tagline: 'Transform your bathroom',
    // Written for the demo — his site shows this heading without body copy.
    body: 'Full bathroom renovations, from strip-out and waterproofing to tiling, vanities and fit-off. Walk-in showers, new layouts and fresh finishes, all managed by one team.',
    image: IMG.bathroomSubway,
    position: 'center 60%',
    alt: 'Renovated bathroom with white subway tiles, a black vanity and a walk-in shower',
    icon: 'bathroom',
  },
  {
    id: 'carpentry',
    title: 'Custom carpentry & joinery',
    tagline: 'Tailored woodwork for your home',
    // Written for the demo — heading only on his site.
    body: 'Built-in cabinetry, bars, storage and shelving made to fit your space exactly, finished to match the rest of your home.',
    image: IMG.joineryBarDetail,
    alt: 'Custom black shaker cabinetry with a stone benchtop and herringbone tile splashback',
    icon: 'carpentry',
  },
  {
    id: 'interior',
    title: 'Residential interior renovations',
    tagline: 'Complete home makeovers',
    // Written for the demo — heading only on his site.
    body: 'Whole-room and whole-home renovations: layouts, flooring, lighting and finishes brought together into one plan and one price.',
    image: IMG.kitchenWhite,
    position: 'center 70%',
    alt: 'Open-plan renovation with a white kitchen and downlights',
    icon: 'interior',
  },
]

export const PROMISES = [
  { title: 'No hidden fees', body: 'Clear, honest pricing for every project. Absolutely no hidden fees.', icon: 'fees' },
  { title: 'Clear communication from start to finish', body: 'We keep you informed at every stage, from the first visit to handover.', icon: 'comms' },
  { title: 'On-time, on-budget project completion', body: 'We respect your time and investment. Projects delivered on time and on budget.', icon: 'clock' },
]

/** Testimonials exactly as published on the client's current site. */
export const REVIEWS = [
  { name: 'Kara Lucas', text: 'DY Construction transformed our old bathroom into a modern, stunning space. The team was professional, punctual, and always kept us updated. The quality of work exceeded our expectations.' },
  { name: 'Alley Cohen', text: 'We had our kitchen renovated, and the results were outstanding. Everything was completed on time and within budget. The craftsmanship and attention to detail were top-notch.' },
  { name: 'Jason Smith', text: 'From the first consultation to the final handover, DY Construction made the entire renovation smooth and stress-free. Clear communication, no hidden costs, and absolutely beautiful results.' },
]

export const SERVICE_AREAS = [
  'Lalor', 'Coburg', 'Doreen', 'Epping', 'Mernda', 'Preston', 'Wollert', 'Bundoora', 'Mill Park', 'Northcote',
  'Reservoir', 'Heidelberg', 'Thomastown', 'Whittlesea', 'Craigieburn', 'Broadmeadows', 'South Morang',
  'Campbellfield', 'Diamond Creek', 'Greensborough',
]

/** Gallery: DY's own project photos only. */
export const GALLERY = [
  { img: IMG.kitchenIsland, caption: 'Kitchen with island bench and timber floors' },
  { img: IMG.bathroomEnsuite, caption: 'Ensuite with framed shower and timber-look vanity' },
  { img: IMG.joineryBarWide, caption: 'Custom black joinery bar with wine fridge' },
  { img: IMG.bathroomSubway, caption: 'Subway-tiled bathroom with walk-in shower' },
  { img: IMG.kitchenWhite, caption: 'White kitchen with stone benchtop and black sink' },
  { img: IMG.bathroomWalkin, caption: 'Large-format tiles and frameless glass' },
  { img: IMG.joineryBarDetail, caption: 'Herringbone splashback over shaker cabinetry' },
  { img: IMG.bathroomOak, caption: 'Wall-hung oak vanity and floor-to-wall tiling' },
  { img: IMG.joineryBarAngle, caption: 'Built-in bar, finished end to end' },
]

/**
 * Before/after pairs. These are SAMPLE photos carried over from another demo so
 * the slider can be shown working — they are NOT DY's work, and the section
 * says so on screen. Replace with DY's own pairs before the site goes live.
 */
export const TRANSFORMATIONS = [
  { id: 's1', title: 'Family bathroom', meta: 'Freestanding bath and walk-in shower', before: IMG.sample1Before, after: IMG.sample1After },
  { id: 's2', title: 'Apartment bathroom', meta: 'Bath removed, full-height tiling', before: IMG.sample2Before, after: IMG.sample2After },
  { id: 's3', title: 'Ensuite upgrade', meta: 'Frameless glass and feature tiles', before: IMG.sample3Before, after: IMG.sample3After },
]

/* ---------- Design & quote flow ---------- */

export const ROOM_TYPES = [
  { id: 'bathroom', title: 'Bathroom', icon: 'bathroom' },
  { id: 'kitchen', title: 'Kitchen', icon: 'kitchen' },
  { id: 'laundry', title: 'Laundry', icon: 'laundry' },
  { id: 'other', title: 'Other room', icon: 'room' },
]

export const STYLES = ['Modern', 'Coastal', 'Hamptons', 'Japandi', 'Scandinavian', 'Industrial', 'Minimal', 'Classic']

/** Feature keywords offered per room, so the picks always make sense together. */
export const FEATURES = {
  bathroom: ['Walk-in shower', 'Freestanding bath', 'Double vanity', 'Floor-to-ceiling tiles', 'Matte black tapware', 'Brushed brass tapware', 'Backlit mirror', 'Niche shelving', 'Heated towel rail', 'Terrazzo look'],
  kitchen: ['Island bench', 'Stone benchtop', 'Butler’s pantry', 'Waterfall edge', 'Open shelving', 'Handleless cabinets', 'Matte black tapware', 'Herringbone splashback', 'Pendant lights', 'Integrated appliances'],
  laundry: ['Stone benchtop', 'Overhead storage', 'Hidden laundry', 'Tall linen cupboard', 'Feature tiles', 'Hanging rail'],
  other: ['New flooring', 'Built-in storage', 'Feature lighting', 'Open plan', 'Custom joinery', 'Fresh paint'],
}

export const PALETTES = [
  { id: 'light', title: 'Light and bright', swatch: ['#F6F5F2', '#E3E1DC', '#C9C6BF'] },
  { id: 'warm', title: 'Warm neutral', swatch: ['#E9DED0', '#C8B39A', '#8E7458'] },
  { id: 'dark', title: 'Dark and moody', swatch: ['#3A3D42', '#22252A', '#0F1114'] },
  { id: 'natural', title: 'Natural timber', swatch: ['#D8C3A5', '#A9845C', '#5E7A5B'] },
]

export const BUDGETS = ['Under $20k', '$20k – $40k', '$40k – $70k', '$70k+', 'Not sure yet']
export const TIMINGS = ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just planning']
