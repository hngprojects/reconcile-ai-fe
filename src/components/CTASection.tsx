'use client'
import React from 'react'
import Container from './Container'
import TypeWriterButton from './buttons/TypeWriterButton'

const CTASection = () => {
  return (
    <div className="bg-gray-50 sm:bg-white">
      <Container className="py-8">
        <div className="flex flex-col items-center justify-between gap-8 bg-gray-50 px-5 py-10 sm:flex-row sm:gap-10 sm:rounded-xl sm:p-16 sm:px-7 sm:py-12 md:items-start">
          <div className="space-y-3 text-center sm:space-y-4 sm:text-left md:w-2/3">
            <p className="text-3xl font-bold text-gray-900">Try ReconXi Now!</p>
            <p className="max-w-[43rem] text-xl text-[#475467] sm:text-lg">
              Unlock faster and smarter financial reconciliation today.
            </p>
          </div>
          <div>
            <TypeWriterButton
              text="Get Started"
              path="/dashboard"
              // className="bg-primary whitespace-nowrap w-full sm:w-fit py-2 px-4 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex cursor-pointer"
              className="bg-primary hover:bg-primary/90 flex h-12 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-transform duration-200 hover:scale-105 sm:w-64"
              aria-label="Get started with ReconXi"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CTASection
