import Container from '@/components/Container'
import FAQSection from '@/components/FAQs/FAQSection'
import Footer from '@/components/Footer'
import VideoFeature from '@/components/VideoFeature'
import Benefits from '@/components/finance/benefits'
import FormSection from '@/components/finance/formSection'
import About from '@/components/finance/about'
import HeroSection from '@/components/finance/hero'

export default function FinancePage() {
  return (
    <>
      <Container>
        <HeroSection />
        <About />
        <FormSection />
        <Benefits />
        <VideoFeature videoTitle="See how ReconXi does it!" />
        <FAQSection />
      </Container>
      <Footer />
    </>
  )
}
