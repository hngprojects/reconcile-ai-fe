"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { blogData } from "@/src/data/blogSampleData";
import TryFreeCard from "@/src/components/try-free-card";
import Footer from "@/src/components/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/src/components/Icon/Icons";
export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const postsPerPage = 9;
  // Calculate total pages
  const totalPages = Math.ceil(blogData.length / postsPerPage);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Initial check
    checkIfMobile();
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="">
      <div className="pt-[100px] max-w-[1280px] mx-auto">
        <div className="">
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
              Discover expert articles, trends, and best practices in financial
              reconciliation, AI automation, and accounting. Get insights that
              help you streamline operations and reduce errors.
            </p>
          </div>
        </div>
        {/* Blog List Heading */}
        <div className=" pt-[45px]">
          <div className="mb-8">
            <h2 className="font-semibold text-[20px] leading-[30px]">
              All blog posts
            </h2>
          </div>
          {/* Blog Grid - 3 items per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
            {currentPosts.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:shadow-xl hover:translate-y-[-5px] group">
                  <div className="relative  h-[240px] w-[405px] rounded-[8px] bg-[#ddd] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  </div>
                  <div className="flex flex-col px-4">
                    <div className="py-[24px]">
                      <p className="lg:font-semibold lg:text-[14px] lg:leading-[20px] text-[14px] leading-[20px] font-medium text-[#2E604A] mb-[14px]">
                        {blog.authorName} • {blog.publishedDate}
                      </p>
                      <div className="flex justify-between items-start">
                        <h3 className="line-clamp-2 font-semibold text-[18px] text-[#333333] leading-[140%] mb-[24px] lg:font-semibold lg:text-[24px] lg:leading-[140%]">
                          {blog.title}
                        </h3>
                        <div>
                          <ArrowUpRightIcon />
                        </div>
                      </div>
                      <p className="font-normal text-[14px] leading-[24px] line-clamp-3 lg:font-normal lg:text-[16px] lg:leading-[24px]">
                        {blog.description}
                      </p>
                      <p className="font-medium text-[14px] leading-[24px] text-[#333333] inline-flex items-center relative after:content-[''] pt-3 after:block after:w-[60%] after:h-[2px] after:bg-[#333333] after:left-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:duration-[500ms] after:ease-in-out lg:font-medium lg:text-[16px] lg:leading-[24px]">
                        Read more
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Pagination with responsive design */}
        {totalPages > 1 && (
          <div className="md:px-[100px] px-4 mb-[24px] lg:mb-[100px] md:mb-[50px]">
            <div className="flex justify-between items-center">
              {/* Previous button - text on desktop, arrow on mobile */}
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`cursor-pointer px-4 py-2 flex items-center justify-center ${
                  currentPage === 1
                    ? "text-[#5C5C5C] cursor-not-allowed"
                    : "text-[#2A5743] hover:underline"
                }`}
                aria-label="Previous page"
              >
                {isMobile ? (
                  <ArrowLeftIcon className="w-5 h-5" />
                ) : (
                  <div className="flex justify-between items-center gap-x-[8px]">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span className="text-[14px] font-[500]">Previous</span>
                  </div>
                )}
              </button>
              {/* Page numbers on desktop, "Page X of Y" on mobile */}
              {isMobile ? (
                <div className="text-[14px] font-[500] text-[#2A5743]">
                  Page {currentPage} of {totalPages}
                </div>
              ) : (
                <div className="flex space-x-3">
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
              )}
              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`cursor-pointer px-4 py-2 flex items-center justify-center ${
                  currentPage === totalPages
                    ? "text-[#5C5C5C] cursor-not-allowed  "
                    : "text-[#2A5743] hover:underline"
                }`}
                aria-label="Next page"
              >
                {isMobile ? (
                  <ArrowRightIcon className="w-5 h-5" />
                ) : (
                  <div className="flex justify-between items-center gap-x-[8px]">
                    <span className="text-[14px] font-[500] text-[#5C5C5C]">
                      Next
                    </span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <TryFreeCard />
      <Footer />
    </div>
  );
}
