import Image from "next/image";
import Footer from "@/src/components/Footer";
import CTASection from "@/src/components/CTASection";
const RefferalPage = () => {
    return (
        <div className=" ">
      {/* Referral Page Section */}
      <section className="px-[50px] py-[33px]">
        <div className="bg-[#2E604A] rounded-br-[100px] rounded-tl-[100px] flex justify-between items-center">
        <div className="flex flex-col justify-between ml-[80px]">
          <h2 className="font-semibold leading-[50px] text-white mb-[24px] text-[40px]">Invite and Earn Rewards With ReconXi Referral Program!</h2>
          <p className="mb-[32px] font-normal leading-[30px] text-[20px] text-[#F3F3F3]">Love using ReconXi? Share it with your friends and enjoy exclusive rewards!</p>
          <button className="bg-white text-[#2E604A] font-medium text-[16px] leading-[100%] rounded-[8px] px-[57px] py-[15.5px] w-[222px] h-[50px]">
            Invite Friends!
          </button>
        </div>
        <div>
        <Image src="/assets/images/HeroImage.svg" className="" alt="My Image" width={500} height={300} />
        </div>
        </div>
      </section>


      <section className="px-[50px]">
        <div className="px-[34px]">
            <div>

            </div>
        <h2 className="font-medium leading-[72px] tracking-[-2%] text-[25px] text-[#02542D]">How it works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[32px]">
          
          <div className="pt-[8px] pl-[16px] border">
            <div className="rounded-[12px] border bg-gray-100 w-[55px] h-[55px] flex justify-center  items-center">
                <h1 className="font-normal text-[#000000]">1</h1>
            </div>
            <div className="flex flex-col">
                <div className="px-[20px] mb-[]">
                
            <h3 className="text-[#02542D] leading-[72px] font-medium text-[20px]">Invite Your Friends:</h3>
            <p className="text-[#2C2C2C] text-[16px] leading-[30px] font-normal">Share your unique referral link.</p>
                </div>
            </div>
          </div>
          <div className="pt-[8px] pl-[16px] border">
            <div className="rounded-[12px] border bg-gray-100 w-[55px] h-[55px] flex justify-center  items-center">
                <h1 className="font-normal text-[#000000]">2</h1>
            </div>
            <div className="flex flex-col">
                <div className="px-[20px] mb-[]">
                
            <h3 className="text-[#02542D] leading-[72px] font-medium text-[20px]">They Sign Up:</h3>
            <p className="text-[#2C2C2C] text-[16px] leading-[30px] font-normal">Your friends access the ReconXi platform and continue with their google account.</p>
                </div>
            </div>
          </div>
          <div className="pt-[8px] pl-[16px] border">
            <div className="rounded-[12px] border bg-gray-100 w-[55px] h-[55px] flex justify-center  items-center">
                <h1 className="font-normal text-[#000000]">3</h1>
            </div>
            <div className="flex flex-col">
                <div className="px-[20px] mb-[]">
                
            <h3 className="text-[#02542D] leading-[72px] font-medium text-[20px]">You Earn Rewards:</h3>
            <p className="text-[#2C2C2C] text-[16px] leading-[30px] font-normal">get rewards they join!</p>
                </div>
            </div>
          </div>
        </div>
        </div>
      </section>




      {/* Why Join? Section */}
      <div className="px-[74px]">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="font-medium leading-[72px] tracking-[-2%] text-[30px]">Why Join?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-normal leading-[30px] text-[16px]">Help friends simplify reconciliation.</li>
            <li className="font-normal leading-[30px] text-[16px]">Enjoy extensive features.</li>
            <li className="font-normal leading-[30px] text-[16px]">The more referrals, the more rewards!</li>
          </ul>
          <p className="mt-[46px]">
            Use this <a href="#" className="text-[#6971FF] font-normal leading-[30px] text-[16px]">link</a> to start sharing today!
          </p>
        </div>
        <Image src="/assets/images/hero2.svg" className="" alt="My Image" width={500} height={300} />
      </div>
      </div>

      {/* FAQ Section */}
      <div className="my-16 mx-20">
        <div className="mb-[64px]">
        <h2 className="text-[36px] tracking-[-2%] font-semibold mb-[20px] text-center text-[#101828]">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-8">Everything you need to know about ReconXi.</p>
        </div>

        <div className="space-y-4 flex justify-center">
            <div className="mx-auto w-[768px]">
            <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">What is ReconXi?</h3>
          <div className="rounded-full p-2">
          <Image src="/assets/images/iconMinus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
        <div className="mt-4 text-base text-gray-600">
          ReconXi is an AI-powered financial reconciliation tool designed to help businesses automate the process of matching transactions between their bank statements and company ledgers
        </div>
      </div>
      
      {/* FAQ Item 2 - Collapsed */}
      <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Is ReconXi really free to use?</h3>
          <div className="rounded-full p-2">
          <Image src="/assets/images/iconPlus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
      </div>
      
      {/* FAQ Item 3 - Collapsed */}
      <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">What types of files can I upload to ReconXi?</h3>
          <div className="rounded-full p-2">
          <Image src="/assets/images/iconPlus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
      </div>
      
      {/* FAQ Item 4 - Collapsed */}
      <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Is my data secure with ReconXi?</h3>
          <div className="rounded-full  p-2">
          <Image src="/assets/images/iconPlus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
      </div>
      
      {/* FAQ Item 5 - Collapsed */}
      <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Can I manually update matched transactions?</h3>
          <div className="rounded-full p-2">
          <Image src="/assets/images/iconPlus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
      </div>
      
      {/* FAQ Item 6 - Collapsed */}
      <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Will ReconXi integrate with other financial software (e.g., QuickBooks, Xero)?</h3>
          <div className="rounded-full p-2">
          <Image src="/assets/images/iconPlus.svg" className="text-[#98A2B3]" alt="My Image" width={20} height={20} />
          </div>
        </div>
      </div>
            </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </div>
    );
}
export default RefferalPage;