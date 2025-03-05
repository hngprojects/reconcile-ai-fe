import React from "react";
import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";

export default function ReconcillationUiSection() {
    const reconcillationBenefits = {
        "financialUploads": [
            "Leverage automation to move fast",
            "Always give customers a human to chat to",
            "Easy drag-and-drop uploads"
        ],
        "aiWork": [
            "Instant transaction matching",
            "Clear status indicators: Matched, Missing, Unmatched, Duplicate",
            "Manually match and override transactions"
        ],
        "realTimeInsights": [
            "Filter and analyze data quickly",
            "Export reports in multiple formats (CSV, PDF)",
            "Automate report scheduling"
        ]
    }
    return (
        <section className="bg-[#F9FAFB] py-24">
            <div className="text-center mb-15 w-[80%] mx-auto">
                <h4 className="text-base font-semibold">How it Works</h4>
                <h2 className="text-3xl font-bold py-1.5">Analytics that feels like it’s from the future</h2>
                <p className="text-xl ">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div className="w-full sm:w-[50%] mx-autoz">
                    <h2 className="text-[30px] font-semibold mb-[16px] text-[#101828]">Upload Financial & Customer Records</h2>
                    <p className="text-[18px] text-[#475467] mb-[32px]">Effortlessly upload financial statements and customer records in just a few clicks. Supported file formats: PDF, XLS, CSV.</p>
                    <ul>
                        {reconcillationBenefits.financialUploads.map((benefit, index) => (
                            <li key={index} className="flex gap-2">
                                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6"/>
                                <span className="text-[18px] text-[#475467]">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Image 
                    src="/assets/images/file_upload.png" 
                    alt="hero section" 
                    width={621} 
                    height={387} 
                    className="border-[4px] border-[#101828] rounded-[10px] object-cover object-center"
                />
            </div>

            <div className="flex items-center flex-col sm:flex-row-reverse justify-between mt-25">
                <div>
                    <h2 className="text-[30px] font-semibold mb-[16px] text-[#101828]">Let AI do the Work</h2>
                    <p className="text-[18px] text-[#475467] mb-[32px]">Watch as AI automatically matches your transactions based on amount, description, and date.</p>
                    <ul>
                        {reconcillationBenefits.aiWork.map((benefit, index) => (
                            <li key={index} className="flex gap-2">
                                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6"/>
                                <span className="text-[18px] text-[#475467]">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Image 
                    src="/assets/images/Ai_reconcillation.png" 
                    alt="hero section" 
                    width={621} 
                    height={512} 
                    className="border-[4px] border-[#101828] rounded-[10px] object-cover object-center"
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center mt-25 justify-between">
                <div>
                    <h2 className="text-[30px] font-semibold mb-[16px] text-[#101828]">Real-Time Insights & Reporting</h2>
                    <p className="text-[18px] text-[#475467] mb-[32px]">Gain deeper insights with interactive reports. Filter, drill down, and export reconciliation summaries with ease.</p>
                    <ul>
                        {reconcillationBenefits.realTimeInsights.map((benefit, index) => (
                            <li key={index} className="flex">
                                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
                                <span className="text-[18px] text-[#475467]">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Image 
                    src="/assets/images/export.png" 
                    alt="hero section" 
                    width={621} 
                    height={387} 
                    className="border-[4px] border-[#101828] rounded-[10px] object-cover object-center"
                />
            </div>
        </section>
    )
}