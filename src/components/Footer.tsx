import React from "react";
import Link from "next/link";
import Container from "./Container";
import FooterEmailForm from "./form/FooterEmail";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LogoIcon,
  TwitterIcon,
} from "./Icon/Icons";

const Footer = () => {
  const PRODUCTS_SUBNAVS = [
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "Features list",
      link: "/features",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Careers",
      link: "/careers",
    },
    {
      name: "Partner with Us",
      link: "/partners",
    },
    {
      name: "Releases",
      link: "/changelog",
    },
  ];
  const RESOURCES_SUBNAVS = [
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Demo",
      link: "/demo",
    },
    {
      name: "Help centre",
      link: "/customer-support-form",
    },
  ];
  return (
    <footer className="bg-primary">
      <Container className="w-full overflow-x-hidden pt-[64px] pb-[48px] lg:px-[48px] flex flex-col gap-[64px]">
        <div className="flex flex-wrap gap-[40px] md:gap-[78px] lg:justify-between lg:flex-nowrap items-start">
          <div className="flex flex-col gap-2">
            <Link href="/" className="w-fit mb-4" aria-label="ReconXi">
              <div className="flex items-center justify-start gap-2">
                <LogoIcon className="h-12 w-12 text-white" />
                <span className="font-extrabold text-4xl font-baloo text-white">
                  ReconXi
                </span>
              </div>
            </Link>
            <div
              className="flex gap-4 text-white"
              role="navigation"
              aria-label="Social Media Links"
            >
              <Link
                href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="text-inherit w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="text-inherit w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/recon-xi-b06835354"
                className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200"
                aria-label="Linkedin"
              >
                <LinkedinIcon className="text-inherit w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/thereconxi"
                className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <TwitterIcon className="text-inherit w-5 h-5" />
              </Link>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-[32px]"
            role="navigation"
            aria-label="Footer Navigation"
          >
            <div
              className="space-y-3"
              role="region"
              aria-labelledby="product-nav"
            >
              <h3 id="product-nav" className="text-[#D0D5DD] font-semibold">
                Product
              </h3>
              <nav className="flex flex-col gap-[12px]">
                {PRODUCTS_SUBNAVS.map((subnavs) => (
                  <Link
                    key={subnavs.name}
                    href={subnavs.link}
                    className="relative text-white transition-all duration-300 hover:text-gray-300 group"
                  >
                    {subnavs.name}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>
            <div
              className="space-y-3"
              role="region"
              aria-labelledby="resources-nav"
            >
              <h3 id="resources-nav" className="text-[#D0D5DD] font-semibold">
                Resources
              </h3>
              <nav className="flex flex-col gap-[12px]">
                {RESOURCES_SUBNAVS.map((subnavs) => (
                  <Link
                    key={subnavs.name}
                    href={subnavs.link}
                    className="relative text-white transition-all duration-300 hover:text-gray-300 group"
                  >
                    {subnavs.name}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="text-white">
            <FooterEmailForm />
          </div>
        </div>

        <div className="border-t border-gray-400 pt-[32px] flex flex-wrap gap-4 items-center justify-between">
          <p className="text-[#FFFFFF]">
            © 2025 ReconXi Ltd. All rights reserved.
          </p>

          <div className="flex gap-[16px]">
            <Link
              href="/terms-conditions"
              className="text-white hover:text-[#D0D5DD]"
            >
              Terms
            </Link>
            <Link href="/privacy" className="text-white hover:text-[#D0D5DD]">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
