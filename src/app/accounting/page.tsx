import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/accounting/hero-sect'))
const AboutUs = dynamic(() => import('@/components/accounting/Features'))
const Benefits = dynamic(() => import('@/components/accounting/Benefits'))
const VideoFeature = dynamic(
  () => import('@/components/accounting/VideoFeature')
)
const StartReconcile = dynamic(() => import('@/components/accounting/Ready'))
const FAQSection = dynamic(() => import('@/components/FAQs/FAQSection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <StartReconcile />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoFeature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <Footer />
    </main>
  )
}
