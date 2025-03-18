"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/src/data/blogSampleData";
import Footer from "@/src/components/Footer";
import CTASection from "@/src/components/CTASection";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  const hasContent = (
    sectionHeading?: string,
    sectionContent?: string,
  ): boolean => {
    return !!sectionHeading && !!sectionContent;
  };

  return (
    <>
      <div>
        <div className="pb-8 md:pb-12">
          <div className="bg-[#F9FAFB] md:bg-white pb-[40px] md:pb-0 pt-8 md:pt-12 px-4 w-full">
          {/* Breadcrumbs */}
          <div className="lg:px-10">
            <nav className="flex justify-center items-center">
              <Link
                href="/"
                className="text-[#5C5C5C] text-[18px] font-[400] leading-[20px]"
              >
                HOME
              </Link>
              <span className="font-normal text-xs leading-4 text-[#333333] mx-2">
                /
              </span>
              <Link
                href="/blog"
                className="text-[#5C5C5C] text-[18px] font-[400] leading-[20px]"
              >
                BLOG
              </Link>
            </nav>

            {/* Author Info and Metadata */}
            <div className="flex items-center gap-4 pt-6 mb-6 justify-center">
              <div className="relative w-[56px] h-[56px] bg-[#2E604A] rounded-full flex items-center justify-center text-2xl text-white">
              {blog.authorName.charAt(0).toUpperCase()}
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
            <h1 className="leading-[140%] text-center lg:font-semibold text-[28px] lg:text-4xl font-semibold lg:leading-[140%] text-[#333333] mb-6 lg:mb-24">
              {blog.title}
            </h1>
          </div>
          <hr className="h-[1px] hidden md:block mb-[64px]"/>
          {/* Featured Image */}
          <div className="">
            <Image
              src={blog.image}
              alt={blog.title}
              width={0}
              height={0}
              className="w-full h-[184.85px] lg:h-[560px] object-cover rounded-xl"
              sizes="100vw"
              priority
            />
          </div>
          </div>

          {/* Blog Content */}
          <div className="px-6 lg:px-10 ">
            {/* Intro Text - Always show if available */}
            <div className="flex flex-col lg:gap-y-5 gap-y-4 my-6 lg:my-5 lg:mt-16">
              {blog.introText1 && (
                <p className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText1}
                </p>
              )}
              {blog.introText2 && (
                <p className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText2}
                </p>
              )}
              {blog.introText3 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText3}
                </p>
              )}
              {blog.introText4 && (
                <p className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText4}
                </p>
              )}
              {blog.introText5 && (
                <p className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText5}
                </p>
              )}
              {blog.introText6 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText6}
                </p>
              )}
              {blog.introText7 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText7}
                </p>
              )}
              {blog.introText8 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText8}
                </p>
              )}
              {blog.introText9 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText9}
                </p>
              )}
              {blog.introText10 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText10}
                </p>
              )}
              {blog.introText11 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText11}
                </p>
              )}
              {blog.introText12 && (
                <p className=" font-normal lg:text-lg text-[#333333] lg:leading-[140%]">
                  {blog.introText12}
                </p>
              )}
            </div>

            {/* Blog Sections - Only render if content exists */}
            <div className="space-y-8">
              {hasContent(blog.sectionOneHeading, blog.sectionOneText) && (
                <section>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                    {blog.sectionOneHeading}
                  </h2>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.sectionOneText}
                  </p>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.sectionTwoText}
                  </p>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.section2Text}
                  </p>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.section3Text}
                  </p>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.section4Text}
                  </p>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.section5Text}
                  </p>
                </section>
              )}

              {hasContent(blog.sectionTwoHeading, blog.sectionTwoText) && (
                <section>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                    {blog.sectionTwoHeading}
                  </h2>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {blog.sectionTwoText}
                  </p>
                </section>
              )}

              {hasContent(blog.categoryOneHeading, blog.categoryOneContent) && (
                <section>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                    {blog.categoryOneHeading}
                  </h3>
                  <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                    {blog.categoryOneContent}
                  </div>
                </section>
              )}

              {hasContent(blog.categoryTwoHeading, blog.categoryTwoContent) && (
                <section>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                    {blog.categoryTwoHeading}
                  </h3>
                  <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                    {blog.categoryTwoContent}
                  </div>
                </section>
              )}

              {hasContent(
                blog.categoryThreeHeading,
                blog.categoryThreeContent,
              ) && (
                <section>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                    {blog.categoryThreeHeading}
                  </h3>
                  <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                    {blog.categoryThreeContent}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </>
  );
}
