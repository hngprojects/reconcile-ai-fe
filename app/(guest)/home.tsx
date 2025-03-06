import React from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";
import FAQSection from "@/components/FAQs/FAQSection";
import Features1 from "@/components/features1";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Nav from "@/components/Nav";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <Features1 />
      <Features />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
