'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogData } from "@/src/data/blogSampleData";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-[14px] md:text-[16px] text-[#5C5C5C]">
        <Link href="/" className="hover:text-[#2E604A]">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <Link href="/blog" className="hover:text-[#2E604A]">
          Blogs
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#2E604A] font-medium truncate max-w-[200px]">
          {blog.title}
        </span>
      </nav>

      {/* Author Info and Metadata */}
      <div className="flex items-center gap-4 pt-[24px] mb-6">
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 pt-[64px]">
          <Image 
            src={blog.authorProfilePicture} 
            alt={blog.authorName} 
            fill 
            className="rounded-full object-cover"
            sizes="(max-width: 1000px) 48px, 56px"
          />
        </div>
        <div>
          <p className="text-base md:text-lg font-medium">{blog.authorName}</p>
          <div className="flex items-center text-[#5C5C5C] text-sm">
            <span>{blog.publishedDate}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-2xl pt-[24px] md:text-4xl font-bold mb-6 leading-tight text-[#333333]">
        {blog.title}
      </h1>

      {/* Featured Image */}
      <div className="relative w-full h-[200px] md:h-[400px] mb-8">
        <Image 
          src={blog.image} 
          alt={blog.title} 
          fill 
          className="object-cover rounded-lg min-h-[600px]"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </div>

      {/* Intro Text */}
      <p className="text-lg md:text-xl pt-[20px] font-medium text-[#333333] mb-8 leading-relaxed">
        {blog.introText}
      </p>
      
      {/* Blog Sections */}
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">{blog.sectionOneHeading}</h2>
          <p className="text-[#5C5C5C] leading-relaxed">{blog.sectionOneText}</p>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">{blog.sectionTwoHeading}</h2>
          <p className="text-[#5C5C5C] leading-relaxed">{blog.sectionTwoText}</p>
        </section>
        
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">{blog.categoryOneHeading}</h3>
          <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
            {blog.categoryOneContent}
          </div>
        </section>
        
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">{blog.categoryTwoHeading}</h3>
          <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
            {blog.categoryTwoContent}
          </div>
        </section>
        
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">{blog.categoryThreeHeading}</h3>
          <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
            {blog.categoryThreeContent}
          </div>
        </section>
      </div>

     
    </div>
  );
}