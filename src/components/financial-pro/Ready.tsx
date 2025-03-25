"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import DemoForm from "@/src/app/demo/demo-form";

export default function StartReconcile() {
  return (
    <section
      className="py-10 md:py-20 px-0 lg:px-20 bg-white"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-16 items-center">
          <div
            className="flex-1 w-full min-w-[300px]"
          >
            <Image
              src="/assets/images/ready-smallbusiness.svg"
              alt="Visual representation of ReconXi's reconciliation process"
              width={680}
              height={850}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div
            className="flex-1 w-full space-y-6 md:space-y-8 justify-center"
          >
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] text-center sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-base text-center sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Join thousands of small businesses using ReconXi&apos;s free
                bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div
              className="rounded-lg  mx-auto"
              aria-label="Start free trial form"
            >
              <div
                className="w-full"
              >
                <DemoForm buttonText="Get your Demo" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
