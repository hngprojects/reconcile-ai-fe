import Image from 'next/image'

const ErrorUploadModal = () => {
  return (
    <div className='w-screen h-screen z-100 bg-black/20 absolute inset-0 grid place-items-center'>
        <div className="bg-white w-[90%] max-md:mx-auto md:w-[535px] h-[269px] rounded-[12px] flex flex-col items-center justify-between p-8 ">
            <h2 className="font-bold text-3xl md:text-5xl ">Oops!</h2>
            <Image
                src="/Sad.png"
                width={100}
                height={100}
                alt="star-icon"
                className='object-cover'
            />            
            <p className='text-[#475569]'>Something went wrong</p>
        </div>
    </div>
  )
}

export default ErrorUploadModal