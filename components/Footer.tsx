import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Form from "./Form";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="flex max-w-[1280px] w-[80%] max-lg:flex-col max-lg:gap-8">
        <div className="flex-1 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <Link href="/">
              <h2 className="font-extrabold text-[36px] font-baloo">ReconXi</h2>
            </Link>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/reconxi02/?igsh=YTh5aWx6Y2c2dW0w#" className="social-icon">
                <Instagram />
              </Link>
              <Link href="" className="social-icon">
                <Facebook />
              </Link>
              <Link href="https://www.linkedin.com/in/recon-xi-b06835354" className="social-icon">
                <Linkedin />
              </Link>
              <Link href="" className="social-icon">
                <Twitter />
              </Link>
            </div>
          </div>
          <nav className="nav">
            <Link href="/" className="cursor-pointer">
              Contact Us
            </Link>
            <Link href="/" className="cursor-pointer">
              Term of Service
            </Link>
            <Link href="/" className="cursor-pointer">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <Form />
      </section>
      <p className="text-[16px] ">© 2025 ReconXi Ltd. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
