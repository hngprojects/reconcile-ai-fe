import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports
const HeroSection = dynamic(
  () => import("@/src/components/small-business/hero-sect"),
);
const Features1 = dynamic(
  () => import("@/src/components/small-business/Features"),
);
const VideoFeature = dynamic(
  () => import("@/src/components/small-business/VideoFeature"),
);
const WhyReconXi = dynamic(
  () => import("@/src/components/small-business/WhyReconXi"),
);
const StartReconcile = dynamic(
  () => import("@/src/components/small-business/Ready"),
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
