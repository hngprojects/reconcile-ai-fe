"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import Container from "./Container";

const whoCanUseContent = [
  {
    id: 1,
    title: "Startups & SMEs",
    content:
      "ReconXi helps small businesses and startups reconcile transactions with ease, improving record accuracy and eliminating the burden of manual processes.",
    linkUrl: "/small-business",
  },
  {
    id: 2,
    title: "Financial Professionals",
    content:
      "ReconXi empowers accountants, auditors, and financial analysts with AI-powered tools that streamline reconciliation, reduce manual effort, and ensure greater accuracy.",
    linkUrl: "/financial-pro",
  },
  // {
  //   id: 3,
  //   title: "Enterprises",
  //   content:
  //     "For large organizations dealing with a high volume of transactions, ReconXi provides a solution to handle complex reconciliations.",
  //   linkUrl: "/enterprise",
  // },
  {
    id: 5,
    title: "Schools & Educational Institutions",
    content:
      "For schools and educational institutions, ReconXi automates the reconciliation of fees, payroll, and other financial records, reducing errors and saving valuable time.",
    linkUrl: "/school-and-education",
  },
  // {
  //   id: 5,
  //   title: "Freelancers",
  //   content:
  //     "Freelancers use ReconXi to streamline their financial tracking, automate invoice reconciliation, and ensure accurate payment records, reducing manual effort and minimizing errors.",
  //   linkUrl: "/freelancer",
  // },
];

const WhoCanUse = () => {
  return (
    <section className="bg-white md:bg-[#F5F5F5] py-8 md:py-24 px-8">
      <Container>
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Who can use ReconXi?
        </h2>
        <p className="text-[#475467] mt-6 max-w-[1002px] mx-auto md:text-center text-sm md:text-base">
          ReconXi is designed to simplify financial reconciliation for
          professionals and organizations of all sizes. <br /> Whether
          you&apos;re a financial professional managing complex data, a small
          business owner, or an educational institution, ReconXi provides a
          fast, accurate, and hassle-free solution.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-x-9 md:gap-y-8 gap-y-6">
          {whoCanUseContent.map(({ id, title, content, linkUrl }) => (
            <article
              key={id}
              className={cn(
                "md:bg-white md:p-8 rounded-[12px] h-[240px]",
                id === 1 && "rounded-tl-[4rem]",
                id === 2 && "rounded-tr-[4rem]",
                id === 3 && "rounded-bl-[4rem]",
                id === 4 && "rounded-br-[4rem]",
                // For the last card, span both columns, center it, and add the decorative rounded edge
                id === 5 &&
                  "md:col-span-2 md:w-[600px] md:mx-auto rounded-br-[4rem] rounded-bl-[4rem]",
              )}
            >
              <h2 className="font-bold md:text-xl">{title}</h2>
              <p className="text-sm md:text-base text-[#3B3E45] mt-4 mb-8">
                {content}
              </p>
              <Link
                className="flex items-center gap-2 text-[#2E604A] font-semibold group"
                href={linkUrl}
              >
                <span>Learn more</span>
                <ArrowRight className="size-4 group-hover:translate-x-2 transition duration-500" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhoCanUse;
