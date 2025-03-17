import Footer from "@/src/components/Footer";
import { featuresData } from "@/src/data/featuresData";
import { FileIcon } from "@/src/components/Icon/Icons";

const Features = () => {
  return (
    <div className="w-full">
      <div className="pt-[50px] pb-[74px] md:pt-[56px] md:pb-[147px] px-[24px] lg:px-[80px] w-full flex flex-col items-center">
        <div className="py-[10px] md:py-[14px] w-full flex flex-col items-center mb-[40px] md:mb-[64px]">
          <p className="bg-[#E6FFF2] rounded-[16px] py-1 px-3 text-[20px] text-[#2E604A] mb-6">
            Features
          </p>
          <h1 className="text-[28px] md:text-[42px] lg:text-[60px] font-medium max-w-[1084x] text-center mb-6">
            Simplify and enhance your financial reconciliation process with
            ReconXi
          </h1>
          <p className="text-[18px] text-center text-[#525252]">
            Automate bank reconciliation tasks, enhance accuracy and gain
            real-time insights to keep your finances in perfect balance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[27px] md:gap-[32px] justify-center">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#FAFAFA] border border-[#CBD5E1] p-6 flex flex-col items-center rounded-[6px] max-w-[624px]"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full">
                <FileIcon />
              </div>
              <h3 className="text-[20px] text-[#0A0A0A] font-medium text-center mt-6 mb-4">
                {feature.title}
              </h3>
              <p className="text-[18px] text-[#525252] text-center">
                {feature.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
