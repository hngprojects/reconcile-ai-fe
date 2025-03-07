import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function HeroSection() {
  return (
    <section className="sm:bg-[#F9FAFB]">
      <Container className="py-4 sm:py-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-semibold text-[28px] sm:text-5xl text-[#101828] max-w-[1024px] flex-wrap lg:leading-[3.5rem] lg:text-[3rem]">
            AI-Powered Financial Reconciliation in Minutes, Not Hours
          </h1>
          <p className="text-[#475467] sm:text-xl max-w-[768px] mt-4">
            Reconcile your bank statement and company ledger with AI.
          </p>
          <div className="flex flex-col items-center justify-center w-full gap-6 my-6 sm:flex-row">
            {/* <Link
              className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center w-full sm:w-56 border border-primary h-12 text-sm text-primary hover:text-white hover:bg-primary flex"
              href="/"
            >
              Start Reconciliation
            </Link> */}
            <Link
              className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex"
              href="/file-upload"
            >
              Start Reconciliation
            </Link>
          </div>
          <Image
            src="/assets/images/hero-mockup.svg"
            alt="macbook mockup"
            width={621}
            height={387}
            className="mt-6 mb-2"
            quality={100}
          />
        </div>
      </Container>
    </section>
  );
}
