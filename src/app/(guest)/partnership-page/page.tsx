import React from 'react';
import Footer from '@/src/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Expand, Headset, HeadsetIcon, Layers, LecternIcon, LightbulbIcon, StarsIcon, TrendingUp } from "lucide-react";

export default function PartnershipPage() {
  const opportunities = [
    "Referral Partners: Expand your portfolio by offering ReconXi solutions to your clients, backed by training and marketing resources.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.",
    "Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence."
  ];

  return (
    <div className='font-inter'>
      <div className='flex justify-center items-center mx-auto max-w-7xl text-center '>
        <div className="flex flex-col-reverse px-3 m-auto sm:px-0 sm:flex-row lg:items-center text-center sm:text-left gap-[32px] flex-1 bg-[#FBFEFD]">
          <div className="flex flex-col items-start gap-[24px] w-full sm:pt-10 lg:mt-0">
            <div className="flex flex-col items-start gap-[16px] self-stretch bg-[#FBFEFD]">
              <h1 className="text-[#101828] w-full font-inter text-3xl sm:text-4xl font-semibold text-center">
                Join us in winning a partnership
              </h1>
              <p className="text-[#475467] font-inter sm:text-base lg:text-lg">
                At ReconXi, we are dedicated to transforming the way businesses manage their financial reconciliation processes. 
                By partnering with us, you can enhance your offerings and provide added value to your clients while benefiting from our solution.
              </p>

              <Link
              className="bg-primary whitespace-nowrap w-full sm:w-fit  py-5 px-5 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex"
              href="/"
            >
              Partner With Us
            </Link>
            </div>
          </div>
          <div className="w-full">
            <Image
              src="/assets/images/partnership.png"
              alt="screen mockup"
              width={536}
              height={410}
              className="flex-shrink-0 rounded-[10px] bg-[50%] bg-cover bg-no-repeat border-[#101828] object-cover max-w-full h-auto"
            />
          </div>
        </div>
      </div>


      <div className='my-10 mx-auto max-w-7xl text-center'>
        <h3 className="text-4xl py-3 font-semibold mb-2 sm:mb-4 text-[#101828] leading-11 tracking-[-0.02em] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px]">
            Why Partner With ReconXi?
        </h3>

        <div className=' flex flex-col lg:flex-row justify-between sm:gap-10 items-center lg:items-start ml-1 lg:ml-[16px]'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:w-fit sm:gap-7 lg:gap-25 w-fit items-center'>
            <div className='border border-solid border-[#D9D9D9] my-4 w-[93%] max-w-[450px] sm:w-full sm:my-0 rounded-xl p-3 h-36 sm:h-32 flex flex-col'>
                <div className='flex items-center pb-2 text-[#2E604A] font-semibold'>
                    <LightbulbIcon className="text-[#297B65] mr-3 w-6 h-6" />
                    <h3>Inovative Solutions</h3>
                </div>
                <p className='text-start text-sm md:text-base w-full md:w-84 text-[#4A4A4A]'>Our platform combines advanced technology with user-friendly features, allowing businesses to reconcile their accounts quickly.</p>
            </div>
            <div className='border border-solid border-[#D9D9D9] my-4 w-[93%] max-w-[450px] sm:w-full sm:my-0 rounded-xl p-3 h-32 flex flex-col'>
                <div className='flex items-center pb-3 text-[#2E604A] font-semibold'>
                    <Expand className="text-[#297B65] mr-3 w-6 h-6" />
                    <h3>Expand Your Offerings</h3>
                </div>
                <p className='text-start text-sm md:text-base w-full sm:w-80 text-[#4A4A4A]'>Enhance your product suite with a trusted reconciliation solution that adds value to your clients</p>
            </div>
          </div>
          <div className='border border-solid border-[#D9D9D9] my-4 w-[93%] max-w-[420px] sm:my-0 sm:w-fit rounded-xl p-3 h-32 flex flex-col '>
              <div className='flex items-center pb-3 text-[#2E604A] font-semibold'>
                  <BadgeCheck className="text-[#297B65] mr-3 w-6 h-6" />
                  <h3>Drive Customer Success</h3>
              </div>
              <p className='text-start text-sm md:text-base w-full sm:w-80 text-[#4A4A4A]'>Equip your users with tools to achieve accurate, timely financial reporting.</p>
          </div>
        </div>

        <div className='flex flex-col gap-5 sm:flex-row sm:justify-center items-center sm:mt-5 lg:items-start ml-1 lg:ml-[16px] py-5 lg:gap-10'>
          <div className='border border-solid border-[#D9D9D9] rounded-xl p-3 w-[93%] max-w-[420px] sm:w-fit'>
              <div className='flex items-center pb-3 text-[#2E604A] font-semibold'>
                  <TrendingUp className="text-[#297B65] mr-3 w-6 h-6" />
                  <h3>Market Reach</h3>
              </div>
              <p className='text-start text-sm md:text-base w-full sm:w-80 text-[#4A4A4A]'>Collaborate with us to tap into new markets and expand your customer base. Our strong brand in the industry can help elevate your business.</p>
          </div>
          <div className='border border-solid border-[#D9D9D9] rounded-xl p-3 w-[93%] max-w-[420px] sm:w-fit'>
              <div className='flex items-center pb-3 text-[#2E604A] font-semibold'>
                  <Headset className="text-[#297B65] mr-3 w-6 h-6" />
                  <h3>Dedicated Support</h3>
              </div>
              <p className='text-start text-sm md:text-base text-wrap sm:w-86 text-[#4A4A4A]'>We prioritize our partners’ success. Out team is committed to providing the support and resources you need to maximise the benefits of our partnership.</p>
          </div>
        </div>
      </div>



        <div className='mx-auto max-w-7xl text-center'>
            <h3 className='py-5 text-3xl font-bold text-[#333333]'>Partner Opportunities</h3>
            <ul className="list-none flex flex-col items-center lg:items-start ml-1 lg:ml-[16px] sm:px-10">
                {opportunities.map((opportunity, index) => {
                if (opportunity.startsWith("Referral Partners:")) {
                    const [title, ...description] = opportunity.split(":");
                    return (
                    <li key={index} className="flex mb-4 sm:mb-7 lg:mb-[20px] text-start items-start">
                      <StarsIcon className="text-[#297B65] mr-3 w-12 sm:w-6 h-6" />
                      <span className="text-sm sm:text-base px-2 lg:text-[18px]">
                        <span className='font-bold'>{title}:</span>{description.join(":")}
                      </span>
                    </li>
                    );
                }
                })}
            </ul>
        </div>

      <div className='my-10 bg-[#FBFEFD] py-7 mx-auto max-w-7xl text-center'>
        <h3 className='font-bold text-3xl pb-10 text-[#333333]'>What We Offer Partners</h3>
        <div className='flex flex-col justify-between lg:flex-row sm:justify-between lg:items-center ml-1 lg:ml-[16px]'>
            <div className='lg:w-full flex flex-col sm:flex-row justify-between sm:justify-evenly items-center md:gap-15'>
              <div className='my-3 sm:my-0 w-[93%] max-w-[420px]'>
                <div className='flex items-center mb-2 text-[#2E604A] font-semibold'>
                  <Headset className="text-[#297B65] mr-3 w-6 h-6" />
                  <h3>Technical Support</h3>
                </div>
                <p className='text-start w-full sm:w-80 text-[#4A4A4A]'>Access to developer resources, documentation and a responsive engineering team.</p>
              </div>
              <div className='my-3 sm:my-0 w-[93%] max-w-[420px]'>
                <div className='flex items-center mb-3 text-[#2E604A] font-semibold'>
                  <Layers className="text-[#297B65] mr-3 w-6 h-6" />
                  <h3>Marketing Resources</h3>
                </div>
                <p className='text-start w-full sm:w-80 text-[#4A4A4A]'>Ready-to-use collateral, case studies, and tailored campaigns to amplify your outreach.</p>
              </div>
            </div>
            <div className='my-3 sm:my-0 flex flex-col sm:w-fit mx-auto sm:mt-4 w-[93%] max-w-[420px]'>
              <div className='flex items-center mb-3 text-[#2E604A] font-semibold'>
                <LecternIcon className="text-[#297B65] mr-3 w-6 h-6" />
                <h3 className='text-start'>Training</h3>
              </div>
              <p  className='text-start w-full sm:w-80 text-[#4A4A4A]'>Onboarding sessions and ongoing education to ensure your team maximizes ReconXi’s potential.</p>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
