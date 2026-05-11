import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AiTools from '../components/AiTools.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
        <Hero />
      </header>
      <main>
        <AiTools />
        <HowItWorks />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  )
}

export default Home