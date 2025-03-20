import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports
const HeroSection = dynamic(
  () => import("@/src/components/enterprise/hero-sect"),
);
const Features1 = dynamic(() => import("@/src/components/enterprise/Features"));
const Benefits = dynamic(() => import("@/src/components/enterprise/Benefits"));
const StartReconcile = dynamic(
  () => import("@/src/components/enterprise/Ready"),
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
