"use client";

import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";
import UserAction from "./UserAction";
import { usePathname } from "next/navigation";

import { cn } from "../lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { AlignJustify, ChevronDown, Dot } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { forwardRef, useState } from "react";
import LoginModal from "./modal/LoginModal";
import GoogleAuthModal from "./modal/GoogleAuthModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import UserDetails from "./UserDetails";
import { useAuth } from "./context/AuthContext";

const industryPaths = [
  {
    name: "Startups and SMEs",
    href: "/small-business",
  },
  {
    name: "Financial Professionals",
    href: "/financial-pro",
  },
  // {
  //   name: "Enterprise",
  //   href: "/enterprise",
  // },
  // {
  //   name: "Freelancer",
  //   href: "/freelancer",
  // },
  {
    name: "Schools & Educational Institutions",
    href: "/school-and-education",
  },
];

const Nav = () => {
  const pathname: string = usePathname();
  const { user } = useAuth();
  const isIndustryPaths = industryPaths.some(({ href }) =>
    pathname.startsWith(href)
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const pathNamesWithoutNavlinks: string[] = [
    "/file-upload",
    "/profile",
    "/manage-plan",
    "/reconciliation",
    "/dashboard",
  ];

  const isPathWithoutNavlinks = pathNamesWithoutNavlinks.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <header className="border-b-[1px] flex items-center border-[#0000001A] sticky top-0 left-0 right-0 bg-white z-50">
      <Container className="flex py-4 justify-between gap-6 w-full items-center">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <LogoIcon className="size-9 md:size-12" />
            <span className="font-extrabold text-xl md:text-3xl font-baloo text-primary leading-0 mt-1">
              ReconXi
            </span>
          </div>
        </Link>

        {!isPathWithoutNavlinks && (
          <nav className="hidden md:block">
            {
              pathname === "/dashboard" as string ? 
              <ul className="flex justify-center items-center text-[#333333] gap-6 font-medium">
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/dashboard"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                </li>
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/file-upload"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/file-upload"
                >
                  File Upload
                </Link>
                </li>
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/"
                >
                  Settings
                </Link>
                </li>
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/"
                >
                  Subscription
                </Link>
                </li>
              </ul>
            :
              <ul className="flex justify-center items-center text-[#333333] gap-6 font-medium">
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/"
                >
                  Home
                </Link>
                </li>
                <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "navigation-menu-trigger text-[#333333] font-medium text-base bg-transparent p-0 h-auto hover:bg-transparent hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300 [&>svg]:!ml-0",
                          isIndustryPaths
                            ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                            : ""
                        )}
                        style={isIndustryPaths ? { color: "#2E604A" } : {}}
                      >
                        Industries
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-1">
                        <ul className="w-48">
                          {industryPaths.map(({ name, href }) => (
                            <ListItem
                              key={href}
                              href={href}
                              className={
                                pathname === href ? "text-primary" : ""
                              }
                            >
                              {name}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                </li>
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/blog"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/blog"
                >
                  Blog
                </Link>
                </li>
                <li>
                <Link
                  className={cn(
                    "hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                    pathname === "/pricing"
                      ? "text-primary font-semibold after:w-full after:bg-[#2E604A] after:h-[2px]"
                      : ""
                  )}
                  href="/pricing"
                >
                  Pricing
                </Link>
                </li>
              </ul>
            }
          </nav>
        )}

        <div className="hidden md:block">
          <UserAction />
        </div>

        <div className="flex items-center md:hidden gap-2">
          <div className="md:hidden">{user && <UserDetails />}</div>

          {!isPathWithoutNavlinks && (
            <Sheet>
              <SheetTrigger className="md:hidden" asChild>
                <button>
                  <AlignJustify />
                </button>
              </SheetTrigger>
              <SheetContent className="h-full bg-primary">
                <SheetHeader className="hidden">
                  <SheetTitle>Mobile Nav</SheetTitle>
                  <SheetDescription>Navigation for mobile</SheetDescription>
                </SheetHeader>
                <nav className="py-8 mt-4 px-4 flex flex-col h-full justify-between">
                  <ul className="flex flex-col text-white/80 gap-4 font-medium text-lg">
                    <li>
                      <SheetClose asChild>
                        <Link
                          className={cn(
                            "hover:text-white",
                            pathname === "/"
                              ? "text-white font-semibold underline underline-offset-2"
                              : ""
                          )}
                          href="/"
                        >
                          Home
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value="industries"
                          className="border-none"
                        >
                          <div className="w-fit">
                            <AccordionTrigger
                              className={cn(
                                "font-medium text-lg justify-start text-white/80 py-0 flex items-center gap-0.5",
                                isIndustryPaths
                                  ? "text-white font-semibold underline underline-offset-2"
                                  : ""
                              )}
                            >
                              <span>Industries</span>
                              <ChevronDown
                                className="ml-0"
                                style={{ marginLeft: "0" }}
                              />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="text-white/80 pl-4 pb-0 pt-4">
                            <div className="flex flex-col gap-3">
                              {industryPaths.map(({ name, href }) => (
                                <SheetClose key={href} asChild>
                                  <Link
                                    href={href}
                                    className={cn(
                                      "hover:text-white transition-colors",
                                      pathname === href &&
                                        "text-white underline underline-offset-2"
                                    )}
                                  >
                                    <span className="flex gap-0.5">
                                      <div className="shrink-0">
                                        <Dot />
                                      </div>
                                      {name}
                                    </span>
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          className={cn(
                            "hover:text-white",
                            pathname === "/blog"
                              ? "text-white font-semibold underline underline-offset-2"
                              : ""
                          )}
                          href="/blog"
                        >
                          Blog
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          className={cn(
                            "hover:text-white",
                            pathname === "/pricing"
                              ? "text-white font-semibold underline underline-offset-2"
                              : ""
                          )}
                          href="/pricing"
                        >
                          Pricing
                        </Link>
                      </SheetClose>
                    </li>
                  </ul>

                  {!user && (
                    <div className="flex flex-col w-full items-center gap-4">
                      <SheetClose asChild>
                        <button
                          type="button"
                          onClick={() => setShowLoginModal(true)}
                          className="h-[44px] px-6 py-3 border-2 w-full border-white text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-white/10 cursor-pointer"
                          aria-label="Open login modal"
                        >
                          <span className="relative bottom-0.5">Login</span>
                        </button>
                      </SheetClose>
                      <SheetClose asChild>
                        <button
                          type="button"
                          onClick={() => setShowAuthModal(true)}
                          className="h-[44px] px-6 py-3 bg-white w-full text-primary rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-white/90 cursor-pointer"
                          aria-label="Open signup modal"
                        >
                          Sign up
                        </button>
                      </SheetClose>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowAuthModal(true);
          }}
        />

        <GoogleAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSwitchToLogin={() => {
            setShowAuthModal(false);
            setShowLoginModal(true);
          }}
        />
      </Container>
    </header>
  );
};

export default Nav;

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 text-[#333333] hover:text-primary rounded-md py-2 px-1.5 leading-none no-underline outline-none transition-colors hover:bg-accent  focus:bg-accent focus:text-primary",
            className
          )}
          {...props}
        >
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
