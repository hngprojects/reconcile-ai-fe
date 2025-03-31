import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/enterprise/hero-sect'))
const Features1 = dynamic(() => import('@/components/enterprise/Features'))
const VideoFeature = dynamic(
  () => import('@/components/enterprise/VideoFeature')
)
const StartReconcile = dynamic(() => import('@/components/enterprise/Ready'))
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
        <Features1 />
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
