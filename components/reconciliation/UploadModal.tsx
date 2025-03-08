import React from 'react'
import Image from 'next/image'

const UploadModal = () => {
  return (
    <div className='w-screen h-screen z-100 bg-black/20 absolute inset-0 grid place-items-center'>
        <div className="bg-white w-[90%] max-md:mx-auto md:w-[436px] h-[213px] rounded-[12px] flex flex-col items-center justify-between p-8 ">
            <Image 
                src="/star-icon.png"
                width={24}
                height={24}
                alt="star-icon"
                className='object-cover'
            />
            <h2 className='text-[#0F172A] font-semibold'>Processing Reconciliation</h2>
            <p className="text-sm text-[#475569]">Please wait while AI does the magic</p>
            <p className='text-[#47556999] text-xs'>Matching records, it will be with you shortly.</p>
            <div className="w-[315px] rounded-[100px] bg-[#F5F5F5] h-[7px]">
                <div 
                    style={{width: '50%'}}
                    className='bg-[#2E604A] rounded-[100px] h-full' 
                />
            </div>
        </div>
    </div>
  )
}

export default UploadModal