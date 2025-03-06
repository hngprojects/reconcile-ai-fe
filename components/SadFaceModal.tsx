import React from 'react'
import Image from "next/image";

const SadFaceModal = ({ isOpen, onClose }: any) => {

    if (!isOpen) return null;
    
    return (
        <>
          <div className="fixed w-screen flex-start inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-9/12 sm:w-3/4 md:w-2/4 lg:w-1/3">
            <div className='text-center'>
                <Image
                        src="/assets/images/closeIcon.svg"
                        alt="close button"
                        className='ml-auto'
                        width={13.33}
                        height={13.33}
                        onClick={onClose}
                    />

                <div className='text-4xl font-bold'>Oops!</div>
                <div className="flex justify-center items-center my-4">
                <Image
                        src="/assets/images/sad.svg"
                        alt="sad face"
                        width={151}
                        height={210}
                    />
                </div>
                <div className='font-normal my-3'>Something went wrong</div>
            </div>
            </div>
        </div>
      </>
    );
}

export default SadFaceModal
