import React from "react";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { StarsIcon } from "lucide-react";

export default function PartnershipPage() {
  const opportunities = [
    "Referral Partners: Expand your portfolio by offering ReconXi solutions to your clients, backed by training and marketing resources.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.",
  ];

  return (
    <div>
      <div className="px-[25px]">
        <div className="flex justify-center items-center mx-auto max-w-7xl text-center bg-[#FBFEFD] mt-[65px]">
          <div className="flex flex-col-reverse sm:flex-row items-center text-center sm:text-left gap-[32px] flex-1">
            <div className="flex flex-col items-start gap-[24px] w-full">
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                <h1 className="text-[#101828] font-inter text-3xl sm:text-4xl font-semibold">
                  Join us in winning a partnership
                </h1>
                <p className="text-[#475467] font-inter sm:text-lg">
                  At ReconXi, we are dedicated to transforming the way
                  businesses manage their financial reconciliation processes. By
                  partnering with us, you can enhance your offerings and provide
                  added value to your clients while benefiting from our
                  solution.
                </p>

                <Link
                  className="!p-6 bg-primary whitespace-nowrap w-full sm:w-fit  py-3 px-5 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-md text-white hover:bg-primary/90 flex"
                  href="/"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
            <div className=" relative md:h-[500px] h-[300px] w-full max-w-[536px] flex align-center">
              <Image
                src="/assets/images/mobile_businessppl.svg"
                alt="Mobile screen mockup"
                width={536}
                height={550}
                className="block sm:hidden flex-shrink-0 rounded-[10px] bg-[50%] bg-cover bg-no-repeat object-contain max-w-full h-auto"
              />

              <Image
                src="/assets/images/Business_people.svg"
                alt="Desktop screen mockup"
                width={536}
                height={550}
                className="hidden sm:block flex-shrink-0 rounded-[10px] bg-[50%] bg-cover bg-no-repeat object-contain max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="my-10 mx-auto max-w-7xl text-center">
          <h3 className="text-4xl font-semibold mb-2 sm:mb-4 text-[#101828] leading-11 tracking-[-0.02em] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px]">
            Why Partner With ReconXi?
          </h3>
          <div className="flex flex-col p-4 w-full">
            {/* First row */}
            <div className="flex justify-center flex-col md:flex-row gap-4 lg:gap-[38px] w-full">
              <div className="border w-full md:w-[270px] lg:w-[404px] border-solid border-[#D9D9D9] rounded-[8px] p-3 flex flex-col justify-center">
                <div className="flex items-center">
                  <Image
                    src="/assets/images/innovative.svg"
                    alt="innovative icon"
                    width={25}
                    height={25}
                  />
                  <h3 className="text-[#2E604A] font-medium ml-[10px]">
                    Innovative Solutions
                  </h3>
                </div>
                <p className="text-start">
                  Our platform combines advanced technology with user-friendly
                  features, allowing businesses to reconcile their accounts
                  quickly.
                </p>
              </div>

              <div className="border w-full md:w-[270px] lg:w-[404px] border-solid border-[#D9D9D9] rounded-[8px] p-3 flex flex-col justify-center">
                <div className="flex items-center">
                  <Image
                    src="/assets/images/flowbite_expand-outline.svg"
                    alt="Expand icon"
                    width={25}
                    height={25}
                  />
                  <h3 className="text-[#2E604A] font-medium ml-[10px]">
                    Expand Your Offerings
                  </h3>
                </div>
                <p className="text-start">
                  Enhance your product suite with a trusted reconciliation
                  solution that adds value to your clients
                </p>
              </div>

              <div className="border w-full md:w-[270px] lg:w-[404px] border-solid border-[#D9D9D9] rounded-[8px] p-3 flex flex-col justify-center">
                <div className="flex items-center">
                  <Image
                    src="/assets/images/checkfeat.svg"
                    alt="check for Drive customer sucess"
                    width={25}
                    height={25}
                  />
                  <h3 className="text-[#2E604A] font-medium ml-[10px]">
                    Drive Customer Success
                  </h3>
                </div>
                <p className="text-start">
                  Equip your users with tools to achieve accurate, timely
                  financial reporting.
                </p>
              </div>
            </div>

            {/* Second row */}
            <div className="flex justify-center flex-col md:flex-row  gap-4 lg:gap-[38px] mt-7 lg:mt-11 w-full">
              <div className="border w-full md:w-[270px] lg:w-[404px] border-solid border-[#D9D9D9] rounded-[8px] p-3 flex flex-col justify-center">
                <div className="flex items-center">
                  <Image
                    src="/assets/images/fluent-mdl2_market.svg"
                    alt="upward rising arrow image"
                    width={25}
                    height={25}
                  />
                  <h3 className="text-[#2E604A] font-medium ml-[10px]">
                    Market Reach
                  </h3>
                </div>
                <p className="text-start">
                  Collaborate with us to tap into new markets and expand your
                  customer base. Our strong brand in the industry can help
                  elevate your business.
                </p>
              </div>

              <div className="border w-full md:w-[270px] lg:w-[404px] border-solid border-[#D9D9D9] rounded-[8px] p-3 flex flex-col justify-center">
                <div className="flex items-center">
                  <Image
                    src="/assets/images/support_agent.svg"
                    alt="support agent icon"
                    width={25}
                    height={25}
                  />
                  <h3 className="text-[#2E604A] font-medium ml-[10px]">
                    Dedicated Support
                  </h3>
                </div>
                <p className="text-start">
                  We prioritize our partners&apos; success. Out team is
                  committed to providing the support and resources you need to
                  maximise the benefits of our partnership.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-7 py-10 mx-auto max-w-7xl flex flex-col items-center">
          <h3 className="py-10 text-3xl font-semibold text-[#333333]">
            Partner Opportunities
          </h3>
          <ul className="list-none flex flex-col items-center lg:items-start ml-1 lg:ml-[16px] px-5 sm:px-10">
            {opportunities.map((opportunity, index) => {
              if (opportunity.startsWith("Referral Partners:")) {
                const [title, ...description] = opportunity.split(":");
                return (
                  <li
                    key={index}
                    className="flex items-center mb-4 lg:mb-[20px]"
                  >
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-5"
                    >
                      <path
                        d="M16 0L20.3218 11.6782L32 16L20.3218 20.3218L16 32L11.6782 20.3218L0 16L11.6782 11.6782L16 0Z"
                        fill="#2E604A"
                      />
                    </svg>

                    <span className="text-base lg:text-[18px]">
                      <span className="font-bold">{title}:</span>
                      {description.join(":")}
                    </span>
                  </li>
                );
              }
              // Otherwise, render the opportunity normally
              return (
                <li key={index} className="flex items-center mb-4 lg:mb-[20px]">
                  <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                  <span className="text-base lg:text-[18px] text-[#475467]">
                    {opportunity}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="my-10 flex flex-col gap-11 bg-[#FBFEFD] py-7 mx-auto max-w-7xl text-center">
          <h3 className="m-0 text-3xl font-semibold text-[#333333]">
            What We Offer Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <StarsIcon className="text-[#297B65] mr-3 w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-medium text-[#2E604A]">
                  Technical Support
                </h3>
              </div>
              <p className="text-start text-sm">
                Access to developer resources, documentation and a responsive
                engineering team.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <StarsIcon className="text-[#297B65] mr-3 w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-medium text-[#2E604A]">
                  Marketing Resources
                </h3>
              </div>
              <p className="text-start text-sm">
                Ready-to-use collateral, case studies, and tailored campaigns to
                amplify your outreach.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <StarsIcon className="text-[#297B65] mr-3 w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-medium text-[#2E604A]">Training</h3>
              </div>
              <p className="text-start text-sm">
                Onboarding sessions and ongoing education to ensure your team
                maximizes ReconXi&apos;s potential.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
