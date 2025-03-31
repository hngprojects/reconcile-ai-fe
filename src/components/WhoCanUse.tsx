"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import React from "react";
import {
  BankIcon,
  CorporationIcon,
  SmallBusinessIcon,
} from "@/src/components/Icon/Icons";

const whoCanUseContent = [
  {
    id: 1,
    title: "Small Businesses",
    icon: SmallBusinessIcon,
    content:
      "Save time and reduce financial stress with automated reconciliation. ReconXi helps small businesses identify discrepancies and maintain accurate records.",
    linkUrl: "/startup-and-sme",
  },
  {
    id: 2,
    title: "Banks and Financial Institutions",
    icon: BankIcon,
    content:
      "ReconXi helps banks and financial institutions by automating reconciliation processes, ensuring accurate financial records. ReconXi makes handling large volumes of data manageable and reliable.",
    linkUrl: "/financial-pro",
  },
  {
    id: 3,
    title: "Schools & Educational Institutions",
    icon: BankIcon,
    content:
      "ReconXi helps schools and educational institutions automate the reconciliation of fees, payroll, and other financial records, reducing the risk of errors.",
    linkUrl: "/school-and-education",
  },
  {
    id: 4,
    title: "Corporations (Finance Department)",
    icon: CorporationIcon,
    content:
      "ReconXi assists corporations by automating the reconciliation process within finance departments. It helps finance teams accurately track financial data, fostering better financial oversight and collaboration across the organization.",
    linkUrl: "/finance",
  },
  {
    id: 5,
    title: "Accounting and Audit Firms",
    icon: CorporationIcon,
    content:
      "ReconXi helps accounting and audit firms automate financial reconciliation with its AI-powered matching, improving accuracy, reducing manual work, minimizing errors, and ensuring compliance with financial regulations.",
    linkUrl: "/accounting",
  },
];

const WhoCanUse = () => {
  return (
    <section className="bg-white md:bg-[#F5F5F5] py-8 md:py-24 px-6">
      <Container>
        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          Who can use ReconXi?
        </h2>
        <p className="text-[#475467] mt-4 max-w-[1002px] mx-auto md:text-center text-sm md:text-base text-left">
          ReconXi is built for businesses and organizations of all sizes, 
          designed to make financial reconciliation simpler and more accurate. 
          Whether you&apos;re a small startup or a large enterprise, ReconXi offers 
          solutions tailored to your needs.
        </p>

        <div className="mt-8 space-y-6 md:grid md:grid-cols-2 md:gap-6">
          {whoCanUseContent.map(({ id, title, content, linkUrl, icon: Icon }, index) => {
            const isLastItem = index === whoCanUseContent.length - 1;
            const isOdd = whoCanUseContent.length % 2 !== 0;

            return (
              <div
                key={id}
                className={`flex flex-col md:bg-white md:p-8 md:rounded-lg md:shadow-md
                  ${isLastItem && isOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}`}
              >
                {/* Icons visible on desktop, hidden on mobile */}
                <Icon className="hidden md:block text-[#2E604A] w-14 h-14 mb-4" />

                <h3 className="text-lg md:text-xl font-semibold text-black md:text-[#2E604A] mb-2">
                  {title}
                </h3>
                <p className="text-[#475467] text-sm md:text-base leading-6 mb-4">
                  {content}
                </p>
                <Link className="flex items-center gap-2 text-[#2E604A] font-semibold group" href={linkUrl}>
                  <span>Learn more</span>
                  <ArrowRight className="size-4 group-hover:translate-x-2 transition duration-500" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhoCanUse;