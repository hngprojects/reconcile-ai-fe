import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports
const HeroSection = dynamic(
  () => import('@/components/startup-and-sme/hero-sect')
)
const Benefits = dynamic(() => import('@/components/startup-and-sme/Benefits'))
const VideoFeature = dynamic(
  () => import('@/components/startup-and-sme/VideoFeature')
)
const WhyReconXi = dynamic(
  () => import('@/components/startup-and-sme/WhyReconXi')
)
const StartReconcile = dynamic(
  () => import('@/components/startup-and-sme/Ready')
)
const FAQSection = dynamic(() => import('@/components/FAQs/FAQSection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhyReconXi />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <StartReconcile />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoFeature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <Footer />
    </main>
  )
}
