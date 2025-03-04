import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";

const FeaturesSection = () => {
  const features = [
    "Filter and analyze data quickly",
    "Export reports in multiple formats",
    "Automate report scheduling",
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:pr-0 lg:pl-[80px] py-8 lg:py-0">
      <div className="w-full lg:w-1/2 flex flex-col lg:pr-[96px] mb-8 lg:mb-0">
        <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-3 lg:mb-[12px]">
          <Image
            src="./assets/images/feature-icon.svg"
            width={19}
            height={19}
            alt="Feature Icon"
          />
        </div>
        <h3 className="text-2xl lg:text-[30px] font-semibold mb-4 lg:mb-[16px] text-[#101828]">
          Real-Time Insights & Reporting
        </h3>
        <p className="text-base lg:text-[18px] text-[#475467] mb-6 lg:mb-[32px]">
          Gain deeper insights with interactive reports. Filter, drill down, and
          export reconciliation summaries with ease.
        </p>
        <ul className="list-none ml-0 lg:ml-[16px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-4 lg:mb-[20px]">
              <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
              <span className="text-base lg:text-[18px] text-[#475467]">
                {feature}
              </span>
            </div>
          ))}
        </ul>
      </div>
      <div className="w-full lg:w-1/2 overflow-hidden relative lg:ml-[-96px]">
        <div className="relative w-full h-[300px] lg:w-[768px] lg:h-[512px]">
          <Image
            src="/assets/images/Features-3-image.png"
            fill
            alt="Reconciliation dashboard"
            className="border-[4px] border-[#101828] rounded-[10px] object-cover object-left"
            style={{ objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;