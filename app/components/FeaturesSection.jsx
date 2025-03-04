import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";

const FeaturesSection = () => {
  const features = [
    "Filter and analyze data quickly",
    "Export reports in multiple formats",
    "Automate report scheduling",
  ];

  return (
    <div className="flex items-center justify-between w-full pl-[80px]">
      <div className="w-1/2 flex flex-col pr-[96px]">
        <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-[12px]">
          <Image
            src="./assets/images/feature-icon.svg"
            width={19}
            height={19}
            alt="Feature Icon"
          />
        </div>
        <h3 className="text-[30px] font-semibold mb-[16px] text-[#101828]">
          Real-Time Insights & Reporting
        </h3>
        <p className="text-[18px] text-[#475467] mb-[32px]">
          Gain deeper insights with interactive reports. Filter, drill down, and
          export reconciliation summaries with ease.
        </p>
        <ul className="list-style-none">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-[20px]">
              <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
              <span className="text-[18px] text-[#475467]">{feature}</span>
            </div>
          ))}
        </ul>
      </div>
      <div className="w-1/2 overflow-hidden relative" style={{ marginLeft: '-96px' }}>
        <div className="relative" style={{ width: '768px', height: '512px' }}>
          <Image
            src="/assets/images/Features-3-image.png"
            fill
            alt="Reconciliation dashboard"
            className="border-[4px] border-[#101828] rounded-[10px] object-cover object-left"
            style={{ objectPosition: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;