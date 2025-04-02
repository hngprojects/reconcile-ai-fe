import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const HeroSection = dynamic(() => import('@/components/hero-section'))
const WhoCanUse = dynamic(() => import('@/components/WhoCanUse'))
const Features2 = dynamic(() => import('@/components/Features2'))
const VideoFeature = dynamic(() => import('@/components/VideoFeature'))
const FAQSection = dynamic(() => import('@/components/FAQs/FAQSection'))
const CTASection = dynamic(() => import('@/components/CTASection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <WhoCanUse />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Features2 />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoFeature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <CTASection />
      <Footer />
    </main>
  )
}
