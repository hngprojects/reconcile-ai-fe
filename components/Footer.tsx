import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Container from "./Container";
import FooterEmailForm from "./form/FooterEmail";

const Footer = () => {
  return (
    <footer className="footer bg-primary">
      <Container className="w-full">
        <div className="flex flex-col gap-4 text-white py-12 items-center justify-between">
          <div className="w-full flex flex-col gap-8 items-start">
            <div className="flex w-full items-center flex-col sm:flex-row justify-between gap-y-8 flex-wrap">
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-2 ">
                  <Link href="/" className="mb-6">
                    <Image
                      src="/assets/images/Logo-white.png"
                      alt="ReconXi"
                      width={159}
                      height={50}
                      className=" "
                    />
                    <span className="sr-only">ReconXi</span>
                  </Link>
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 "
                    >
                      <Instagram />
                    </Link>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 "
                    >
                      <Facebook />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/recon-xi-b06835354"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 "
                    >
                      <Linkedin />
                    </Link>
                    <Link
                      href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                      className="bg-[#2a5743] h-10 w-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 "
                    >
                      <Twitter />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full pb-4 sm:pb-0 border-b sm:border-0 border-white">
                <FooterEmailForm />
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <nav className="nav">
                <Link href="/" className="cursor-pointer">
                  Contact Us
                </Link>
                <Link href="/terms-conditions" className="cursor-pointer">
                  Term of Service
                </Link>
                <Link href="/privacy" className="cursor-pointer">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
          <small className="">© 2025 ReconXi Ltd. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
