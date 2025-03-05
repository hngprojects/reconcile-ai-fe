import React from "react";
import HeadBanner from "@/components/HeadBanner";
import CTASection from "@/components/CTASection";
import PrivacyPolicies from "@/components/PrivacyPolicies";
import TableOfContents from "@/components/TableOfContents";

const page = () => {
  const data = {
    span: "Privacy Policy",
    bigtext: "How We Protect Your Information",
    smalltext: "Find advice and answers from our support team",
    color: "text-[#009a49]",
  };

  return (
    <section>
      <HeadBanner data={data} />
      <div className="w-fit mx-auto flex flex-1 justify-center gap-16 px-8">
        <TableOfContents />
        <PrivacyPolicies />
      </div>
      <CTASection />
    </section>
  );
};

export default page;
