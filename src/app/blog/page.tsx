"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { blogData } from "@/src/data/blogSampleData";
import Footer from "@/src/components/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/src/components/Icon/Icons";
import Container from "@/src/components/Container";
import CTASection from "@/src/components/CTASection";
import { cn } from "@/src/lib/utils";
export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(blogData.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Container className="py-24">
        <div className="sm:w-11/12 mx-auto">
          <div>
            <div className="">
              <p className="flex justify-center items-center">
                <Link
                  href="/"
                  className="text-[#5C5C5C] text-[18px] font-[400] leading-[20px]"
                >
                  HOME / BLOG
                </Link>
              </p>
            </div>
            {/* Blog Header */}
            <div className="text-center mb-12 mx-auto flex flex-col justify-center items-center">
              <h1 className="text-center max-w-[672px] text-[36px] md:text-[48px] font-[600] leading-[140%] my-4 mx-auto">
                Stay Ahead with AI-Powered Financial Insights
              </h1>
              <p className="max-w-[800px] text-[16px] md:text-[18px] font-[400] leading-[24px] mx-auto text-[#5C5C5C]">
                Discover expert articles, trends, and best practices in
                financial reconciliation, AI automation, and accounting. Get
                insights that help you streamline operations and reduce errors.
              </p>
            </div>
          </div>

          <hr className="w-full flex mx-auto" />

          {/* Blog List Heading */}
          <div className="pt-11">
            <div className="mb-8">
              <h2 className="font-semibold text-[20px] leading-[30px]">
                All blog posts
              </h2>
            </div>
            {/* Blog Grid - 3 items per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {currentPosts.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`}>
                  <div className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:shadow-xl hover:translate-y-[-5px] group">
                    <div className="relative w-full h-60 rounded-[8px] bg-[#ddd] overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-75"
                      />
                    </div>
                    <div className="flex flex-col px-2 md:px-4">
                      <div className="pt-[24px] pb-4">
                        <div className="space-y-3 mb-6">
                          <p className="lg:font-semibold lg:text-[14px] lg:leading-[20px] text-[14px] leading-[20px] font-medium text-[#2E604A]">
                            {blog.authorName} • {blog.publishedDate}
                          </p>
                          <div className="flex gap-4 items-start">
                            <h3 className="w-auto line-clamp-2 font-semibold text-[18px] text-[#333333] leading-[140%] lg:font-semibold lg:text-[24px] lg:leading-[140%]">
                              {blog.title}
                            </h3>
                            <ArrowUpRightIcon />
                          </div>
                          <p className="font-normal text-[14px] leading-[24px] line-clamp-3 lg:font-normal lg:text-[16px] lg:leading-[24px]">
                            {blog.description}
                          </p>
                        </div>

                        <p className="font-medium text-[14px] leading-[24px] text-[#333333] inline-flex items-center relative after:content-[''] after:block after:w-[60%] after:h-[2px] after:bg-[#333333] after:left-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:duration-[500ms] after:ease-in-out lg:font-medium lg:text-[16px] lg:leading-[24px] truncate">
                          Read more
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <hr className="w-full mb-5 flex mx-auto" />

          {/* Updated Pagination with specific styling requirements */}
          {totalPages > 1 && (
            <div className="">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className={cn(
                    `px-4 py-2 text-[14px] flex gap-1 cursor-pointer font-[500] ${
                      currentPage === 1
                        ? "opacity-0 cursor-default"
                        : "text-[#2A5743] hover:underline"
                    }`
                  )}
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="hidden sm:block">Previous</span>
                </button>

                <div className="hidden sm:flex space-x-3">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-[12px] py-[7px] rounded-[8px] cursor-pointer text-[14px] font-[500] text-[#2A5743] ${
                        currentPage === index + 1 ? "bg-[#EAEFED]" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <p className="sm:hidden text-sm text-[#344054] font-medium">
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
                    `px-4 py-2 text-[14px] flex cursor-pointer gap-1 font-[500] ${
                      currentPage === totalPages
                        ? "opacity-0 cursor-default"
                        : "text-[#2A5743] hover:underline"
                    }`
                  )}
                >
                  <span className="hidden sm:block">Next</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
      <CTASection />
      <Footer />
    </>
  );
}
