"use client";
import { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/components/context/AuthContext";
import { motion } from "framer-motion";

interface PlanMap {
  [key: string]: number;
  Basic: number;
  Starter: number;
  Business: number;
}

interface ManagePlanSectionProps {
  darkMode: boolean;
}

export default function ManagePlanSection({
  darkMode,
}: ManagePlanSectionProps) {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Set active card based on user's current plan
    if (user?.payment_plan?.plan) {
      const planMap: PlanMap = {
        Basic: 1,
        Starter: 2,
        Business: 3,
      };

      const currentPlan = user.payment_plan.plan;
      if (currentPlan in planMap) {
        setActiveCard(planMap[currentPlan]);
      }
    }
  }, [user]);

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
      ],
    },
    {
      id: 2,
      name: "Starter Plan",
      price: "10",
      link: "https://buy.stripe.com/00g9Ez9c42XW9mo14q ",
      features: [
        "Reconcile up to 20 reconciliations/month",
        "Basic AI matching and reconciliation",
        "Export results to CSV",
        "Manually match records detected as unmatched",
        "Unlink records matched by AI, and match them correctly",
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

  const handlePlanClick = (planLink: string) => {
    window.location.href = planLink;
  };

  return (
    <div className={darkMode ? "text-white" : "text-black"}>
      <h1 className="font-inter font-semibold text-[30px] leading-[38px] mb-2">
        Subscription Management
      </h1>
      <p
        className={`font-inter font-normal text-[16px] leading-[24px] ${darkMode ? "text-gray-300" : "text-[#333333]"} mb-8`}
      >
        Choose the plan that works best for your reconciliation needs.
      </p>

      {/* Pricing cards section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row justify-between gap-8"
      >
        {pricingPlans.map((plan) => {
          const isCurrentPlan = activeCard === plan.id;
          const isHovered = hoveredCard === plan.id;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative w-full lg:w-1/3 rounded-[13px] p-6 transition-all duration-300",
                isCurrentPlan
                  ? "bg-[#2E604A] text-white"
                  : `border-2 border-[#38B43C] hover:scale-105 ${darkMode ? "text-white" : "text-black"}`,
                !isCurrentPlan && activeCard !== null && "opacity-70",
                isHovered && !isCurrentPlan && "opacity-100",
                darkMode && !isCurrentPlan && "bg-[#2E604A]/20"
              )}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              tabIndex={0}
              aria-label={`${plan.name} pricing plan`}
            >
              <div
                className={`border-b ${darkMode ? "border-[#2E604A]" : "border-[#BFB8B8]"} pb-4`}
              >
                <h3
                  className={cn(
                    "font-[500] text-[16px] leading-[100%] font-inter",
                    isCurrentPlan || darkMode ? "text-white" : "text-black"
                  )}
                >
                  {plan.name}
                </h3>
              </div>

              <div className="mt-6 space-y-6">
                <p
                  className={cn(
                    "font-[600] text-[32px] leading-[100%]",
                    activeCard === plan.id ? "text-white" : "text-black"
                  )}
                >
                  <span className="text-2xl">$</span>
                  {plan.price}
                  {plan.price !== "Free" && (
                    <span className="text-sm font-normal">/month</span>
                  )}
                </p>

                <div className="flex-grow">
                  {renderFeaturesList(plan.features, activeCard === plan.id)}
                </div>

                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] bg-gray-400 text-white cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handlePlanClick(plan.link)}
                    className={cn(
                      "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-all duration-300 cursor-pointer",
                      isHovered
                        ? "bg-[#eaf5f1] text-[#2A5743] border-[#2E604A]"
                        : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E] hover:bg-[#eaf5f1] hover:text-[#2A5743] hover:border-[#2E604A]"
                    )}
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
