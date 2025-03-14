"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/src/data/blogSampleData";
import Footer from "@/src/components/Footer";
import CTASection from "@/src/components/CTASection";
import Container from "@/src/components/Container";
export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const blog = blogData.find((b) => b.id === Number(id));
  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }
  return (
    <>
      <Container className="py-8 md:py-12">
        <div className="px-4">
          {/* Breadcrumbs */}
          <div className="lg:px-10">
            <nav className="flex mb-6 text-sm md:text-base text-[#5C5C5C]">
              <Link
                href="/"
                className="font-normal text-xs leading-4 text-[#333333]"
              >
                Home
              </Link>
              <span className="font-normal text-xs leading-4 text-[#333333] mx-2">
                &gt;
              </span>
              <Link
                href="/blog"
                className="font-normal text-xs leading-4 text-[#333333]"
              >
                Blogs
              </Link>
              <span className="font-normal text-xs leading-4 text-[#333333] mx-2">
                &gt;
              </span>
              <span className="font-normal text-xs leading-4 text-[#333333]">
                Blog Post
              </span>
            </nav>

            {/* Author Info and Metadata */}
            <div className="flex items-center gap-4 pt-6 mb-6">
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 pt-16">
                <Image
                  src={blog.authorProfilePicture}
                  alt={blog.authorName}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 1000px) 48px, 56px"
                />
              </div>
              <div>
                <p className="text-base md:text-lg font-medium">
                  {blog.authorName}
                </p>
                <div className="flex items-center text-[#5C5C5C] text-sm">
                  <span>{blog.publishedDate}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
            {/* Blog Title */}
            <h1 className=" leading-[140%] lg:font-semibold text-[28px] lg:text-4xl font-semibold lg:leading-[140%] text-[#333333] mb-6 lg:mb-24">
              {blog.title}
            </h1>
          </div>
          {/* Featured Image */}
          <div className="">
            <Image
              src={blog.image}
              alt={blog.title}
              width={0}
              height={0}
              className="w-full h-[184.85px] lg:h-[560px] object-cover rounded-xl"
              sizes="100vw"
              // style={{ width: '100%', height: '60.85px' }}
              priority
            />
          </div>
          {/* Intro Text */}
          <div className="lg:px-10">
            <div className="flex flex-col lg:gap-y-5 gap-y-4 my-6 lg:my-5 lg:mt-16 ">
              <p className="leading-4 font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                {blog.introText1}
              </p>
              <p className="leading-6 font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                {blog.introText2}
              </p>
              <p className="leading-4 font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                {blog.introText3}
              </p>
            </div>
            {/* Blog Sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                  {blog.sectionOneHeading}
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {blog.sectionOneText}
                </p>
              </section>
              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                  {blog.sectionTwoHeading}
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {blog.sectionTwoText}
                </p>
              </section>
              <section>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryOneHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryOneContent}
                </div>
              </section>
              <section>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryTwoHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryTwoContent}
                </div>
              </section>
              <section>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryThreeHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryThreeContent}
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
      <CTASection />
      <Footer />
    </>
  );
}
