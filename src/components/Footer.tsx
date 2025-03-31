import React from 'react'
import Link from 'next/link'
import Container from './Container'
import FooterEmailForm from './form/FooterEmail'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LogoIcon,
  TwitterIcon,
} from './Icon/Icons'

const Footer = () => {
  const PRODUCTS_SUBNAVS = [
    {
      name: 'Contact Us',
      link: '/contact',
    },
    {
      name: 'Features List',
      link: '/features',
    },
    {
      name: 'Pricing',
      link: '/pricing',
    },
    {
      name: 'Careers',
      link: '/careers',
    },
    {
      name: 'Partner with Us',
      link: '/partners',
    },
    {
      name: 'Releases',
      link: '/changelog',
    },
  ]
  const RESOURCES_SUBNAVS = [
    {
      name: 'Blog',
      link: '/blog',
    },
    {
      name: 'Demo',
      link: '/demo',
    },
    {
      name: 'Help Centre',
      link: '/customer-support-form',
    },
  ]
  return (
    <footer className="bg-primary">
      <Container className="flex w-full flex-col gap-[64px] overflow-x-hidden pt-[64px] pb-[48px] lg:px-[48px]">
        <div className="flex flex-wrap items-start gap-[40px] md:gap-[78px] lg:flex-nowrap lg:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="mb-4 w-fit" aria-label="ReconXi">
              <div className="flex items-center justify-start gap-2">
                <LogoIcon className="h-12 w-12 text-white" />
                <span className="font-baloo text-4xl font-extrabold text-white">
                  ReconXi
                </span>
              </div>
            </Link>
            <div
              className="flex gap-6 text-white"
              role="navigation"
              aria-label="Social Media Links"
            >
              <Link
                href="https://www.instagram.com/reconxihq"
                className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2a5743] bg-[#2a5743] transition-all duration-500 hover:rotate-[360deg] hover:bg-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5 text-inherit" />
              </Link>
              <Link
                href="https://www.fb.com/reconxihq"
                className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2a5743] bg-[#2a5743] transition-all duration-500 hover:rotate-[360deg] hover:bg-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-inherit" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/the-reconxi"
                className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2a5743] bg-[#2a5743] transition-all duration-500 hover:rotate-[360deg] hover:bg-white"
                aria-label="Linkedin"
              >
                <LinkedinIcon className="h-5 w-5 text-inherit" />
              </Link>
              <Link
                href="https://x.com/thereconxi"
                className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2a5743] bg-[#2a5743] transition-all duration-500 hover:rotate-[360deg] hover:bg-white"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5 text-inherit" />
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
              <h3 id="product-nav" className="font-semibold text-[#D0D5DD]">
                Product
              </h3>
              <nav className="flex flex-col gap-[12px]">
                {PRODUCTS_SUBNAVS.map((subnavs) => (
                  <Link
                    key={subnavs.name}
                    href={subnavs.link}
                    className="group relative w-fit text-white transition-all duration-300 hover:text-gray-300"
                  >
                    {subnavs.name}
                    <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>
            <div
              className="space-y-3"
              role="region"
              aria-labelledby="resources-nav"
            >
              <h3 id="resources-nav" className="font-semibold text-[#D0D5DD]">
                Resources
              </h3>
              <nav className="flex flex-col gap-[12px]">
                {RESOURCES_SUBNAVS.map((subnavs) => (
                  <Link
                    key={subnavs.name}
                    href={subnavs.link}
                    className="group relative w-fit text-white transition-all duration-300 hover:text-gray-300"
                  >
                    {subnavs.name}
                    <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="w-full text-white md:w-fit">
            <FooterEmailForm />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-400 pt-[32px]">
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
  )
}

export default Footer
