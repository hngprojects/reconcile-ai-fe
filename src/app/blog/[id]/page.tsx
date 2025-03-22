"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/src/data/blogSampleData";
import Footer from "@/src/components/Footer";
import CTASection from "@/src/components/CTASection";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  const hasContent = (
    sectionHeading?: string,
    sectionContent?: string
  ): boolean => {
    return !!sectionHeading && !!sectionContent;
  };

  return (
    <>
      <div>
        <div className="pb-8 md:pb-12">
          <div className="bg-[#F9FAFB] md:bg-white pb-[40px] md:pb-0 pt-8 md:pt-12 px-4 w-full">
            {/* Back to Blog Link */}
            <motion.div
              className="lg:px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-[#5C5C5C] hover:text-[#2E604A] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M15.8332 10H4.1665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99984 15.8334L4.1665 10L9.99984 4.16669"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[16px] font-medium">Back to Blog</span>
              </Link>
            </motion.div>

            {/* Author Info and Metadata */}
            <motion.div
              className="flex items-center gap-4 pt-6 mb-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.div>

            {/* Blog Title */}
            <motion.h1
              className="leading-[140%] text-center lg:font-semibold text-[28px] lg:text-4xl font-semibold lg:leading-[140%] text-[#333333] mb-6 lg:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {blog.title}
            </motion.h1>
          </div>

          <hr className="h-[1px] hidden md:block mb-[64px]" />

          {/* Featured Image */}
          <motion.div
            className="px-6 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={0}
              height={0}
              className="w-full h-[184.85px] lg:h-[560px] object-cover rounded-xl"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>

        {/* Blog Content */}
        <motion.div
          className="px-6 lg:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Intro Text - Always show if available */}
          <motion.div
            className="flex flex-col lg:gap-y-5 gap-y-4 my-6 lg:my-5 lg:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {blog.introText1 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                {blog.introText1}
              </motion.p>
            )}
            {blog.introText2 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                {blog.introText2}
              </motion.p>
            )}
            {blog.introText3 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                {blog.introText3}
              </motion.p>
            )}
            {blog.introText4 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.8 }}
              >
                {blog.introText4}
              </motion.p>
            )}
            {blog.introText5 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2 }}
              >
                {blog.introText5}
              </motion.p>
            )}
            {blog.introText6 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.2 }}
              >
                {blog.introText6}
              </motion.p>
            )}
            {blog.introText7 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                {blog.introText7}
              </motion.p>
            )}
            {blog.introText8 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.6 }}
              >
                {blog.introText8}
              </motion.p>
            )}
            {blog.introText9 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.8 }}
              >
                {blog.introText9}
              </motion.p>
            )}
            {blog.introText10 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 3 }}
              >
                {blog.introText10}
              </motion.p>
            )}
            {blog.introText11 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 3.2 }}
              >
                {blog.introText11}
              </motion.p>
            )}
            {blog.introText12 && (
              <motion.p
                className="font-normal lg:text-lg text-[#333333] lg:leading-[140%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 3.4 }}
              >
                {blog.introText12}
              </motion.p>
            )}
          </motion.div>

          {/* Blog Sections - Only render if content exists */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.6 }}
          >
            {hasContent(blog.sectionOneHeading, blog.sectionOneText) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.8 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                  {blog.sectionOneHeading}
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {blog.sectionOneText}
                </p>
              </motion.section>
            )}

            {hasContent(blog.sectionTwoHeading, blog.sectionTwoText) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 4 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333333]">
                  {blog.sectionTwoHeading}
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {blog.sectionTwoText}
                </p>
              </motion.section>
            )}

            {hasContent(blog.categoryOneHeading, blog.categoryOneContent) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 4.2 }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryOneHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryOneContent}
                </div>
              </motion.section>
            )}

            {hasContent(blog.categoryTwoHeading, blog.categoryTwoContent) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 4.4 }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryTwoHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryTwoContent}
                </div>
              </motion.section>
            )}

            {hasContent(
              blog.categoryThreeHeading,
              blog.categoryThreeContent
            ) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 4.6 }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#333333]">
                  {blog.categoryThreeHeading}
                </h3>
                <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
                  {blog.categoryThreeContent}
                </div>
              </motion.section>
            )}
          </motion.div>
        </motion.div>
      </div>
      <CTASection />
      <Footer />
    </>
  );
}
