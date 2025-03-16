import React from 'react';
import Footer from '@/src/components/Footer';
import Image from 'next/image';
import { StarsIcon } from "lucide-react";

export default function PartnershipPage() {
  const opportunities = [
    "Referral Partners: Expand your portfolio by offering ReconXi solutions to your clients, backed by training and marketing resources.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence."
  ];

  return (
    <div className='mx-auto max-w-7xl text-center'>
      <div className='flex justify-center items-center'>
        <div className="flex items-center text-center sm:text-left gap-[32px] flex-1">
          <div className="flex flex-col items-start gap-[24px] w-full">
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              <h1 className="text-[#101828] font-inter text-3xl sm:text-4xl font-semibold">
                Join us in winning a partnership
              </h1>
              <p className="text-[#475467] font-inter sm:text-lg">
                At ReconXi, we are dedicated to transforming the way businesses manage their financial reconciliation processes. 
                By partnering with us, you can enhance your offerings and provide added value to your clients while benefiting from our solution.
              </p>
            </div>
          </div>
          <div className="relative md:h-[500px] h-[300px] w-full max-w-[536px]">
            <Image
              src="/assets/images/screen-mockup.png"
              alt="screen mockup"
              width={536}
              height={410}
              className="flex-shrink-0 rounded-[10px] bg-gray-300 bg-[50%] bg-cover bg-no-repeat border-[4px] border-[#101828] object-contain max-w-full h-auto"
            />
          </div>
        </div>
      </div>


      <div className='my-10'>
        <h3 className="text-4xl font-semibold mb-2 sm:mb-4 text-[#101828] leading-11 tracking-[-0.02em] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px]">
            Why Partner With ReconXi?
        </h3>

        <div className='flex justify-between items-center lg:items-start ml-1 lg:ml-[16px]'>
                <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-36 flex flex-col justify-center'>
                    <div className='flex items-center'>
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <h3>Inovative Solutions</h3>
                    </div>
                    <p className='text-start w-80'>Our platform combines advanced technology with user-friendly features, allowing businesses to reconcile their accounts quickly.</p>
                </div>
                <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-36 flex flex-col justify-center'>
                    <div className='flex items-center'>
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <h3>Expand Your Offerings</h3>
                    </div>
                    <p className='text-start w-80'>Enhance your product suite with a trusted reconciliation solution that adds value to your clients</p>
                </div>
                <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-36 flex flex-col justify-center'>
                    <div className='flex items-center'>
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <h3>Drive Customer Success</h3>
                    </div>
                    <p className='text-start w-80'>Equip your users with tools to achieve accurate, timely financial reporting.</p>
                </div>
        </div>

        <div className='flex justify-center items-center lg:items-start ml-1 lg:ml-[16px] py-5 gap-20'>
                <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3'>
                    <div className='flex items-center'>
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <h3>Market Reach</h3>
                    </div>
                    <p className='text-start w-80'>Collaborate with us to tap into new markets and expand your customer base. Our strong brand in the industry can help elevate your business.</p>
                </div>
                <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3'>
                    <div className='flex items-center'>
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <h3>Dedicated Support</h3>
                    </div>
                    <p className='text-start w-80'>We prioritize our partners’ success. Out team is committed to providing the support and resources you need to maximise the benefits of our partnership.</p>
                </div>
        </div>
      </div>



        <div className='my-10 bg-[#FBFEFD] py-10'>
            <h3 className='py-10 text-3xl'>Partner Opportunities</h3>
            <ul className="list-none flex flex-col items-center lg:items-start ml-1 lg:ml-[16px] px-10">
                {opportunities.map((opportunity, index) => {
                if (opportunity.startsWith("Referral Partners:")) {
                    const [title, ...description] = opportunity.split(":");
                    return (
                    <li key={index} className="flex items-center mb-4 lg:mb-[20px]">
                        <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                        <span className="text-base lg:text-[18px]">
                        <span className='font-bold'>{title}:</span>{description.join(":")}
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

      <div className='my-10'>
        <h3>What We Offer Partners</h3>
        <div className='flex justify-between lg:items-start ml-1 lg:ml-[16px]'>
            <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-32'>
                <div className='flex items-center'>
                    <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                    <h3>Technical Support</h3>
                </div>
                <p className='text-start w-80'>Access to developer resources, documentation and a responsive engineering team.</p>
            </div>
            <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-32'>
                <div className='flex items-center'>
                    <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                    <h3>Marketing Resources</h3>
                </div>
                <p className='text-start w-80'>Ready-to-use collateral, case studies, and tailored campaigns to amplify your outreach.</p>
            </div>
            <div className='border border-solid border-[#D9D9D9] rounded-2xl p-3 h-32'>
                <div className='flex items-center'>
                    <StarsIcon className="text-[#297B65] mr-3 w-6 h-6" />
                    <h3>Training</h3>
                </div>
                <p  className='text-start w-80'>Onboarding sessions and ongoing education to ensure your team maximizes ReconXi’s potential.</p>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
