import Feature2 from "@/components/Feature2";
import HeroSection from "@/components/hero-section";
import Nav from "@/components/Nav";
import React from "react";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQs/FAQSection";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <Feature2 />
      <FeaturesSection />
      <FAQSection />
    </main> 
  );
}
