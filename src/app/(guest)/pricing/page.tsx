"use client";
import React from "react";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container";
import { CheckCircle2Icon } from "lucide-react";

export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Free",
      price: "Free",
      features: [
        "Free financial reconciliation for 7 days",
        "Upload CSV files",
        "Basic AI reconciliation",
        "Manually match transactions detected as unmatched",
      ],
    },
    {
      title: "Starter Plan",
      price: "10",
      features: [
        "Reconcile up to 20 transactions/month",
        "Basic AI matching (date, amount, description)",
        "Export results to CSV",
        "Manual adjustments (unlink and match errors)",
      ],
    },
    {
      title: "Business Plan",
      price: "25",
      features: [
        "All features from the Starter Plan",
        "Advanced AI reconciliation",
        "Merging multiple records",
        "Email notifications for reconciled results",
        "Merging multiple files",
      ],
    },
  ];
  
    return(
        <>
          <div className="font-inter">
            <Container className="py-10 w-full">
              <div>
                <h1 className="text-center w-full font-semibold text-[28px] max-w-[768px] mx-auto sm:text-5xl text-[#101828] flex-wrap lg:leading-[3.5rem] lg:text-[3rem]">Flexible Pricing Plans for Every Business</h1>
                <p className="text-center mx-auto sm:text-xl max-w-[768px] mt-4">
                  Find the perfect financial reconcilation plan for your business. 
                  From freelancers to large enterprises, ReconXi makes AI-powered
                  reconciliation fast, accurate, and affordable. 
                </p>
              </div>
            </Container>
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-6 py-10">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`w-full p-6 py-20 border rounded-lg ${
                      index === 1 ? "bg-[#2E604A] text-white" : "bg-white text-black"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-10 border-b-1 border-solid py-6 border-[#BFB8B8]">{plan.title}</h3>
                    <p className="text-2xl font-semibold mb-4"><span className="text-base">$</span>{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2Icon className={`mr-3 w-6 h-6 ${index === 1 ? "text-white" : "text-[#297B65]"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button  className={`mt-4 w-full py-2 rounded ${
                      index === 1
                        ? "bg-white text-[#2E604A]"
                        : "bg-[#2E604A] text-white"
                    }`}>
                      Get Started
                    </button>
                  </div>
                ))}
              </div>  
            </Container>
            <Container className="py-10">
              <h3 className="text-2xl text-center sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-6 text-[#101828] leading-tight tracking-tight pb-4">
                  Why Choose ReconXi?
              </h3>

              <div className="flex flex-col w-full">
                <div className="flex justify-between  flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] w-full">
                  {[
                    "SME-Friendly Pricing",
                    "Secure & Reliable",
                  ].map((title, i) => (
                    <div
                      key={i}
                      className="border border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col gap-1.5
                  w-full"
                    >
                      <div className="flex mb-2">
                        <Image
                          src={`/assets/images/${
                            i === 0
                              ? "dollar"
                              :"security"
                          }.svg`}
                          alt={`${title} icon`}
                          width={25}
                          height={25}
                          style={{ width: "auto", height: "auto" }}
                        />
                        <h3 className="flex text-[#2E604A] font-medium ml-[10px]">
                          {title}
                        </h3>
                      </div>
                      <p className="text-start text-sm sm:text-base leading-relaxed">
                        {i === 0 &&
                          " Affordable plans designed for Nigerian businesses and global startups."}
                        {i === 1 &&
                          "Your financial data is protected with bank-grade encrytion."}
                      </p>
                    </div>
                  ))}
                </div>
              
                <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] mt-7 lg:mt-11 w-full">
                  {["Upload & Export", "AI-Powered Reconciliation"].map((title, i) => (
                    <div
                      key={i}
                      className="border w-full border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col justify-center gap-1.5"
                    >
                      <div className="flex justify-left items-center mb-2">
                        <Image
                          src={`/assets/images/${
                            i === 0 ? "upload" : "aiReconcillation"
                          }.svg`}
                          alt={`${title} icon`}
                          width={25}
                          height={25}
                          style={{ width: "auto", height: "auto" }}
                        />
                        <h3 className="text-[#2E604A] font-medium ml-[10px]">
                          {title}
                        </h3>
                      </div>
                      <p className="text-start text-sm sm:text-base leading-relaxed">
                        {i === 0 &&
                          "Easily upload and export reports in CVS."}
                        {i === 1 &&
                          "Helps to reduce errors."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
            <div className="bg-gray-50 sm:bg-white w-full">
                <Container className="pt-20 pb-8 px-0 max-w-full">
                    <div
                        className="flex flex-col items-center gap-8 sm:gap-10 bg-gray-50 justify-between px-5 py-10 sm:p-16 sm:rounded-xl sm:flex-row sm:px-7 sm:py-12 md:items-start w-full"
                    >
                        <div
                        className="space-y-3 text-center sm:text-left sm:space-y-4 md:w-2/3"
                        >
                        <p className="font-bold text-gray-900 text-3xl">
                            Try ReconXi for free!
                        </p>
                        <p className="text-[#475467] text-xl sm:text-lg max-w-[43rem]">
                            Unlock faster and smarter financial reconciliation today - free
                            for a limited time.
                        </p>
                        </div>
                        <div>
                        <Link
                            className="bg-primary whitespace-nowrap w-full sm:w-fit  py-4 px-4 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex"
                            href="/"
                        >
                            Start your free trial
                        </Link>
                        </div>
                    </div>
                </Container>
            </div>
          </div>
          <Footer />
        </>
    )
}