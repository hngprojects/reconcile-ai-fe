import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="flex max-w-[1280px] w-[80%] max-lg:flex-col max-lg:gap-8">
        <div className="flex-1 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <h2 className="font-extrabold text-[36px]">ReconXi</h2>
            <div className="flex gap-4">
              <span className="social-icon">
                <Instagram />
              </span>
              <span className="social-icon">
                <Facebook />
              </span>
              <span className="social-icon">
                <Linkedin />
              </span>
              <span className="social-icon">
                <Twitter />
              </span>
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
        <form className="flex flex-col gap-4">
          <p className="text-[16px]">Stay up to date</p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-[315px]"
            />
            <Button
              variant="outline"
              className="border-primary text-primary h-12 w-[115px]"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </section>
      <p className="text-[16px] ">© 2025 ReconXi Ltd. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
