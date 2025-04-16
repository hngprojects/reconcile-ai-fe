'use client'
import Image from 'next/image'
import { CheckCircle2Icon } from 'lucide-react'
import Container from './Container'
import { FileIcon, SpeedIcon } from './Icon/Icons'

const Features = () => {
  const firstFeature = [
    'Leverage automation to move fast',
    'Easy upload feature',
  ]
  const secondFeature = [
    'Instant transaction matching',
    'Clear status indicators: Matched, Unmatched',
    'Instant data export in CSV format.',
    'Unlink matched records.',
  ]

  return (
    <section>
      <Container className="px-4 py-12 sm:py-16 md:px-8 lg:px-16">
        <div className="mb-6 flex flex-col items-center justify-center text-center sm:mb-8">
          <h3 className="mb-2 text-3xl leading-snug font-semibold tracking-tight text-[#101828] sm:text-4xl sm:leading-11 md:text-5xl md:leading-tight">
            Simple Steps to Get Started
          </h3>
          <p className="max-w-[768px] text-base text-[#475467] sm:text-lg">
            Self-serve product to help you reconcile your bank statement and
            company ledger with AI.
          </p>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:gap-16">
          {/* First Feature */}
          <div className="flex w-full flex-col items-center text-center sm:mt-6 sm:items-start sm:text-left lg:mt-9">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-7 border-[#C8FFE6] bg-[#B0F1D4]">
              <FileIcon />
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-[#101828] sm:text-3xl">
              Upload Financial & Customer Records
            </h3>

            <p className="mb-4 max-w-[560px] text-base text-[#475467] sm:text-lg">
              Upload bank statement and company ledger in just a few clicks. The
              only supported file format is CSV.
            </p>

            <ul className="flex list-none flex-col items-start gap-2 self-start">
              {firstFeature.map((feature, index) => (
                <li key={index} className="flex items-start pl-4 text-start">
                  <CheckCircle2Icon
                    className="text-primary mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[#475467] sm:text-lg">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* First Image */}
          <div className="relative flex h-64 w-full items-center justify-center sm:h-80 lg:h-[400px]">
            <Image
              src="/assets/images/picture1.png"
              fill
              alt="file upload page"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex w-full flex-col-reverse items-start justify-between gap-12 pt-8 lg:flex-row lg:gap-16 lg:pt-16">
          {/* Second Image */}
          <div className="relative flex h-64 w-full items-center justify-center sm:h-80 lg:h-[400px]">
            <Image
              src="/assets/images/picture2.png"
              fill
              alt="Reconciliation dashboard"
              className="object-contain"
            />
          </div>

          {/* Second Feature */}
          <div className="flex w-full flex-col items-center text-center sm:mt-6 sm:items-start sm:text-left lg:mt-9">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-7 border-[#C8FFE6] bg-[#B0F1D4]">
              <SpeedIcon />
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-[#101828] sm:text-3xl">
              Let AI do the Work
            </h3>

            <p className="mb-4 max-w-[560px] text-base text-[#475467] sm:text-lg">
              Watch as AI automatically matches your records.
            </p>

            <ul className="flex list-none flex-col items-start gap-2 self-start">
              {secondFeature.map((feature, index) => (
                <li key={index} className="flex items-start pl-4 text-start">
                  <CheckCircle2Icon
                    className="text-primary mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[#475467] sm:text-lg">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Features
