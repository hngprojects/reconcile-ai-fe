import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";

const FeaturesSection = () => {
    const features = [
        "Leverage automation to move fast",
        "Easy drag-and-drop uploads",
    ];

    return (
        <>
            <section className="mx-auto max-w-4xl px-4 py-16 text-center">
                <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600">How it Works</p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Analytics that feels like it&apos;s from the future
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                    </p>
                </div>
            </section>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 lg:px-0 lg:pl-[80px] py-8 lg:py-0">
                <div className="w-full lg:w-1/2 flex flex-col lg:pr-[96px] mb-8 lg:mb-0">
                    <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-3 lg:mb-[12px]">
                        <Image
                            src="./assets/images/feature-icon.svg"
                            width={19}
                            height={19}
                            alt="Feature Icon"
                        />
                    </div>
                    <h3 className="text-2xl text-center lg:text-left lg:text-[30px] font-semibold mb-4 lg:mb-[16px] text-[#101828]">
                        Upload Financial & Customer Records
                    </h3>
                    <p className="text-base text-center lg:text-left lg:text-[18px] text-[#475467] mb-6 lg:mb-[32px]">
                        Effortlessly upload financial statements and customer records in just a few clicks. Supported file formats: CSV.
                    </p>
                    <ul className="list-none flex flex-col items-center lg:items-start ml-1 lg:ml-[16px]">
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
        </>
    );
};

export default FeaturesSection;
