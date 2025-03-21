import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports
const HeroSection = dynamic(
  () => import("@/src/components/freelancer/hero-sect"),
);

const Feature = dynamic(
    () => import("@/src/components/freelancer/Features"),
  );
const VideoFeature = dynamic(
  () => import("@/src/components/freelancer/VideoFeature"),
);
const WhyReconXi = dynamic(
  () => import("@/src/components/freelancer/WhyReconXi"),
);
const Benefits = dynamic(
  () => import("@/src/components/freelancer/Benefits"),
);
const StartReconcile = dynamic(
  () => import("@/src/components/freelancer/Ready"),
);
const FAQSection = dynamic(() => import("@/src/components/FAQs/FAQSection"));
const Footer = dynamic(() => import("@/src/components/Footer"));

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Feature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoFeature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhyReconXi />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <StartReconcile />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <Footer />
    </main>
  );
}