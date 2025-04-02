import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports
const HeroSection = dynamic(() => import("@/src/components/hero-section"));
const WhoCanUse = dynamic(() => import("@/src/components/WhoCanUse"));
const Features2 = dynamic(() => import("@/src/components/Features2"));
const VideoFeature = dynamic(() => import("@/src/components/VideoFeature"));
const FAQSection = dynamic(() => import("@/src/components/FAQs/FAQSection"));
const CTASection = dynamic(() => import("@/src/components/CTASection"));
const Footer = dynamic(() => import("@/src/components/Footer"));


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
        <VideoFeature videoTitle="See how ReconXi does it!" />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <CTASection />
      <Footer />
    </main>
  );
}