import React from "react";
import Link from "next/link";
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
              <div className="flex flex-col w-full gap-4 items-center">
                <div className="flex flex-col w-full gap-6 sm:items-center ">
                  <div>
                    <Link href="/home" className="w-fit">
                      <div className="flex items-center justify-start gap-2">
                        <LogoIcon
                          color="white"
                          className="hidden sm:block"
                          width={48}
                          height={48}
                        />
                        <LogoIcon
                          color="white"
                          className="sm:hidden"
                          width={24}
                          height={24}
                        />
                        <span className="font-extrabold text-lg sm:text-4xl font-baloo text-white">
                          ReconXi
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="w-full">
                    <nav className="items-center justify-start sm:justify-center gap-8 flex">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 w-full">
            <span className="text-[#EAEFED]">
              © 2025 ReconXi Ltd. All rights reserved.
            </span>
            <div className="gap-4 flex">
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
      </Container>
    </footer>
  );
};

export default Footer;
