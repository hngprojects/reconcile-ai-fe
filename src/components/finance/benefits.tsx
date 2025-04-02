import Image from 'next/image'
export default function Benefits() {
  const benefits = [
    {
      title: 'Accurate & Fast Reconciliation',
      description:
        'Eliminate discrepancies and speed up financial reconciliation.',
    },
    {
      title: 'Automated Bank Reconciliation',
      description: 'Reduce manual errors and improve efficiency.',
    },
    {
      title: 'Audit-Ready Statements',
      description: 'Maintain financial records that meet compliance standards.',
    },
    {
      title: 'Improved Financial Oversight',
      description: 'Keep track of every transaction with ease.',
    },
    {
      title: 'Secure & Reliable',
      description:
        'Protect sensitive financial data and ensure accuracy in reporting.',
    },
  ]
  return (
    <section
      className="w-full px-0 py-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="w-full">
          <h2 className="text-sm text-[#767676] md:text-base">BENEFITS</h2>
          <h1 className="mt-2 mb-6 text-2xl font-semibold text-[#292D32] md:text-4xl">
            Benefits of Using ReconXi for Accounting & Audit Firms
          </h1>
          <div className="mt-4 flex flex-col gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  {benefit.title} - {benefit.description}
                </p>
              </div>
            ))}
          </div>
          <button
            // onClick={handleDemoClick}
            className="mt-6 cursor-pointer rounded-[8px] bg-[#2E604A] px-5 py-2 text-white transition hover:opacity-75 md:mt-10 md:px-6 md:py-3"
          >
            Book A Demo
          </button>
        </div>
        {/* Image - Moves to top on mobile */}
        <div className="w-full" role="presentation">
          <Image
            src="/assets/images/employee-working-marketing-setting.png"
            alt="Enterprise reconciliation features visualization"
            width={605}
            height={544}
            className="h-auto w-full rounded-lg"
            priority={false}
          />
        </div>
      </div>
    </section>
  )
}
