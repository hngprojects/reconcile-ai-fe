import Image from "next/image"
import {Button} from "@/src/components/ui/button"
export default function HeroSection() {
    return (
        <section
        className="w-full pb-5 md:pb-20 pt-10 px-0 lg:px-20"
        aria-labelledby="features-heading"
        >
            <div className="flex flex-col items-center justify-center text-center px-4 lg:px-0">
                <h1 className="max-w-[1156px] text-center font-inter text-[28px] sm:text-[45px] md:text-[50px] leading-[1.2] md:leading-[72px] tracking-[-0.02em] font-semibold text-[#101828]">Simplify Financial Management with Automated Reconciliation</h1>
                <p className="max-w-[1216px] text-center font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] font-normal text-[#475467] mt-2 md:mt-4">
                    Ensure accurate and efficient reconciliation of diverse funding sources 
                    of Accounts Payable investments, and operational revenue using a cost-effective solution 
                    tailored for corporate finance teams
                </p>
                <Button variant="default" className="bg-[#2E604A] text-white hover:bg-[#2E604A] mt-6 md:mt-8 px-6 py-6 rounded-lg text-base font-semibold">
                    Get Started for Free    
                </Button>
                <Image
                    src="/assets/images/finance-hero.png"
                    alt="Finance Image"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg w-full h-auto mt-8 md:mt-12"
                />
            </div>
        </section>
    )
}