import Image from 'next/image';

const UploadFile = () => {
    
    return ( 
        <div>
        <div className="mx-20 xl:mx-36 2xl:mx-60 mt-5 flex-col [@media(min-width:900px)]:flex md:flex-row gap-x-10 [@media(min-width:900px)]:justify-between [@media(min-width:400px)]:space-y-10 [@media(min-width:900px)]:items-stretch mb-12">
            <div className='h-full border border-[#dddddd] px-12 py-6 rounded-[18.22px]'>
                <div className=']'>
                    <h1 className='text-[#333333] font-semibold text-lg  leading-[140%]'>Upload Financial Statement</h1>
                    <div className='text-center my-6 border-2 border-[#dddddd] flex justify-center items-center flex-col space-y-5 rounded-[12px] border-dotted border-[#dddddd'>
                        <div className='mt-10'>
                    <Image src="/assets/images/icon-upload.svg" alt="Upload Icon" width={40} height={40}/>
                        </div>
                    <p className='text-[#678e82] font-bold text-[20px] mb-5'>upload file</p>
                    <p className='text-[#678e82] w-[150px] leading-[140%] border-b border-[#678e82] mb-[51px]'>choose file here</p>
                    </div>
                    <div className='flex justify-between items-center flex-nowrap gap-x-5 w-full'>
                        <p className='text-[#678e82] font-light leading-[140%] text-[14px]'>Supported formats: CVS, XLS, PDF</p>
                        <p className='leading-[140%] text-[14px] text-[#678e82] font-light'>Maximum size: 15MB</p>
                    </div>
                </div>
            </div>
            <div className='h-full border border-[#dddddd] border-dotted px-12 py-6 rounded-[18.22px]'>
                <div className=''>
                    <h1 className=' text-[#333333] font-semibold text-lg leading-[140%]'>Upload Company’s Ledger</h1>
                    <div className='text-center my-6 border-[#dddddd] flex justify-center items-center flex-col space-y-5 rounded-[12px] border-2 border-dotted '>
                        <div className='mt-10'>
                    <Image src="/assets/images/icon-upload.svg" alt="Upload Icon" width={40} height={40}/>
                        </div>
                    <p className='text-[#678e82] font-bold text-[20px] mb-5'>upload file</p>
                    <p className='text-[#678e82] w-[150px] leading-[140%] border-b border-[#678e82] mb-[51px]'>choose file here</p>
                    </div>
                    <div className='flex justify-between items-center flex-nowrap gap-x-5 w-full'>
                        <p className='text-[#678e82] font-light leading-[140%] text-[14px]'>Supported formats: CVS, XLS, PDF</p>
                        <p className='leading-[140%] text-[14px] text-[#678e82] font-light'>Maximum size: 15MB</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center'>
            <button className='text-[16px] text-white font-bold bg-[#297b65] rounded-[10px] p-2.5 text-center h-[50px] w-[316px] opacity-60'>Upload Documents</button>
        </div>
        </div>
     );
}

export default UploadFile;


