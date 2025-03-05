import React from "react";

import HeroSection from "@/components/hero-section";

import FAQSection from "@/components/FAQs/FAQSection";
import Features1 from "@/components/features1";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features1 />
      <Features />
      <FAQSection />
      <CTASection />
    </main>
  );
}
