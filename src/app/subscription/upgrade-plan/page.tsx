"use client";
import { useState } from "react";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";

export default function UpgradePlan() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const pricingPlans = [
        {
          id: 1,
          name: "Basic",
          price: "Free",
          link: "/file-upload",
          features: [
            "Reconcile up to 5 reconciliations/month",
            "Upload CSV files",
            "Basic AI reconciliation",
            "Manually match transactions detected as unmatched",
            "Email notification for reconciled results",
          ],
        },
        {
          id: 2,
          name: "Starter Plan",
          price: "10",
          link: "https://buy.stripe.com/00g9Ez9c42XW9mo14q",
          features: [
            "Reconcile up to 20 reconciliations/month",
            "Basic AI matching and reconciliation",
            "Export results to CSV",
           "Manually match records detected as unmatched",
           "Unlink records matched by AI, and match them correctly",
            "Email notification for reconciled results",
          ],
        },
        {
          id: 3,
          name: "Business Plan",
          price: "25",
          link: "https://buy.stripe.com/6oEdUPag8dCAbuw14r",
          features: [
             "Everything in Starter Plan",
            "Unlimited reconciliation/month",
            "Advanced matching of unmatched records",
            "Advanced AI matching and reconciliation (Large data set: up to 3000 rows)",
            "Merging multiple records/files",
            "Email notification for reconciled results",
          ],
        },
      ];

    const renderFeaturesList = (features: string[], isActive: boolean) => (
        <ul className="space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                    <CircleCheck className={cn("w-5 h-5", isActive ? "text-white" : "text-[#39B057]")} />
                    <span className={cn("font-[400] text-[13px] leading-[150%] font-inter", isActive ? "text-white" : "text-[#333333]")}>
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <Container className="font-inter mb-15">
                <div className="flex items-center my-5 cursor-pointer text-[#333333] gap-3 text-sm sm:text-base">
                    <ArrowLeft />
                    <p className="">Go Back</p>
                </div>
                <div>
                    <h1 className="font-bold pb-7 mb-10 border-b-1 border-solid border-[#EAECF0] text-[32px] leading-[40px] text-[#101828]">Upgrade Your Plan</h1>
                    <div className=" flex flex-col lg:flex-row justify-between gap-8 px-4">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative w-full h-[563px] rounded-[13px] p-[40px_20px] transition-all duration-300",
                                    activeCard === plan.id ? "bg-[#2E604A] scale-105 text-white" : "border-2 border-[#38B43C] hover:scale-105",
                                    activeCard !== null && activeCard !== plan.id && "opacity-50"
                                )}
                                onMouseEnter={() => setActiveCard(plan.id)}
                                onMouseLeave={() => setActiveCard(null)}
                                tabIndex={0}
                                aria-label={`${plan.name} pricing plan`}
                            >
                                <div className="border-b border-[#BFB8B8] pb-5">
                                    <h3 className="font-[500] text-[16px] leading-[100%] font-inter">{plan.name}</h3>
                                </div>

                                <div className="mt-11 space-y-6">
                                    <p className="font-[600] text-[32px] leading-[100%]">
                                        <span className="text-2xl">$</span>
                                        {plan.price}
                                    </p>
                                    {renderFeaturesList(plan.features, activeCard === plan.id)}

                                    <button
                                        className={cn(
                                            "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                                            activeCard === plan.id
                                                ? "bg-white text-[#2A5743] border-white"
                                                : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]"
                                        )}
                                    >
                                        {plan.id === 1 ? "Get Started" : "Upgrade"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    );
}
