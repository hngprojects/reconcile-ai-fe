import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import TryFreeCard from "@/components/try-free-card";
import Footer from "@/components/Footer";
const Contact = () => {
  return (
    <div>
      <Nav />
      <div className="md:bg-[#FAFAFA] pt-[47px] px-[24px] md:py-[96px]">
        <div className="max-w-[996px] mx-auto flex flex-col items-center mb-[58px] md:mb-[64px]">
          <p className=" bg-[#E6FFF2] rounded-[16px] py-2 px-3 text-[20px] text-[#009A49]">
            Contact Us
          </p>
          <h1 className="my-2 font-medium text-[28px] sm:text-[35px] md:text-[45px] lg:text-[64px] text-[#0A0A0A]">
            Get in <span className="text-[#2E604A]">touch with</span> us today
          </h1>
          <p className="text-center text-[18px] max-w-[694px] mx-auto">
            Have questions, feedback, or need assistance? Our team is here to
            help and support you every step of the way. Get in touch with us
            today.
          </p>
        </div>
        <div className="max-w-[1261px] mx-auto flex justify-center">
          <div className="w-full md:border md:border-[rgba(82,82,82,0.2)] bor max-w-[663px] md:p-[32px] flex flex-col gap-[16px] md:gap-[32px]">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm mb-1 text-[#717171]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name"
                className="w-full p-4 border placeholder-[#B8B8B8] border-[#DEDEDE] rounded-[9px] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-[#717171]"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter email address"
                className="w-full p-4 border placeholder-[#B8B8B8] border-[#DEDEDE] rounded-[9px] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm mb-1 text-[#717171]"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                className="w-full p-4 border placeholder-[#B8B8B8] border-[#DEDEDE] rounded-[9px] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-[#717171] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Message..."
                rows={4}
                className="w-full p-4 resize-none bg-[#FFFFFF] border placeholder-[#B8B8B8] order-[#DEDEDE] rounded-[9px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <Button className="bg-[#2E604A] text-white font-semibold leading-[28px] py-[17px] text-[18px]">
              Send
            </Button>
          </div>
        </div>
      </div>
      <TryFreeCard />
      <Footer />
    </div>
  );
};
export default Contact;
