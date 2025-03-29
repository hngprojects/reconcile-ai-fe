"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import Container from "./Container";

const whoCanUseContent = [
  {
    id: 1,
    title: "Small Businesses",
    content:
      "Save time and reduce financial stress with automated reconciliation. ReconXi helps small businesses identify discrepancies, and maintain accurate records—so you can focus on growing your business.",
    linkUrl: "/startup-and-sme",
  },
  {
    id: 2,
    title: "Banks and Financial Institutions",
    content:
      "ReconXi helps banks and financial institutions by automating reconciliation processes, ensuring accurate financial records, and reducing the time spent on manual tasks. With user-friendly tools, ReconXi makes handling large volumes of data manageable and reliable for everyone involved.",
    linkUrl: "/financial-pro",
  },
  {
    id: 3,
    title: "Accounting and Audit Firms",
    content:
      "ReconXi helps accounting and audit firms automate financial reconciliation, reducing manual work, minimizing errors, and ensuring compliance with financial regulations. Its AI-powered matching improves accuracy, allowing firms to focus on higher-value financial analysis and decision-making.",
    linkUrl: "/accounting",
  },
  {
    id: 4,
    title: "Schools & Educational Institutions",
    content:
      "ReconXi simplifies fee and expense reconciliation for better financial management. ReconXi helps schools and Educational institutions automate the reconciliation of fees, payroll, and other financial records, minimizing manual work and reducing the risk of errors.",
    linkUrl: "/school-and-education",
  },
  {
    id: 5,
    title: "Cooperations(Finance Department)",
    content:
      "ReconXi assists corporations by automating the reconciliation process within finance departments. It helps teams accurately track financial data and reduces the time spent on manual tasks. This allows finance professionals to focus on critical analysis and decision-making, fostering better financial oversight and collaboration across the organization.",
    linkUrl: "/finance",
  },
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
        <div className="mt-12 md:flex flex-wrap justify-center gap-x-6 gap-y-6 max-md:space-y-6">
          {whoCanUseContent.map(({ id, title, content, linkUrl }) => (
            <article
              key={id}
              className={cn(
                "md:bg-white md:p-8 rounded-[12px] lg:w-[500px] flex flex-col justify-between",
              )}
            >
              <div>
                <h2 className="font-bold md:text-xl">{title}</h2>
                <p className="text-sm md:text-base text-[#3B3E45] mt-4 mb-8">
                  {content}
                </p>
              </div>
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
