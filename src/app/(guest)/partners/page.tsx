"use client";
import React from "react";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container";

export default function PartnershipPage() {
  const opportunities = [
    "Referral Partners: Expand your portfolio by offering ReconXi solutions to your clients, backed by training and marketing resources.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.",
    "Referral Partners: Expand your network and drive mutual success by collaborating with ReconXi's partner ecosystem.",
  ];

  return (
    <>
      <div>
        <Container>
          <div className="flex justify-center items-center mx-auto sm:rounded-xl max-w-full text-center bg-[#FBFEFD] mt-[42px] md:mt-[78px]">
            <div className="flex p-4 md:p-0 flex-col-reverse md:flex-row items-center text-center sm:text-left gap:8 md:gap-4 flex-1">
              <div className="flex md:justify-center flex-row items-start gap-6 w-full">
                <div className="flex text-left md:p-5 flex-col items-start gap-4 self-stretch mt-5 md:mt-0 md:max-w-[614px]">
                  <h1 className="text-[#101828] font-inter text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                    Join us in a winning <br className="hidden md:block" />
                    partnership
                  </h1>
                  <p className="text-[#475467] font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                    At ReconXi, we are dedicated to transforming the way
                    businesses manage their financial reconciliation processes.
                    By partnering with us, you can enhance your offerings and
                    provide added value to your clients while benefiting from
                    our solution.
                  </p>
                  <Link
                    className="!p-6 bg-primary whitespace-nowrap w-full sm:w-fit py-3 px-5 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-md text-white hover:bg-primary/90 flex"
                    href="/"
                  >
                    Partner With Us
                  </Link>
                </div>
              </div>
              <div className="relative w-full max-w-[536px] flex justify-center items-center">
                <Image
                  src="/assets/images/partners-main-image-mobile.svg"
                  alt="Business People"
                  width={536}
                  height={400}
                  className="rounded-[10px] block md:hidden"
                  priority
                />
                <Image
                  src="/assets/images/partners-main-image-desktop.svg"
                  alt="Business People"
                  width={536}
                  height={400}
                  className="rounded-[10px] hidden md:block"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>

        <Container className="text-center mt-7 md:mt-15">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-6 text-[#101828] leading-tight tracking-tight">
            Why Partner With ReconXi?
          </h3>
          <div className="flex flex-col w-full">
            <div className="flex justify-center flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] w-full">
              {[
                "Innovative Solutions",
                "Expand Your Offerings",
                "Drive Customer Success",
              ].map((title, i) => (
                <div
                  key={i}
                  className="border border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col gap-1.5
             w-full md:w-1/2 lg:w-1/3"
                >
                  <div className="flex items-center mb-2">
                    <Image
                      src={`/assets/images/${
                        i === 0
                          ? "innovative"
                          : i === 1
                            ? "flowbite_expand-outline"
                            : "checkfeat"
                      }.svg`}
                      alt={`${title} icon`}
                      width={25}
                      height={25}
                    />
                    <h3 className="flex text-[#2E604A] font-medium ml-[10px]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-start text-sm sm:text-base leading-relaxed">
                    {i === 0 &&
                      "Our platform combines advanced technology with user-friendly features, allowing businesses to reconcile their accounts quickly."}
                    {i === 1 &&
                      "Enhance your product suite with a trusted reconciliation solution that adds value to your clients."}
                    {i === 2 &&
                      "Equip your users with tools to achieve accurate, timely financial reporting."}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] mt-7 lg:mt-11 w-full">
              {["Market Reach", "Dedicated Support"].map((title, i) => (
                <div
                  key={i}
                  className="border w-full md:w-[270px] lg:w-[404px] border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col justify-center gap-1.5"
                >
                  <div className="flex justify-left items-center mb-2">
                    <Image
                      src={`/assets/images/${
                        i === 0 ? "fluent-mdl2_market" : "support_agent"
                      }.svg`}
                      alt={`${title} icon`}
                      width={25}
                      height={25}
                    />
                    <h3 className="text-[#2E604A] font-medium ml-[10px]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-start text-sm sm:text-base leading-relaxed">
                    {i === 0 &&
                      "Collaborate with us to tap into new markets and expand your customer base. Our strong brand in the industry can help elevate your business."}
                    {i === 1 &&
                      "We prioritize our partners' success. Our team is committed to providing the support and resources you need to maximize the benefits of our partnership."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Container className="my-7 py-10 mx-auto max-w-7xl flex flex-col items-center">
          <h3 className="py-10 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333]">
            Partnership Opportunities
          </h3>
          <ul className=" list-none flex flex-col items-center lg:items-start ml-1 lg:ml-[16px] ">
            {opportunities.map((opportunity, index) => {
              if (opportunity.startsWith("Referral Partners:")) {
                const [title, ...description] = opportunity.split(":");
                return (
                  <li
                    key={index}
                    className="flex items-center mb-4 lg:mb-[20px] "
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 sm:mr-4 sm:w-[28px] sm:h-[28px] lg:w-[32px] lg:h-[32px] flex-shrink-0"
                    >
                      <path
                        d="M16 0L20.3218 11.6782L32 16L20.3218 20.3218L16 32L11.6782 20.3218L0 16L11.6782 11.6782L16 0Z"
                        fill="#2E604A"
                      />
                    </svg>
                    <span className="text-sm sm:text-base lg:text-lg text-[#000000] leading-tight sm:leading-normal lg:leading-relaxed">
                      <span className="font-bold">{title}:</span>
                      {description.join(":")}
                    </span>
                  </li>
                );
              }
              return (
                <li key={index} className="flex items-center mb-4 lg:mb-[20px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 sm:mr-4 sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] flex-shrink-0"
                  >
                    <path
                      d="M16 0L20.3218 11.6782L32 16L20.3218 20.3218L16 32L11.6782 20.3218L0 16L11.6782 11.6782L16 0Z"
                      fill="#2E604A"
                    />
                  </svg>
                  <span className="text-sm sm:text-base lg:text-lg text-[#475467] leading-tight sm:leading-normal lg:leading-relaxed">
                    {opportunity}
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>

        <div className="pb-0 md:pb-25">
          <Container className="py-8 bg-white md:bg-[#FBFEFD] md:border md:border-[#E8E8E8]">
            <div className="flex flex-col gap-11 py-7 text-center items-center sm:rounded-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333]">
                What We Offer Partners
              </h3>
              {/* Grid container for the cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-6">
                {[
                  {
                    title: "Technical Support",
                    desc: "Access to developer resources, documentation and a responsive engineering team.",
                    imagePath: "support_agent.svg",
                  },
                  {
                    title: (
                      <div className="flex text-left">Marketing Resources</div>
                    ),
                    desc: "Ready-to-use collateral, case studies, and tailored campaigns to amplify your outreach.",
                    imagePath: "marketing.svg",
                  },
                  {
                    title: "Training",
                    desc: "Onboarding sessions and ongoing education to ensure your team maximizes ReconXi's potential.",
                    imagePath: "training.svg",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center mb-2 gap-2">
                      <Image
                        src={`/assets/images/${item.imagePath}`}
                        alt={`${item.title} icon`}
                        width={25}
                        height={25}
                      />
                      <h3 className="text-lg m-0 p-0 font-medium text-[#2E604A]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-start text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
