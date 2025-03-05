import React from "react";
import Feature2 from "@/components/Feature2";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import FeaturesSection from "@/components/FeaturesSection";
import Features1 from "@/components/features1";d
import CTASection from "@/components/CTASection";d

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <Features1/>
      <Feature2 />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main> 
  );
}
