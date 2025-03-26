import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports
const HeroSection = dynamic(
  () => import("@/src/components/accounting/hero-sect"),
);
const AboutUs = dynamic(() => import("@/src/components/accounting/Features"));
const Benefits = dynamic(() => import("@/src/components/accounting/Benefits"));
const VideoFeature = dynamic(
  () => import("@/src/components/accounting/VideoFeature"),
);
const StartReconcile = dynamic(
  () => import("@/src/components/accounting/Ready"),
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
  );
}
