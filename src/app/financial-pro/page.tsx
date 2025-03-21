import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports
const HeroSection = dynamic(
  () => import("@/src/components/financial-pro/hero-section"),
);
const Features1 = dynamic(
  () => import("@/src/components/financial-pro/Features"),
);
const VideoFeature = dynamic(
  () => import("@/src/components/financial-pro/Video"),
);
const WhyReconXi = dynamic(
  () => import("@/src/components/financial-pro/WhyReconxi"),
);
const StartReconcile = dynamic(
  () => import("@/src/components/financial-pro/Ready"),
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
        <Features1 />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <StartReconcile />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhyReconXi />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoFeature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <Footer />
    </main>
  );
}
