import React from "react";

import HeroSection from "@/components/hero-section";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

import FAQSection from "@/components/FAQs/FAQSection";
import Features1 from "@/components/features1";
import CTASection from "@/components/CTASection"
import Featurex from "@/components/Featurex";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <Features1/>
      <Featurex/>
      <Featurex/>
      <Featurex/>
      <FAQSection />
      <CTASection />
      <Footer />
    </main> 
  );
}
