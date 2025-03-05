import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center w-full'>
       <div className='mb-3'>
       <Image 
            src="/AuthLogo.svg" 
            alt="Logo" 
            width={56} 
            height={56} 
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
       </div>
        <h1 className='text-[#333333] text-[28px] font-[600] pb-2'>Password Updated</h1>
        <p className='text-[#475467] max-w-sm text-center font-[400]'>Your password has been updated</p>
        <Button
            type="submit"
            className="py-4 w-[552px] sm:py-8 mt-4 rounded-lg cursor-pointer text-white font-semibold text-[14px] sm:text-[16px] bg-[#2E604A]"
          >
            Back to login
          </Button>
        </div>
       
    </div>
  )
}

export default page