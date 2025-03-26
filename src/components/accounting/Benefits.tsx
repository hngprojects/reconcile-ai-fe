"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { smoothScroll } from "@/src/utils/smoothScroll";

export default function Benefits() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("demo-form");
  };

  return (
    <section
      className="w-full py-20 px-0 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full">
                <h2 className="text-[#767676] text-sm md:text-base">BENEFITS</h2>
                <h1 className="text-[#292D32] text-2xl md:text-4xl mt-2 mb-6 font-semibold">Benefits of Using ReconXi for Accounting & Audit Firms</h1>
                <div className="flex flex-col gap-4 mt-6 md:mt-12">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl font-medium">Accurate & Fast Reconciliation – Eliminate discrepancies and speed up financial reporting.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl  font-medium">Automated Bank Reconciliation – Reduce manual errors and improve efficiency.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl  font-medium">Audit-Ready Statements – Maintain financial records that meet compliance standards.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl  font-medium">Improved Financial Oversight – Keep track of every transaction with ease.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl  font-medium">Secure & Reliable – Protect sensitive financial data and ensure accuracy in reporting</p>                 
                  </div>
                </div>
                <button onClick={handleDemoClick} className="bg-[#2E604A] px-5 md:px-6 py-2 md:py-3 rounded-[8px] mt-6 md:mt-12 text-white cursor-pointer hover:opacity-75 transition">Book A Demo</button>
              </div>
          {/* Image - Moves to top on mobile */}
            <div
              className="w-full"
              role="presentation"
            >
              <Image
                src="/assets/images/employee-working-marketing-setting.png"
                alt="Enterprise reconciliation features visualization"
                width={605}
                height={544}
                className="w-full h-auto rounded-lg"
                priority={false}
              />
            </div>
    
        </div>
      </Container>
    </section>
  );
}
