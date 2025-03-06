import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Form from "./Form";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="flex max-w-[1280px] w-[80%] max-lg:flex-col gap-y-8 flex-wrap">
        <div className="lg:w-1/2 w-full flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 ">
            <Link href="/" className="self-start">
              <h2 className="mb-[22px]">
                <Image
                  src="/assets/images/Logo-white.png"
                  alt="ReconXi"
                  width={159}
                  height={50}
                  className=" "
                />
                <span className="sr-only">ReconXi</span>
              </h2>
            </Link>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#"
                className="social-icon"
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61573471907361&mibextid=rS40aB7S9Ucbxw6v"
                className="social-icon"
              >
                <Facebook />
              </Link>
              <Link
                href="https://www.linkedin.com/in/recon-xi-b06835354"
                className="social-icon"
              >
                <Linkedin />
              </Link>
              <Link
                href="https://x.com/reconxi02?s=21&t=6GEcIpxFOrczvmtrZsCzSw"
                className="social-icon"
              >
                <Twitter />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <Form />
        </div>

        <div className="lg:w-1/2 w-full">
          <nav className="nav">
            <Link href="/" className="cursor-pointer">
              Contact Us
            </Link>
            <Link href="/terms-of-service" className="cursor-pointer">
              Term of Service
            </Link>
            <Link href="/" className="cursor-pointer">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </section>
      <p className="text-[16px] ">© 2025 ReconXi Ltd. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
