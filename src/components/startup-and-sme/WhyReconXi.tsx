'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
}

function FeatureCard({ title, description, imageSrc }: FeatureCardProps) {
  return (
    <div className="flex h-[490px] flex-col overflow-hidden rounded-md border border-gray-200 bg-[#FBFBFB] p-2 shadow-lg sm:w-[368px] md:mx-auto">
      <div className="relative h-3/4 w-full">
        <Image
          src={imageSrc || '/placeholder.svg'}
          alt={title}
          width={368}
          height={480}
          className="h-full w-full rounded-t-md object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-[18px] font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default function Features1() {
  const features = [
    {
      title: 'Automated Transaction Reconciliation',
      description:
        'ReconXi AI quickly scans and reconciles transactions, reducing errors and saving time.',
      imageSrc: '/assets/images/feature1.png',
    },
    {
      title: 'Accurate Business Reconciliation',
      description:
        'Identify missing payments, duplicate transactions, and discrepancies instantly, keeping your financial records clean and up to date.',
      imageSrc: '/assets/images/feature2.png',
    },
    {
      title: 'Cost-Effective',
      description:
        "Whether you're a startup or a growing business, ReconXi is designed to support your financial operations without breaking the bank.",
      imageSrc: '/assets/images/feature3.png',
    },
  ]

  return (
    <section
      className="w-full px-0 py-12 md:py-20"
      aria-labelledby="features-title"
    >
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#292D32] md:text-4xl">
            Why Small Business Choose ReconXi
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            Managing finances shouldn&apos;t be overwhelming—transaction
            reconciliation should be simple, fast, and accurate. Here&apos;s how
            ReconXi helps:
          </p>
        </div>

        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:items-start xl:mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
