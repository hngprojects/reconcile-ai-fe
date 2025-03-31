import Image from 'next/image'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
const RefferalPage = () => {
  return (
    <div className=" ">
      {/* Referral Page Section */}
      <section className="px-[50px] py-[33px]">
        <div className="flex items-center justify-between rounded-tl-[100px] rounded-br-[100px] bg-[#2E604A]">
          <div className="ml-[80px] flex flex-col justify-between">
            <h2 className="mb-[24px] text-[40px] leading-[50px] font-semibold text-white">
              Invite and Earn Rewards With ReconXi Referral Program!
            </h2>
            <p className="mb-[32px] text-[20px] leading-[30px] font-normal text-[#F3F3F3]">
              Love using ReconXi? Share it with your friends and enjoy exclusive
              rewards!
            </p>
            <button className="h-[50px] w-[222px] rounded-[8px] bg-white px-[57px] py-[15.5px] text-[16px] leading-[100%] font-medium text-[#2E604A]">
              Invite Friends!
            </button>
          </div>
          <div>
            <Image
              src="/assets/images/HeroImage.svg"
              className=""
              alt="My Image"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      <section className="px-[50px]">
        <div className="px-[34px]">
          <div></div>
          <h2 className="text-[25px] leading-[72px] font-medium tracking-[-2%] text-[#02542D]">
            How it works
          </h2>

          <div className="mb-[32px] grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border pt-[8px] pl-[16px]">
              <div className="flex h-[55px] w-[55px] items-center justify-center rounded-[12px] border bg-gray-100">
                <h1 className="font-normal text-[#000000]">1</h1>
              </div>
              <div className="flex flex-col">
                <div className="mb-[] px-[20px]">
                  <h3 className="text-[20px] leading-[72px] font-medium text-[#02542D]">
                    Invite Your Friends:
                  </h3>
                  <p className="text-[16px] leading-[30px] font-normal text-[#2C2C2C]">
                    Share your unique referral link.
                  </p>
                </div>
              </div>
            </div>
            <div className="border pt-[8px] pl-[16px]">
              <div className="flex h-[55px] w-[55px] items-center justify-center rounded-[12px] border bg-gray-100">
                <h1 className="font-normal text-[#000000]">2</h1>
              </div>
              <div className="flex flex-col">
                <div className="mb-[] px-[20px]">
                  <h3 className="text-[20px] leading-[72px] font-medium text-[#02542D]">
                    They Sign Up:
                  </h3>
                  <p className="text-[16px] leading-[30px] font-normal text-[#2C2C2C]">
                    Your friends access the ReconXi platform and continue with
                    their google account.
                  </p>
                </div>
              </div>
            </div>
            <div className="border pt-[8px] pl-[16px]">
              <div className="flex h-[55px] w-[55px] items-center justify-center rounded-[12px] border bg-gray-100">
                <h1 className="font-normal text-[#000000]">3</h1>
              </div>
              <div className="flex flex-col">
                <div className="mb-[] px-[20px]">
                  <h3 className="text-[20px] leading-[72px] font-medium text-[#02542D]">
                    You Earn Rewards:
                  </h3>
                  <p className="text-[16px] leading-[30px] font-normal text-[#2C2C2C]">
                    get rewards they join!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join? Section */}
      <div className="px-[74px]">
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-[30px] leading-[72px] font-medium tracking-[-2%]">
              Why Join?
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li className="text-[16px] leading-[30px] font-normal">
                Help friends simplify reconciliation.
              </li>
              <li className="text-[16px] leading-[30px] font-normal">
                Enjoy extensive features.
              </li>
              <li className="text-[16px] leading-[30px] font-normal">
                The more referrals, the more rewards!
              </li>
            </ul>
            <p className="mt-[46px]">
              Use this{' '}
              <a
                href="#"
                className="text-[16px] leading-[30px] font-normal text-[#6971FF]"
              >
                link
              </a>{' '}
              to start sharing today!
            </p>
          </div>
          <Image
            src="/assets/images/hero2.svg"
            className=""
            alt="My Image"
            width={500}
            height={300}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-20 my-16">
        <div className="mb-[64px]">
          <h2 className="mb-[20px] text-center text-[36px] font-semibold tracking-[-2%] text-[#101828]">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Everything you need to know about ReconXi.
          </p>
        </div>

        <div className="flex justify-center space-y-4">
          <div className="mx-auto w-[768px]">
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  What is ReconXi?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconMinus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="mt-4 text-base text-gray-600">
                ReconXi is an AI-powered financial reconciliation tool designed
                to help businesses automate the process of matching transactions
                between their bank statements and company ledgers
              </div>
            </div>

            {/* FAQ Item 2 - Collapsed */}
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Is ReconXi really free to use?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconPlus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 3 - Collapsed */}
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  What types of files can I upload to ReconXi?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconPlus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 4 - Collapsed */}
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Is my data secure with ReconXi?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconPlus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 5 - Collapsed */}
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Can I manually update matched transactions?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconPlus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 6 - Collapsed */}
            <div className="border-b border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Will ReconXi integrate with other financial software (e.g.,
                  QuickBooks, Xero)?
                </h3>
                <div className="rounded-full p-2">
                  <Image
                    src="/assets/images/iconPlus.svg"
                    className="text-[#98A2B3]"
                    alt="My Image"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </div>
  )
}
export default RefferalPage
