import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";

import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQs/FAQSection";
import Features1 from "@/components/Feature";
import Features2 from "@/components/Features2";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features1 />
      <Features2 />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
