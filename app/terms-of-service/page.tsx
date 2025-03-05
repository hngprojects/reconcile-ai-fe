import React from "react";
import HeadBanner from "@/components/HeadBanner";
import CTASection from "@/components/CTASection";
import TermsAndPolicy from "@/components/TermsAndPolicy";

const page = () => {
  const data = {
    span: " Current as of 05 Mar 2025",
    bigtext: "Terms of service",
    smalltext:
      "By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.",
    color: "text-black",
  };

  return (
    <section className="flex flex-col">
      <HeadBanner data={data} />
      <TermsAndPolicy />
      <CTASection />
    </section>
  );
};

export default page;
