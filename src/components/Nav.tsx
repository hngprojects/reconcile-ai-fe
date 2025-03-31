'use client'

import Link from 'next/link'
import Container from './Container'
import { LogoIcon } from './Icon/Icons'
import UserAction from './UserAction'
import { usePathname } from 'next/navigation'

import { cn } from '../lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { AlignJustify, ChevronDown, Dot } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

import { forwardRef, useState } from 'react'
import LoginModal from './modal/LoginModal'
import GoogleAuthModal from './modal/GoogleAuthModal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import UserDetails from './UserDetails'
import { useSession } from 'next-auth/react'

const industryPaths = [
  {
    name: 'Small Businesses',
    href: '/startup-and-sme',
  },
  {
    name: 'Banks and Financial Institutions',
    href: '/financial-pro',
  },
  {
    name: 'Accounting and Audit firms',
    href: '/accounting',
  },
  {
    name: 'Corporations (Finance Department)',
    href: '/finance',
  },
  {
    name: 'Schools and Educational Institutions',
    href: '/school-and-education',
  },
]

const Nav = () => {
  const pathname: string = usePathname()
  const { data } = useSession()
  const user = data?.user
  const isIndustryPaths = industryPaths.some(({ href }) =>
    pathname.startsWith(href)
  )
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const pathNamesWithoutNavlinks: string[] = [
    '/file-upload',
    '/profile',
    '/manage-plan',
    '/reconciliation',
    '/dashboard',
    '/billing-history',
  ]

  const isPathWithoutNavlinks = pathNamesWithoutNavlinks.some((path) =>
    pathname.startsWith(path)
  )

  return (
    <header className="sticky top-0 right-0 left-0 z-50 flex items-center border-b-[1px] border-[#0000001A] bg-white">
      <Container className="flex w-full items-center justify-between gap-6 py-4">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <LogoIcon className="size-9 md:size-12" />
            <span className="font-baloo text-primary mt-1 text-xl leading-0 font-extrabold md:text-3xl">
              ReconXi
            </span>
          </div>
        </Link>

        {!isPathWithoutNavlinks && (
          <nav className="hidden md:block">
            {pathname === ('/dashboard' as string) ? (
              <ul className="flex items-center justify-center gap-6 font-medium text-[#333333]">
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/dashboard'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/file-upload'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/file-upload"
                  >
                    File Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/"
                  >
                    Subscription
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center justify-center gap-6 font-medium text-[#333333]">
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
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
                            'navigation-menu-trigger hover:text-primary relative h-auto bg-transparent p-0 text-base font-medium text-[#333333] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:bg-transparent hover:after:w-full [&>svg]:!ml-0',
                            isIndustryPaths
                              ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                              : ''
                          )}
                          style={isIndustryPaths ? { color: '#2E604A' } : {}}
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
                                  pathname === href ? 'text-primary' : ''
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
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/blog'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      'hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E604A] after:transition-all after:duration-300 hover:after:w-full',
                      pathname === '/pricing'
                        ? 'text-primary font-semibold after:h-[2px] after:w-full after:bg-[#2E604A]'
                        : ''
                    )}
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        )}

        <div className="hidden md:block">
          <UserAction />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {isPathWithoutNavlinks && (
            <div className="md:hidden">{user && <UserDetails />}</div>
          )}

          {!isPathWithoutNavlinks && (
            <Sheet>
              <SheetTrigger className="md:hidden" asChild>
                <button>
                  <AlignJustify />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-primary h-full">
                <SheetHeader className="hidden">
                  <SheetTitle>Mobile Nav</SheetTitle>
                  <SheetDescription>Navigation for mobile</SheetDescription>
                </SheetHeader>
                <nav className="mt-4 flex h-full flex-col justify-between px-4 py-8">
                  <div className="flex flex-col gap-4">
                    <ul className="flex flex-col gap-4 text-lg font-medium text-white/80">
                      <div className="md:hidden">{user && <UserDetails />}</div>
                      <li className="flex items-center justify-between">
                        <SheetClose asChild>
                          <Link
                            className={cn(
                              'hover:text-white',
                              pathname === '/'
                                ? 'font-semibold text-white underline underline-offset-2'
                                : ''
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
                                  'flex items-center justify-start gap-0.5 py-0 text-lg font-medium text-white/80',
                                  isIndustryPaths
                                    ? 'font-semibold text-white underline underline-offset-2'
                                    : ''
                                )}
                              >
                                <span>Industries</span>
                                <ChevronDown
                                  className="ml-0"
                                  style={{ marginLeft: '0' }}
                                />
                              </AccordionTrigger>
                            </div>
                            <AccordionContent className="pt-4 pb-0 pl-4 text-white/80">
                              <div className="flex flex-col gap-3">
                                {industryPaths.map(({ name, href }) => (
                                  <SheetClose key={href} asChild>
                                    <Link
                                      href={href}
                                      className={cn(
                                        'transition-colors hover:text-white',
                                        pathname === href &&
                                          'text-white underline underline-offset-2'
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
                              'hover:text-white',
                              pathname === '/blog'
                                ? 'font-semibold text-white underline underline-offset-2'
                                : ''
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
                              'hover:text-white',
                              pathname === '/pricing'
                                ? 'font-semibold text-white underline underline-offset-2'
                                : ''
                            )}
                            href="/pricing"
                          >
                            Pricing
                          </Link>
                        </SheetClose>
                      </li>
                    </ul>
                  </div>

                  {!user && (
                    <div className="flex w-full flex-col items-center gap-4">
                      <SheetClose asChild>
                        <button
                          type="button"
                          onClick={() => setShowLoginModal(true)}
                          className="font-inter h-[44px] w-full cursor-pointer rounded-[8px] border-2 border-white px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-white/10"
                          aria-label="Open login modal"
                        >
                          <span className="relative bottom-0.5">Login</span>
                        </button>
                      </SheetClose>
                      <SheetClose asChild>
                        <button
                          type="button"
                          onClick={() => setShowAuthModal(true)}
                          className="text-primary font-inter h-[44px] w-full cursor-pointer rounded-[8px] bg-white px-6 py-3 text-[14px] leading-[20px] font-semibold hover:bg-white/90"
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
            setShowLoginModal(false)
            setShowAuthModal(true)
          }}
        />

        <GoogleAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSwitchToLogin={() => {
            setShowAuthModal(false)
            setShowLoginModal(true)
          }}
        />
      </Container>
    </header>
  )
}

export default Nav

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:text-primary hover:bg-accent focus:bg-accent focus:text-primary block space-y-1 rounded-md px-1.5 py-2 leading-none text-[#333333] no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
