'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { blogData } from "@/src/data/blogDetails";

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-gray-500">
          <Link href="/" className="hover:text-blue-600">HOME</Link> / <span className="font-medium">BLOG</span>
        </p>
      </div>

      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Stay Ahead with AI-Powered Financial Insights</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover expert articles, trends, and best practices in financial reconciliation, 
          AI automation, and accounting. Get insights that help you streamline operations and reduce errors.
        </p>
      </div>

      {/* Blog List Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b pb-2">All blog posts</h2>
      </div>

      {/* Blog Grid - 3 items per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {currentPosts.map((blog) => (
          <Link key={blog.id} href={`/blogT/${blog.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:shadow-xl hover:translate-y-[-5px]">
              <div className="relative w-full h-52">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{blog.publishedDate} • {blog.authorName}</p>
                <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                <p className="text-blue-600 font-medium mt-3 inline-flex items-center">
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </p>
              </div>
            </div>
          </Link>
        ))}
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
    </div>
  );
}