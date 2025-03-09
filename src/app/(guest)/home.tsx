import Footer from "@/src/components/Footer";
import HeroSection from "@/src/components/hero-section";

import CTASection from "@/src/components/CTASection";
import FAQSection from "@/src/components/FAQs/FAQSection";
import Features1 from "@/src/components/Feature";
import Features2 from "@/src/components/Features2";

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
