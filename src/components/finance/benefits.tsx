import Image from "next/image";
export default function Benefits() {
    const benefits = [
        {
          title: "Accurate & Fast Reconciliation",
          description: "Eliminate discrepancies and speed up financial reconciliation."
        },
        {
          title: "Automated Bank Reconciliation",
          description: "Reduce manual errors and improve efficiency."
        },
        {
          title: "Audit-Ready Statements",
          description: "Maintain financial records that meet compliance standards."
        },
        {
          title: "Improved Financial Oversight",
          description: "Keep track of every transaction with ease."
        },
        {
          title: "Secure & Reliable",
          description: "Protect sensitive financial data and ensure accuracy in reporting."
        }
      ];
    return (
            <section
                className="w-full py-20 px-0 lg:px-20"
                aria-labelledby="features-heading"
        >
            <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full">
                    <h2 className="text-[#767676] text-sm md:text-base">BENEFITS</h2>
                    <h1 className="text-[#292D32] text-2xl md:text-4xl mt-2 mb-6 font-semibold">Benefits of Using ReconXi for Accounting & Audit Firms</h1>
                    <div className="flex flex-col gap-4 mt-4">
                        {
                            benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-4">
                                <Image
                                    src="/assets/images/check-bg-green.png"
                                    alt="Check icon"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />  
                                <p className="text-[#767676] text-sm md:text-xl font-medium">{benefit.title} - {benefit.description}</p>                 
                                </div>
                            ))
                        }
                    </div>
                    <button 
                    // onClick={handleDemoClick} 
                    className="bg-[#2E604A] px-5 md:px-6 py-2 md:py-3 rounded-[8px] mt-6 md:mt-10 text-white cursor-pointer hover:opacity-75 transition">Book A Demo</button>
                    </div>
                {/* Image - Moves to top on mobile */}
                <div
                    className="w-full"
                    role="presentation"
                >
                    <Image
                    src="/assets/images/employee-working-marketing-setting.png"
                    alt="Enterprise reconciliation features visualization"
                    width={605}
                    height={544}
                    className="w-full h-auto rounded-lg"
                    priority={false}
                    />
                </div>
                                
            </div>
        </section>
    )
}