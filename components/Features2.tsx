import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";
import Container from "./Container";
import { FileIcon, ReportIcon, SpeedIcon } from "./Icon/Icons";

const Features = () => {
  const firstFeature = [
    "Leverage automation to move fast",
    "Easy drag-and-drop uploads",
  ];
  const secondFeature = [
    "Instant transaction matching",
    "Clear status indicators: Matched, Missing, Unmatched, Duplicate",
    "Manually match and override transactions.",
  ];

  const thirdFeature = [
    "Filter and analyze data quickly",
    "Export reports in multiple formats",
    "Automate report scheduling",
  ];

  return (
    <section>
      <Container className="py-12">
        <div className="flex text-center items-center justify-center flex-col mb-9 sm:mb-12">
          <p className="text-primary mb-[12px] font-semibold">How it Works</p>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#101828] ">
            Analytics that feels like it&apos;s from the future
          </h3>
          <p className="sm:text-lg max-w-[768px] text-[#475467]">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-16">
          <div className="w-full text-center sm:mt-9 sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3 ">
              <FileIcon />
            </div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Upload Financial & Customer Records
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              Effortlessly upload financial statements and customer records in
              just a few clicks. Supported file formats: PDF, XLS, CSV.
            </p>

            <ul className="list-none flex flex-col gap-3 items-start">
              {firstFeature.map((feature, index) => (
                <div key={index} className="flex items-center pl-4">
                  <CheckCircle2Icon className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className="w-full relative flex items-center h-[400px]">
            <Image
              src="/assets/images/File_upload.svg"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-start justify-between w-full py-10 sm:py-28 gap-16">
          <div className="w-full relative flex items-center h-[400px] ">
            <Image
              src="/assets/images/AI_reconciliation.svg"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
            />
          </div>
          <div className="w-full text-center sm:mt-9 sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3 ">
              <SpeedIcon />
            </div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Let AI do the Work
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              Watch as Ai automatically matches your transactions based on
              amount, description and date.
            </p>

            <ul className="list-none flex flex-col gap-3 items-start">
              {secondFeature.map((feature, index) => (
                <div key={index} className="flex items-center pl-4">
                  <CheckCircle2Icon className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-16">
          <div className="w-full text-center sm:mt-9 sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3 ">
              <ReportIcon />
            </div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Real-Time Insights & Reporting
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              Gain deeper insights with interactive reports. Filter, drill down,
              and export reconciliation summaries with ease.
            </p>

            <ul className="list-none flex flex-col gap-3 items-start">
              {thirdFeature.map((feature, index) => (
                <div key={index} className="flex items-center pl-4">
                  <CheckCircle2Icon className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className="w-full relative flex items-center h-[400px]">
            <Image
              src="/assets/images/Features-3-image.png"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
