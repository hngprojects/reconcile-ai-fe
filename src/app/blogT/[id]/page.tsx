'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { blogData } from "@/src/data/blogDetails";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="relative w-full h-60">
        <Image 
          src={blog.image} 
          alt={blog.title} 
          fill 
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500 text-sm">{blog.publishedDate} • {blog.authorName}</p>
      </div>
      <p className="text-gray-700 mt-4">{blog.description}</p>
      <p className="text-gray-500 mt-2">Read Time: {blog.readTime}</p>
      
      {/* Author Profile */}
      <div className="flex items-center gap-4 mt-6">
        <div className="relative w-14 h-14">
          <Image 
            src={blog.authorProfilePicture} 
            alt={blog.authorName} 
            fill 
            className="rounded-full object-cover"
            sizes="56px"
          />
        </div>
        <p className="text-lg font-medium">{blog.authorName}</p>
      </div>
      
      {/* Blog Sections */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">{blog.sectionOneHeading}</h2>
        <p className="text-gray-700 mt-2">{blog.sectionOneText}</p>
        
        <h2 className="text-2xl font-semibold mt-6">{blog.sectionTwoHeading}</h2>
        <p className="text-gray-700 mt-2">{blog.sectionTwoText}</p>
        
        <h3 className="text-xl font-semibold mt-6">{blog.categoryOneHeading}</h3>
        <p className="text-gray-700 mt-2">{blog.categoryOneContent}</p>
        
        <h3 className="text-xl font-semibold mt-6">{blog.categoryTwoHeading}</h3>
        <p className="text-gray-700 mt-2">{blog.categoryTwoContent}</p>
        
        <h3 className="text-xl font-semibold mt-6">{blog.categoryThreeHeading}</h3>
        <p className="text-gray-700 mt-2">{blog.categoryThreeContent}</p>
      </div>
    </div>
  );
}