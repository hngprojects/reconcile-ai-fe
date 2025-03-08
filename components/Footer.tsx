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
  return (
    <footer className="footer bg-primary">
      <Container className="w-full">
        <div className="flex flex-col gap-4 text-white py-12 items-center justify-between">
          <div className="w-full flex flex-col gap-8 items-start">
            <div className="flex w-full items-center flex-col sm:flex-row justify-between gap-y-8 flex-wrap">
              <div className="flex flex-col w-full sm:w-1/2 gap-4">
                <div className="flex flex-col gap-2 ">
                  <Link href="/home" className="w-fit sm:mb-3">
                    <div className="flex items-center justify-start gap-2">
                      <LogoIcon className="w-6 h-6 sm:h-12 sm:w-12 fill-white" />
                      <span className="font-extrabold text-lg sm:text-4xl font-baloo text-white">
                        ReconXi
                      </span>
                    </div>
                  </Link>
                  <div className="hidden sm:flex gap-4">
                    <Link
                      href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <InstagramIcon className="fill-inherit w-5 h-5" />
                    </Link>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <FacebookIcon className="fill-inherit w-5 h-5" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/recon-xi-b06835354"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <LinkedinIcon className="fill-inherit w-5 h-5" />
                    </Link>
                    <Link
                      href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <TwitterIcon className="fill-inherit w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/2 pb-6 sm:pb-0 border-b sm:border-0 border-white">
                <FooterEmailForm />
              </div>

              <div className="flex sm:hidden w-full items-start flex-col gap-2 ">
                <div className="flex gap-4">
                  <Link
                    href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <InstagramIcon className="fill-inherit w-5 h-5" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <FacebookIcon className="fill-inherit w-5 h-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/recon-xi-b06835354"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <LinkedinIcon className="fill-inherit w-5 h-5" />
                  </Link>
                  <Link
                    href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <TwitterIcon className="fill-inherit w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="sm:w-1/2 w-full">
              <nav className="hidden sm:flex items-center gap-8">
                <Link
                  href="/contact"
                  className="hover:underline underline-offset-2"
                >
                  Contact Us
                </Link>
                <Link
                  href="/terms-conditions"
                  className="hover:underline underline-offset-2"
                >
                  Term of Service
                </Link>
                <Link
                  href="/privacy"
                  className="hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
              </nav>
              <nav className="flex sm:hidden items-center gap-8">
                <Link
                  href="/terms-conditions"
                  className="hover:underline underline-offset-2"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:underline underline-offset-2"
                >
                  Privacy
                </Link>
                <Link href="/" className="hover:underline underline-offset-2">
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
          <span className="w-full mt-1 sm:text-center">
            © 2025 ReconXi Ltd. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
