import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div className="mx-auto my-50 flex w-fit flex-col items-center gap-4">
        <div className="relative w-fit">
          <Image
            src="/assets/images/rocket.png"
            alt="Rocket"
            width={392}
            height={155}
            className="absolute top-[-100px] left-[210px] -z-20 max-[864px]:top-[-50px] max-[864px]:w-[250px] max-[600px]:top-0 max-[600px]:w-[190px] max-[470px]:w-[100px]"
          />
          <Image
            src="/assets/images/404.png"
            alt="Not found"
            width={392}
            height={286}
            className="z-20 max-[572px]:w-[350px] max-[470px]:w-[290px]"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[50px] font-bold text-[#13281F]">OOPS</p>
          <p className="text-[30px] font-semibold text-[#13281F]">
            PAGE NOT FOUND
          </p>
        </div>
        <Link
          href="/"
          className="hover:bg-primary h-fit w-full rounded-[8px] border border-[#2E604A] px-[24px] py-[20px] text-center text-[18px] font-[700] transition-all duration-150 hover:text-white"
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}
