'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../lib/utils'
import Container from './Container'

const whoCanUseContent = [
  {
    id: 1,
    title: 'Small Businesses',
    content:
      'Save time and reduce financial stress with automated reconciliation. ReconXi helps small businesses identify discrepancies, and maintain accurate records—so you can focus on growing your business.',
    linkUrl: '/startup-and-sme',
  },
  {
    id: 2,
    title: 'Banks and Financial Institutions',
    content:
      'ReconXi helps banks and financial institutions by automating reconciliation processes, ensuring accurate financial records, and reducing the time spent on manual tasks. With user-friendly tools, ReconXi makes handling large volumes of data manageable and reliable for everyone involved.',
    linkUrl: '/financial-pro',
  },
  {
    id: 3,
    title: 'Accounting and Audit Firms',
    content:
      'ReconXi helps accounting and audit firms automate financial reconciliation, reducing manual work, minimizing errors, and ensuring compliance with financial regulations. Its AI-powered matching improves accuracy, allowing firms to focus on higher-value financial analysis and decision-making.',
    linkUrl: '/accounting',
  },
  {
    id: 4,
    title: 'Schools & Educational Institutions',
    content:
      'ReconXi simplifies fee and expense reconciliation for better financial management. ReconXi helps schools and Educational institutions automate the reconciliation of fees, payroll, and other financial records, minimizing manual work and reducing the risk of errors.',
    linkUrl: '/school-and-education',
  },
  {
    id: 5,
    title: 'Cooperations(Finance Department)',
    content:
      'ReconXi assists corporations by automating the reconciliation process within finance departments. It helps teams accurately track financial data and reduces the time spent on manual tasks. This allows finance professionals to focus on critical analysis and decision-making, fostering better financial oversight and collaboration across the organization.',
    linkUrl: '/finance',
  },
]

const WhoCanUse = () => {
  return (
    <section className="bg-white px-8 py-8 md:bg-[#F5F5F5] md:py-24">
      <Container>
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Who can use ReconXi?
        </h2>
        <p className="mx-auto mt-6 max-w-[1002px] text-sm text-[#475467] md:text-center md:text-base">
          ReconXi is designed to simplify financial reconciliation for
          professionals and organizations of all sizes. <br /> Whether
          you&apos;re a financial professional managing complex data, a small
          business owner, or an educational institution, ReconXi provides a
          fast, accurate, and hassle-free solution.
        </p>
        <div className="mt-12 flex-wrap justify-center gap-x-6 gap-y-6 max-md:space-y-6 md:flex">
          {whoCanUseContent.map(({ id, title, content, linkUrl }) => (
            <article
              key={id}
              className={cn(
                'flex flex-col justify-between rounded-[12px] md:bg-white md:p-8 lg:w-[500px]'
              )}
            >
              <div>
                <h2 className="font-bold md:text-xl">{title}</h2>
                <p className="mt-4 mb-8 text-sm text-[#3B3E45] md:text-base">
                  {content}
                </p>
              </div>
              <Link
                className="group flex items-center gap-2 font-semibold text-[#2E604A]"
                href={linkUrl}
              >
                <span>Learn more</span>
                <ArrowRight className="size-4 transition duration-500 group-hover:translate-x-2" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WhoCanUse
