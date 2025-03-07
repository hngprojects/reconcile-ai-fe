import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
// import FooterEmailForm from "./form/FooterEmail";
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
        <div className="flex flex-col items-center justify-between gap-4 py-12 text-white">
          <div className="flex flex-col items-start w-full gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-col flex-wrap items-center justify-between w-full sm:flex-row gap-y-8">
              <div className="flex flex-col w-full gap-4 sm:w-1/2">
                <div className="flex flex-col gap-2 ">
                  <Link href="/home" className="w-fit">
                    <div className="flex items-center justify-start gap-2">
                    <Image
                      src="/assets/images/Logo-white.png"
                      alt="ReconXi"
                      width={159}
                      height={50}
                      className=" "
                    />
                    </div>
                  </Link>
                  <div className="hidden gap-4 sm:flex">
                    <Link
                      href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <InstagramIcon className="fill-inherit" />
                    </Link>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <FacebookIcon className="fill-inherit" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/recon-xi-b06835354"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <LinkedinIcon className="fill-inherit" />
                    </Link>
                    <Link
                      href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                    >
                      <TwitterIcon className="fill-inherit" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="w-full pb-6 border-b border-white sm:w-1/2 sm:pb-0 sm:border-0">
                <FooterEmailForm />
              </div> */}

              <div className="flex flex-col items-start w-full gap-2 sm:hidden ">
                <div className="flex gap-4">
                  <Link
                    href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <InstagramIcon className="fill-inherit" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <FacebookIcon className="fill-inherit" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/recon-xi-b06835354"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <LinkedinIcon className="fill-inherit" />
                  </Link>
                  <Link
                    href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                    className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white fill-white hover:fill-primary transition-colors duration-200 "
                  >
                    <TwitterIcon className="fill-inherit" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full">
              <nav className="items-center hidden gap-8 sm:flex">
                {/* <Link
                  href="/contact"
                  className="hover:underline underline-offset-2"
                >
                  Contact Us
                </Link> */}
                <Link
                  href="/terms-conditions"
                  className="hover:underline underline-offset-2"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
              </nav>
              <nav className="flex items-center gap-8 sm:hidden">
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
