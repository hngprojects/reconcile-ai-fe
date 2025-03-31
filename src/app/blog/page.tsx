'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { blogData } from '@/data/blogSampleData'
import Footer from '@/components/Footer'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from '@/components/Icon/Icons'
import Container from '@/components/Container'
import CTASection from '@/components/CTASection'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  // Calculate total pages
  const totalPages = Math.ceil(blogData.length / postsPerPage)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Container className="py-24 pt-12">
        <div className="mx-auto sm:w-11/12">
          <div>
            <div className="">
              <nav className="flex items-center justify-center">
                <motion.p
                  className="mb-6 rounded-[16px] bg-[#E6FFF2] px-3 py-1 text-[20px] text-[#2E604A]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  BLOG
                </motion.p>
              </nav>
            </div>
            {/* Blog Header */}
            <motion.div
              className="mx-auto mb-12 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="mx-auto my-4 max-w-[672px] px-2 text-center text-[36px] leading-[140%] font-[600] md:px-0 md:text-[48px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Stay Ahead with AI-Powered Financial Insights
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[800px] text-[16px] leading-[24px] font-[400] text-[#5C5C5C] md:text-[18px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover expert articles, trends, and best practices in
                financial reconciliation, AI automation, and accounting. Get
                insights that help you streamline operations and reduce errors.
              </motion.p>
            </motion.div>
          </div>

          <hr className="mx-auto flex w-full" />

          {/* Blog List Heading */}
          <motion.div
            className="pt-11"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-[20px] leading-[30px] font-semibold">
                All Blog Posts
              </h2>
            </div>
            {/* Blog Grid - 3 items per row */}
            <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <Link href={`/blog/${blog.id}`}>
                    <div className="group cursor-pointer overflow-hidden rounded-lg transition-transform hover:translate-y-[-5px] hover:shadow-xl">
                      <div className="relative h-60 w-full overflow-hidden rounded-[8px] bg-[#ddd] md:max-w-[405px]">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-all duration-300 group-hover:brightness-75"
                        />
                      </div>
                      <div className="flex flex-col px-2 md:px-4">
                        <div className="pt-[24px] pb-4">
                          <div className="mb-6 space-y-3">
                            <p className="text-[14px] leading-[20px] font-medium text-[#2E604A] lg:text-[14px] lg:leading-[20px] lg:font-semibold">
                              {blog.authorName} • {blog.publishedDate}
                            </p>
                            <div className="flex items-start gap-4">
                              <h3 className="line-clamp-2 w-auto text-[18px] leading-[140%] font-semibold text-[#333333] lg:text-[24px] lg:leading-[140%] lg:font-semibold">
                                {blog.title}
                              </h3>

                              <div className="mt-0.5">
                                <ArrowUpRightIcon />
                              </div>
                            </div>
                            <p className="line-clamp-3 text-[14px] leading-[24px] font-normal lg:text-[16px] lg:leading-[24px] lg:font-normal">
                              {blog.description}
                            </p>
                          </div>

                          <p className="relative inline-flex items-center truncate text-[14px] leading-[24px] font-medium text-[#333333] after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-[60%] after:bg-[#333333] after:transition-all after:duration-[500ms] after:ease-in-out after:content-[''] hover:after:w-full lg:text-[16px] lg:leading-[24px] lg:font-medium">
                            Read more
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <hr className="mx-auto mb-5 flex w-full" />

          {/* Updated Pagination with specific styling requirements */}
          {totalPages > 1 && (
            <motion.div
              className=""
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className={cn(
                    `flex cursor-pointer gap-1 px-4 py-2 text-[14px] font-[500] ${
                      currentPage === 1
                        ? 'cursor-default opacity-0'
                        : 'text-[#2A5743] hover:underline'
                    }`
                  )}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span className="hidden sm:block">Previous</span>
                </button>

                <div className="hidden space-x-3 sm:flex">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`cursor-pointer rounded-[8px] px-[12px] py-[7px] text-[14px] font-[500] text-[#2A5743] ${
                        currentPage === index + 1 ? 'bg-[#EAEFED]' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium text-[#344054] sm:hidden">
                  Page {currentPage} of {totalPages}
                </p>

                <button
                  onClick={() =>
                    paginate(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={cn(
                    `flex cursor-pointer gap-1 px-4 py-2 text-[14px] font-[500] ${
                      currentPage === totalPages
                        ? 'cursor-default opacity-0'
                        : 'text-[#2A5743] hover:underline'
                    }`
                  )}
                >
                  <span className="hidden sm:block">Next</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
      <CTASection />
      <Footer />
    </>
  )
}
