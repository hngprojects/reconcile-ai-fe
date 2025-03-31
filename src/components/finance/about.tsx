import Image from 'next/image'
export default function About() {
  const features = [
    'Simplify your finances with smart reconciliation accounting.',
    'Automate bank reconciliation accounting – Reduce errors & save time.',
    'Simplify your account reconciliation statement – Accurate & fast.',
    'Stay audit-ready with stress-free account reconciliation statements.',
  ]
  return (
    <section
      className="w-full px-0 py-10 md:py-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <div className="flex flex-col justify-center gap-12 md:flex-row">
        <div className="w-full">
          <h2 className="text-sm text-[#767676] md:text-base">ABOUT US</h2>
          <h1 className="mt-2 mb-6 text-2xl text-[#292D32] md:text-4xl">
            What is ReconXi?
          </h1>
          <p className="text-sm text-[#767676] md:text-xl">
            ReconXi is built for accounting and audit firms to simplify
            reconciliation accounting. With precise financial tracking and
            automated reconciliation, firms can ensure compliance, eliminate
            discrepancies, and maintain accurate records for audits and
            reporting.
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Image - Moves to top on mobile */}
        <div className="w-full" role="presentation">
          <Image
            src="/assets/images/finance-about-us.png"
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
