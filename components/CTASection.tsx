import React from "react";
import Link from "next/link";
import Container from "./Container";

const CTASection = () => {
  return (
    <div className="bg-gray-50 sm:bg-white">
      <Container className="py-8">
        <div className="flex flex-col items-start gap-8 sm:gap-10 bg-gray-50 justify-between px-5 py-10 sm:p-16 sm:rounded-xl sm:flex-row sm:px-7 sm:py-12">
          <div className="space-y-2 sm:space-y-4 md:w-2/3">
            <p className="font-bold text-gray-900 text-2xl sm:text-3xl">
              Try it for Free
            </p>
            <p className="text-[#475467] text-lg max-w-[43rem]">
              We are offering it completely free for a limited time Get access
              to all features while we continue to improve.
            </p>
          </div>
          <Link
            className="bg-primary w-full sm:w-fit py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-white hover:bg-primary/90 flex"
            href="/sign-up"
          >
            Get Started
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CTASection;
