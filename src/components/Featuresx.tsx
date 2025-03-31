import { CheckCircle2Icon } from 'lucide-react'
import Image from 'next/image'

const FeaturesSection = () => {
  const features = [
    'Leverage automation to move fast',
    'Easy drag-and-drop uploads',
  ]

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-600">How it Works</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Analytics that feels like it&apos;s from the future
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users.
          </p>
        </div>
      </section>
      <div className="flex w-full flex-col items-center justify-between px-8 py-8 lg:flex-row lg:px-0 lg:py-0 lg:pl-[80px]">
        <div className="mb-8 flex w-full flex-col lg:mb-0 lg:w-1/2 lg:pr-[96px]">
          <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#AEEACA] lg:mb-[12px]">
            <Image
              src="./assets/images/feature-icon.svg"
              width={19}
              height={19}
              alt="Feature Icon"
            />
          </div>
          <h3 className="mb-4 text-center text-2xl font-semibold text-[#101828] lg:mb-[16px] lg:text-left lg:text-[30px]">
            Upload Financial & Customer Records
          </h3>
          <p className="mb-6 text-center text-base text-[#475467] lg:mb-[32px] lg:text-left lg:text-[18px]">
            Effortlessly upload financial statements and customer records in
            just a few clicks. Supported file formats: CSV.
          </p>
          <ul className="ml-1 flex list-none flex-col items-center lg:ml-[16px] lg:items-start">
            {features.map((feature, index) => (
              <li key={index} className="mb-4 flex items-center lg:mb-[20px]">
                <CheckCircle2Icon className="mr-3 h-6 w-6 text-[#297B65]" />
                <span className="text-base text-[#475467] lg:text-[18px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full overflow-hidden lg:ml-[-96px] lg:w-1/2">
          <div className="relative h-[300px] w-full lg:h-[512px] lg:w-[768px]">
            <Image
              src="/assets/images/Features-3-image.png"
              fill
              alt="Reconciliation dashboard"
              className="rounded-[10px] border-[4px] border-[#101828] object-cover object-left"
              style={{ objectPosition: 'left' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesSection
