"use client";
import React from "react";
import Image from "next/image";
import TypeWriterButton from "./buttons/TypeWriterButton";
import { useAuth } from "./context/AuthContext";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="overflow-x-hidden pt-8 md:pt-0">
      <div className="flex flex-col lg:flex-row items-center md:h-[602px] w-screen max-md:p-4 md:pl-14 max-w-[90rem] mx-auto overflow-hidden max-md:text-center gap-8">
        <div className="flex flex-col items-center md:items-start w-full">
          <h1 className="font-semibold text-[28px] md:text-4xl text-[#101828] max-w-[1024px] flex-wrap lg:leading-[3.5rem] lg:text-5xl leading-[-2]">
            Reconcile Your
            <br className="hidden md:block" /> Finances with Ease
          </h1>
          <p className="text-[#475467] text-sm sm:text-xl max-w-[620px] text-left mt-6 md:pr-8 max-md:text-center">
            ReconXi simplifies financial reconciliation for accountants,
            auditors, financial analysts, small businesses, and schools. Whether
            you’re managing transactions, handling business accounts, or
            reconciling school fees and payroll, experience a faster, more
            accurate way to reconcile your finances.
          </p>
          <div className="flex flex-col items-center justify-center w-[245px] gap-6 my-6 sm:flex-row mt-8">
            <TypeWriterButton
              path={isAuthenticated ? "/dashboard" : "/file-upload"}
              aria-label={
                isAuthenticated
                  ? "Access Your Dashboard"
                  : "Get Started For Free"
              }
              text={
                isAuthenticated
                  ? "Access Your Dashboard"
                  : "Get Started For Free"
              }
              className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex cursor-pointer mr-auto"
            />
          </div>
        </div>

        {/* Hero Image for desktop */}
        <div className="lg:flex items-center w-full relative h-full hidden">
          <Image
            src="/assets/images/iPhone_mockup.png"
            alt="Iphone mockup"
            width={314}
            height={440}
            className="object-contain absolute right-[22rem] z-10 top-[8rem] transition-transform duration-700 ease-in-out hover:scale-110"
            quality={75}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
          />
          <Image
            src="/assets/images/screen_mockup.png"
            alt="Big screen mockup"
            width={621}
            height={782}
            className="object-contain absolute right-0 bottom-0 transition-transform duration-700 ease-in-out hover:scale-105"
            quality={75}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
          />
        </div>

        {/* Hero Image for mobile */}
        <div className="lg:hidden px-10 w-full relative">
          <Image
            src="/assets/images/iPhone_mockup.png"
            alt="Iphone mockup"
            width={180}
            height={252}
            className="object-contain transition-transform duration-700 ease-in-out hover:scale-110 absolute z-10 top-6"
            quality={75}
            priority={true}
          />
          <Image
            src="/assets/images/screen_mockup.png"
            alt="Big screen mockup"
            width={250}
            height={315}
            className="object-contain transition-transform duration-700 ease-in-out hover:scale-105"
            quality={75}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}