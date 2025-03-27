import WalkthroughForm from "@/src/components/accounting/EnterpriseForm";
import Image from "next/image";
export default function FormSection(){
    return (
        <section
        className="w-full py-20 px-0 lg:px-20"
        aria-labelledby="features-heading"
      >
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="flex-1 w-full min-w-[300px]">
            <Image
                src="/assets/images/ready-enterprise.svg"
                alt="Visual representation of ReconXi's reconciliation process"
                width={680}
                height={850}
                className="w-full h-auto rounded-lg"
            />
            </div>
                        
            <div className="flex-1 w-full items-center space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                    <h2
                    id="ready-section-title"
                    className="font-inter text-[27px] text-center sm:text-[32px] md:text-[30px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
                    >
                    Get a Personalized Walkthrough
                    </h2>
                </div>

                <div
                    className="rounded-lg mx-auto"
                    aria-label="Start free trial form"
                >
                    <div
                    >
                    <WalkthroughForm buttonText="Get A Free Demo"/>
                    </div>
                </div>
            </div>
        </div>
      </section>
    )
}