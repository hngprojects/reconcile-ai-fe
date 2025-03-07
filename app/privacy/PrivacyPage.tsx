import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div>
      <header className="flex justify-center md:py-[110px] py-[48px] px-6 bg-[#F5FAF8]">
        <div className="text-center">
          <p className="text-[#009A49] bg-[#E6FFF2] px-3 py-1 text-sm rounded-2xl inline-block w-fit mb-6 mx-auto">
            Privacy
          </p>

          <h1 className="md:text-[60px] text-4xl font-semibold mb-6">
            How We <span className="text-[#2E604A]">Protect</span> Your
            Information
          </h1>

          <p className="text-md text-[#525252]">
            Find advice and answers from our support team
          </p>
        </div>
      </header>

      {/* table of content section */}
      <section className="py-12 px-6 bg-[#F9FAFB]">
        <div className="flex justify-center">
          <div className="max-w-[1120px] w-full flex lg:flex-row flex-col lg:gap-22 gap-8">
            <div className="max-w-[306px] w-full">
              <h2 className="md:text-4xl text-3xl mb-2 font-semibold">
                Table of Content
              </h2>

              <ul className="list-disc pl-5">
                <li className="font-semibold text-[16px] mb-2">
                  Introductions
                </li>
                <li className="font-semibold text-[16px] mb-2">
                  Information We Collect
                </li>
                <li className="font-semibold text-[16px] mb-2">
                  How We Use Your Information
                </li>
                <li className="font-semibold text-[16px] mb-2">
                  Data Sharing and Security
                </li>
                <li className="font-semibold text-[16px] mb-2">
                  Your choices and Rights
                </li>
                <li className="font-semibold text-[16px] mb-2">
                  Policy Updates
                </li>
                <li className="font-semibold text-[16px] mb-2">Contact Us </li>
                <li className="font-semibold text-[16px] mb-2">Last Updated</li>
              </ul>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Introduction
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                  At ReconXi, we value your privacy and are committed to
                  safeguarding your personal information. This Privacy Policy
                  explains what data we collect, how we use it, and the steps we
                  take to ensure its security. By using our services, you agree
                  to the terms outlined in this policy.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Information We Collect
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  We collect information to deliver and improve our
                  reconciliation services, including:
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Transactional Data: Details of financial records, transfers,
                  and reconciliation transactions.
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Personal Information: Such as account details, names, email
                  addresses, and phone numbers provided during registration or
                  service use
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Usage Data: Log files, device information, and analytics that
                  help us understand how you interact with our platform.
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  Other Data: Additional information you provide or that is
                  automatically collected to enhance your experience.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  How We Use Your Information
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  We collect information to deliver and improve our
                  reconciliation services, including:
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Transactional Data: Details of financial records, transfers,
                  and reconciliation transactions.
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Personal Information: Such as account details, names, email
                  addresses, and phone numbers provided during registration or
                  service use
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Usage Data: Log files, device information, and analytics that
                  help us understand how you interact with our platform.
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  Other Data: Additional information you provide or that is
                  automatically collected to enhance your experience.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Data Sharing and Security
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  We do not sell your personal information to third parties.{" "}
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  We implement industry-standard security measures to protect
                  your data from unauthorized access, disclosure, or misuse.
                  While we strive for maximum security, please be aware that no
                  system is completely foolproof.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Your Choices and Right
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  You have certain rights regarding your personal information,
                  including:{" "}
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  Access & Correct Your Data: Update or modify your account
                  details anytime. <br />
                  Delete Your Data: Request data deletion, subject to compliance
                  with legal obligations. <br />
                  Manage Cookies & Tracking: Adjust settings in your browser to
                  control cookies and tracking mechanisms.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Policy Updates
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                  Policy Updates We may revise this Privacy Policy periodically.
                  Any updates will be posted on our platform, and significant
                  changes will be communicated to you.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Contact Us
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                  For any privacy-related concerns, reach out to us at
                  info@ReconXi.com.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Last Updated
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  This Privacy Policy was last updated on 05/03/2025.
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  For more information about our terms and conditions, please
                  visit our Terms and Conditions page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* try it for free */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default PrivacyPage;
