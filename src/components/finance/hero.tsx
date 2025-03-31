import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function HeroSection() {
  return (
    <section
      className="w-full px-0 pt-10 pb-5 md:pb-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <div className="flex flex-col items-center justify-center px-4 text-center lg:px-0">
        <h1 className="font-inter max-w-[1156px] text-center text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[45px] md:text-[50px] md:leading-[72px]">
          Simplify Financial Management with Automated Reconciliation
        </h1>
        <p className="font-inter mt-2 max-w-[1216px] text-center text-base leading-[1.5] font-normal text-[#475467] sm:text-lg md:mt-4 md:text-[20px] md:leading-[30px]">
          Ensure accurate and efficient reconciliation of diverse funding
          sources of Accounts Payable investments, and operational revenue using
          a cost-effective solution tailored for corporate finance teams
        </p>
        <Button
          variant="default"
          className="mt-6 rounded-lg bg-[#2E604A] px-6 py-6 text-base font-semibold text-white hover:bg-[#2E604A] md:mt-8"
        >
          Get Started for Free
        </Button>
        <Image
          src="/assets/images/finance-hero.png"
          alt="Finance Image"
          width={500}
          height={500}
          className="mt-8 h-auto w-full rounded-lg shadow-lg md:mt-12"
        />
      </div>
    </section>
  )
}
