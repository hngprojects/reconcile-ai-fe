"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/src/components/context/AuthContext";

interface PlanMap {
  [key: string]: number;
  Basic: number;
  "Starter Plan": number;
  "Business Plan": number;
}

export default function ManagePlanPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // Set active card based on user's current plan
    if (user?.payment_plan?.plan) {
      const planMap: PlanMap = {
        Basic: 1,
        "Starter Plan": 2,
        "Business Plan": 3,
      };

      const currentPlan = user.payment_plan.plan;
      if (currentPlan in planMap) {
        setActiveCard(planMap[currentPlan]);
      }
    }
  }, [user, isAuthenticated, router]);

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
                isActive ? "text-white" : "text-[#39B057]",
              )}
            />
          </span>
          <span
            className={cn(
              "font-[400] text-[13px] leading-[150%] font-inter",
              isActive ? "text-white" : "text-[#333333]",
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
    <>
      <Container className="py-8 pb-[100px]">
        {/* Back button and Header */}
        <div className="pb-8 px-4 border-b border-[#EAECF0]">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[#101828] group-hover:translate-x-[-4px] transition-transform" />
            <span className="font-inter font-medium text-[16px] leading-[38px] text-[#101828]">
              Go Back
            </span>
          </button>

          <h1 className="font-inter font-semibold text-[30px] leading-[38px] text-[#101828] mb-2">
            Billing
          </h1>
          <p className="font-inter font-normal text-[16px] leading-[24px] text-[#333333]">
            Manage your billing and payment details.
          </p>
        </div>

        {/* Existing pricing cards section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col lg:flex-row justify-between gap-8 px-4"
        >
          {pricingPlans.map((plan) => {
            const isCurrentPlan = activeCard === plan.id;
            const isHovered = hoveredCard === plan.id;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative w-full lg:w-[383px] h-[563px] rounded-[13px] p-[60px_24px] md:p-[80px_28px] lg:p-[94.7px_32px_94.7px_32px] transition-all duration-300",
                  isCurrentPlan
                    ? "bg-[#2E604A] scale-105"
                    : "border-2 border-[#38B43C] hover:scale-105",
                  !isCurrentPlan && activeCard !== null && "opacity-50",
                  isHovered && !isCurrentPlan && "opacity-100",
                )}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                aria-label={`${plan.name} pricing plan`}
              >
                <div className="border-b border-[#BFB8B8] pb-5">
                  <h3
                    className={cn(
                      "font-[500] text-[16px] leading-[100%] font-inter",
                      activeCard === plan.id ? "text-white" : "text-black",
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-11 space-y-6 -mx-3">
                  <p
                    className={cn(
                      "font-[600] text-[32px] leading-[100%]",
                      activeCard === plan.id ? "text-white" : "text-black",
                    )}
                  >
                    <span className="text-2xl">$</span>
                    {plan.price}
                  </p>
                  {renderFeaturesList(plan.features, activeCard === plan.id)}

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
                          : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E] hover:bg-[#eaf5f1] hover:text-[#2A5743] hover:border-[#2E604A]",
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
      </Container>

      <Footer />
    </>
  );
}
