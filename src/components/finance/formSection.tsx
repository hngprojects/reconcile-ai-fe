import WalkthroughForm from '@/components/accounting/EnterpriseForm'
import Image from 'next/image'
export default function FormSection() {
  return (
    <section
      className="w-full px-0 py-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16">
        <div className="w-full min-w-[300px] flex-1">
          <Image
            src="/assets/images/ready-enterprise.svg"
            alt="Visual representation of ReconXi's reconciliation process"
            width={680}
            height={850}
            className="h-auto w-full rounded-lg"
          />
        </div>

        <div className="w-full flex-1 items-center space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h2
              id="ready-section-title"
              className="font-inter text-center text-[27px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[30px] md:leading-[74px]"
            >
              Get a Personalized Walkthrough
            </h2>
          </div>

          <div
            className="mx-auto rounded-lg"
            aria-label="Start free trial form"
          >
            <div>
              <WalkthroughForm buttonText="Get A Free Demo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
