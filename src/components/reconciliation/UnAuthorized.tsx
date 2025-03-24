import Image from "next/image";
import NotFoundImage from "@/public/assets/images/401.png";
import Rocket from "@/public/assets/images/rocket.png";
import Link from "next/link";

export default function UnAuthorized() {
  return (
    <div>
      <div className="w-fit mx-auto my-32 flex flex-col items-center gap-4">
        <div className="relative w-fit">
          <Image
            src={Rocket}
            alt="Rocket"
            width={392}
            height={155}
            className="-z-20 max-[864px]:w-[250px] max-[600px]:w-[190px] max-[470px]:w-[100px] absolute left-[210px] top-[-100px] max-[864px]:top-[-50px] max-[600px]:top-0"
          />
          <Image
            src={NotFoundImage}
            alt="Not found"
            width={392}
            height={286}
            className="z-20 max-[572px]:w-[350px] max-[470px]:w-[290px]"
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <p className="text-[50px] font-extrabold text-[#13281F]">OOPS!</p>
          <p className="text-[30px] text-[#13281F] font-semibold">
            UNAUTHORIZED
          </p>
        </div>
        <Link
          href="/"
          className="border border-[#2E604A] rounded-[8px] w-full h-fit py-[20px] px-[24px] text-center text-[18px] font-[700] hover:bg-primary hover:text-white transition-all duration-150"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
