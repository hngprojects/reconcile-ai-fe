import React from "react";

import HeroSection from "@/components/hero-section";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

import FAQSection from "@/components/FAQs/FAQSection";
import Features1 from "@/components/Feature";
import CTASection from "@/components/CTASection";
import Features2 from "@/components/Features2";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <Features1 />
      <Features2 />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
