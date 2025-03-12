'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { blogData } from "@/src/data/blogSampleData";
import TryFreeCard from "@/src/components/try-free-card";


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
    <div>
        <div className="my-10 mx-5">
      <div className="">
        <p className="flex justify-center items-center">
          <Link href="/" className="text-[#5C5C5C] text-[14px] font-normal leading-[20px]">HOME/BLOG</Link>
        </p>
      </div>
      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="font-semibold text-[28px] leading-[140%] my-4">Stay Ahead with AI-Powered Financial Insights</h1>
        <p className="font-normal text-[16px] leading-[24px] max-w-3xl mx-auto text-[#5C5C5C]">
          Discover expert articles, trends, and best practices in financial reconciliation, 
          AI automation, and accounting. Get insights that help you streamline operations and reduce errors.
        </p>
      </div>
        </div>  
      {/* Blog List Heading */}
      <div className="px-6">
      <div className="mb-8">
        <h2 className="font-semibold text-[20px] leading-[30px]">All blog posts</h2>
      </div>
      {/* Blog Grid - 3 items per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {currentPosts.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:shadow-xl hover:translate-y-[-5px]">
              <div className="relative w-full h-60 rounded-[8px] bg-[#ddd]">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover opacity-[1000%] hover:opacity-[80%]"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col px-4">
                <div className="py-[24px]">
                <p className="lg:font-semibold lg:text-[14px] lg:leading-[20px]  text-[14px] leading-[20px] font-medium text-[#2E604A] mb-[14px]">{blog.authorName} • {blog.publishedDate} </p>
                <div className="flex justify-between items-center">
                <h3 className=" line-clamp-2 font-semibold text-[18px] text-[#333333] leading-[140%] mb-[24px] lg:font-semibold lg:text-[24px] lg:leading-[140%]">{blog.title}</h3>
                <Image 
                src="/assets/images/blog-img/icon-blog.svg"  // Path to your image
                alt=""
                width={10} 
                height={10} 
      />
                </div>

                <p className="font-normal text-[14px] leading-[24px] line-clamp-3 lg:font-normal lg:text-[16px] lg:leading-[24px]">{blog.description}</p>
                <p className="font-medium text-[14px] leading-[24px] text-[#333333] inline-flex items-center relative after:content-[''] after:block after:w-[60%] after:h-[2px] after:bg-[#333333] after:left-0 after:bottom-0 after:absolute hover:after:w-full after:transition-all after:duration-[500ms] after:ease-in-out lg:font-medium lg:text-[16px] lg:leading-[24px]">
                  Read more
                </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex space-x-1">
            <button 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    <TryFreeCard />
    </div>
  );
}