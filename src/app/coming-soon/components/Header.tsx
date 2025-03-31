import React from 'react'
import { Logo } from './Icons'
import Container from './Container'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="z-50 -ml-10 w-[calc(100%+80px)] border-b-[0.5px] border-gray-300 bg-white px-4 py-3">
      <Container className="flex items-start">
        <Link href="/">
          <Logo className="h-8 w-[97.28px] md:h-[50px] md:w-[159px]" />
        </Link>
      </Container>
    </header>
  )
}

export default Header
