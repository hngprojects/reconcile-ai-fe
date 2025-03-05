import Image from 'next/image';

const UploadFile = () => {
    
    return ( 
        <div className='lg:px-[80px] lg:py-[60px] md:px-[30px] md:py-[30px] px-[24px] py-[15px]'>
        <div className="grid-cols-1 md:grid md:grid-cols-2 lg:gap-x-10 mb-12 md:mb-[69px] space-y-5 md:gap-x-5">
            <div className='h-full border border-[#dddddd] lg:px-[47px] px-[25px] py-[20px] md:px-[28px] rounded-[18.22px]'>
                <div className='h-full flex flex-col justify-between'>
                    <h1 className='text-[#333333] font-semibold md:text-2xl  md:leading-[33.6px] text-[16px] leading-[22.4px]'>Upload Bank Statement</h1>
                    <div>
                    <div className='text-center my-6 border-2 border-[#dddddd] border-opacity-[20px] flex justify-center items-center flex-col space-y-5 rounded-[12px] border-dotted border-[#dddddd'>
                        <div className='mt-10'>
                    <Image src="/assets/images/icon-upload.svg" alt="Upload Icon" width={40} height={40}/>
                        </div>
                    <p className='text-[#678e82] font-bold md:text-[18px] md:leading-[25.2px] text-[14px] leading-[19.6px] mb-5'>upload file</p>
                    <p className='text-[#678e82] w-[150px] text-[16px] font-normal leading-[22.4px] md:text-[20px] md:leading-[28px] border-b border-[#678e82] mb-[51px]'>choose file here</p>
                    </div>
                    <p className='text-[#678e82] font-light leading-[140%] text-[14px]'>Supported formats: CSV</p>
                    </div>
                </div>
            </div>
            <div className='h-full border border-[#dddddd] lg:px-[47px] py-[20px] md:px-[28px] rounded-[18.22px] px-[25px]'>
                <div className='h-full flex flex-col justify-between'>
                    <h1 className='text-[#333333] font-semibold md:text-2xl  md:leading-[33.6px] text-[16px] leading-[22.4px]'>Upload Company's Ledger</h1>
                    <div>
                    <div className='text-center my-6 border-2 border-[#dddddd] flex justify-center items-center flex-col space-y-5 rounded-[12px] border-dotted border-[#dddddd'>
                        <div className='mt-10'>
                    <Image src="/assets/images/icon-upload.svg" alt="Upload Icon" width={40} height={40}/>
                        </div>
                    <p className='text-[#678e82] font-bold md:text-[18px] md:leading-[25.2px] text-[14px] leading-[19.6px] mb-5'>upload file</p>
                    <p className='text-[#678e82] w-[150px] text-[16px] font-normal leading-[22.4px] md:text-[20px] md:leading-[28px] border-b border-[#678e82] mb-[51px]'>choose file here</p>
                    </div>
                        <p className='text-[#678e82] font-light leading-[140%] text-[14px]'>Supported formats: CSV</p>
                    </div>
                </div>
            </div>
            
        </div>
        <div className='flex justify-center'>
            <button className='text-[16px] text-white font-bold bg-[#9fb6ac] rounded-[10px] p-2.5 text-center h-[50px] w-[316px] opacity-60'>Upload Documents</button>
        </div>
        </div>
     );
}

export default UploadFile;


