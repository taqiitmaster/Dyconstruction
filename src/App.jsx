import { DesignProvider } from './lib/design.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DesignQuote from './components/DesignQuote.jsx'
import Intro from './components/Intro.jsx'
import Services from './components/Services.jsx'
import Transformations from './components/Transformations.jsx'
import ThreeScroll from './components/ThreeScroll.jsx'
import WhyUs from './components/WhyUs.jsx'
import Reviews from './components/Reviews.jsx'
import Gallery from './components/Gallery.jsx'
import Areas from './components/Areas.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import MobileCallBar from './components/MobileCallBar.jsx'
import Cursor from './ui/Cursor.jsx'
import { ScrollProgress } from './ui/Atmosphere.jsx'

/**
 * Home page. The design-and-quote flow sits directly under the hero, and the
 * hero's upload card feeds straight into it — that's the path ad traffic takes.
 */
export default function App() {
  return (
    <DesignProvider>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <DesignQuote />
        <Intro />
        <Services />
        <Transformations />
        <ThreeScroll />
        <WhyUs />
        <Reviews />
        <Gallery />
        <Areas />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallBar />
    </DesignProvider>
  )
}
