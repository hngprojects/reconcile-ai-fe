'use client'
import Image from 'next/image'
import { CheckCircle2Icon } from 'lucide-react'
import Container from './Container'
import { FileIcon, SpeedIcon } from './Icon/Icons'

const Features = () => {
  const firstFeature = ['Leverage AI to move fast', 'Easy upload feature']
  const secondFeature = [
    'Instant records matching',
    'Clear status indicators: Matched, Unmatched',
    'Export data quickly',
  ]

  return (
    <section>
      <Container className="px-4 py-16 md:px-16 lg:px-24">
        <div className="mb-9 flex flex-col items-center justify-center text-center sm:mb-12">
          <h3 className="mb-2 text-4xl leading-11 font-semibold tracking-[-0.02em] text-[#101828] sm:mb-4 sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px]">
            Simple Steps to Get Started
          </h3>
          <p className="max-w-[768px] text-[#475467] sm:text-lg">
            Self-serve product to help you reconcile your bank statement and
            company ledger with AI.
          </p>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-16 sm:flex-row">
          <div className="flex w-full flex-col items-center text-center sm:mt-9 sm:items-start sm:text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-7 border-[#C8FFE6] bg-[#B0F1D4]">
              <FileIcon />
            </div>

            <h3 className="mb-4 text-3xl font-semibold text-[#101828]">
              Upload Financial & Customer Records
            </h3>

            <p className="mb-6 max-w-[560px] text-[#475467] sm:text-lg">
              Upload bank statement and company ledger in just a few clicks. The
              only supported file format is CSV.
            </p>

            <ul className="flex list-none flex-col items-start gap-3 self-start">
              {firstFeature.map((feature, index) => (
                <li key={index} className="flex items-start pl-4 text-start">
                  <CheckCircle2Icon
                    className="text-primary mr-3 h-5 w-5 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <span className="text-[#475467] sm:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-[400px] w-full items-center">
            <Image
              src="/assets/images/picture1.png"
              fill
              alt="file upload page"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex w-full flex-col-reverse items-start justify-between gap-16 pt-10 sm:flex-row sm:pt-28">
          <div className="relative flex h-[400px] w-full items-center">
            <Image
              src="/assets/images/picture2.png"
              fill
              alt="Reconciliation dashboard"
              className="object-contain"
            />
          </div>

          <div className="flex w-full flex-col items-center text-center sm:mt-9 sm:items-start sm:text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-7 border-[#C8FFE6] bg-[#B0F1D4]">
              <SpeedIcon />
            </div>

            <h3 className="mb-4 text-3xl font-semibold text-[#101828]">
              Let AI do the Work
            </h3>

            <p className="mb-6 max-w-[560px] text-[#475467] sm:text-lg">
              Watch as AI automatically matches your records.
            </p>

            <ul className="flex list-none flex-col items-start gap-3 self-start">
              {secondFeature.map((feature, index) => (
                <li key={index} className="flex items-start pl-4 text-start">
                  <CheckCircle2Icon
                    className="text-primary mr-3 h-5 w-5 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <span className="text-[#475467] sm:text-lg">{feature}</span>
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
