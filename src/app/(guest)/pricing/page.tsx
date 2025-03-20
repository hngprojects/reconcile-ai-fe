"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import CTASection from "@/src/components/CTASection";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState("Free"); // "Free", "10", or "25"
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "Free",
      link: "/file-upload",
      features: [
        "Free financial reconciliation for 7 days",
        "Upload CSV files",
        "Basic AI reconciliation",
        "Manually match transactions detected as unmatched",
      ],
    },
    {
      id: 2,
      name: "Starter Plan",
      price: "10",
      link: "https://buy.stripe.com/00g9Ez9c42XW9mo14q",
      features: [
        "Reconcile up to 20 reconciliations/month",
        "Basic AI matching and reconciliation (date, amount, description, small data set)",
        "Export results to CSV",
        "Manual adjustments (search by description only)",
        "Unlink, and match records",
      ],
    },
    {
      id: 3,
      name: "Business Plan",
      price: "25",
      link: "https://buy.stripe.com/6oEdUPag8dCAbuw14r",
      features: [
        "Unlimited reconciliation/month",
        "Advanced adjustments  (search and filter by description, date and amount range, unlink and match errors)",
        "Advanced AI matching and reconciliation (Large data set: up to 3000 rows)",
        "Merging multiple records/Merging multiple files",
        "Email notification for reconciled results",
      ],
    },
  ];

  const renderFeaturesList = (features: string[], isActive: boolean) => (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2" role="listitem">
          <span className="flex-shrink-0 my-auto">
            <CircleCheck
              className={cn(
                "w-5 h-5",
                isActive ? "text-white" : "text-[#39B057]"
              )}
            />
          </span>
          <span
            className={cn(
              "font-[400] text-[13px] leading-[150%] font-inter",
              isActive ? "text-white" : "text-[#333333]"
            )}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Container className="py-24">
        {/* ... other components and motion animations ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-[111px] flex flex-col lg:flex-row justify-between gap-8 px-4"
        >
          {pricingPlans.map((plan) => {
            // Determine if the current plan matches this pricing plan
            const isCurrentPlan = currentPlan === plan.price;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative w-full lg:w-[383px] h-[563px] rounded-[13px] p-[60px_24px] md:p-[80px_28px] lg:p-[94.7px_32px_94.7px_32px] transition-all duration-300",
                  activeCard === plan.id
                    ? "bg-[#2E604A] scale-105"
                    : "border-2 border-[#38B43C] hover:scale-105",
                  activeCard !== null && activeCard !== plan.id && "opacity-50"
                )}
                onMouseEnter={() => setActiveCard(plan.id)}
                onMouseLeave={() => setActiveCard(null)}
                tabIndex={0}
                aria-label={`${plan.name} pricing plan`}
              >
                <div className="border-b border-[#BFB8B8] pb-5">
                  <h3
                    className={cn(
                      "font-[500] text-[16px] leading-[100%] font-inter",
                      activeCard === plan.id ? "text-white" : "text-black"
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-11 space-y-6 -mx-3">
                  <p
                    className={cn(
                      "font-[600] text-[32px] leading-[100%]",
                      activeCard === plan.id ? "text-white" : "text-black"
                    )}
                  >
                    <span className="text-2xl">$</span>
                    {plan.price}
                  </p>
                  {renderFeaturesList(plan.features, activeCard === plan.id)}

                  {/* If the user is already subscribed to this plan, disable the button */}
                  {plan.id === 1 ? (
                    <Link href={plan.link}>
                      <button
                        disabled={isCurrentPlan}
                        className={cn(
                          "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                          activeCard === plan.id
                            ? "bg-white text-[#2A5743] border-white"
                            : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]",
                          isCurrentPlan && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Get Started
                      </button>
                    </Link>
                  ) : (
                    <a href={plan.link} target="_blank" rel="noopener noreferrer">
                      <button
                        disabled={isCurrentPlan}
                        className={cn(
                          "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                          activeCard === plan.id
                            ? "bg-white text-[#2A5743] border-white"
                            : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]",
                          isCurrentPlan && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Get Started
                      </button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* ... rest of your code ... */}
      </Container>
      <CTASection />
      <Footer />
    </>
  );
}
