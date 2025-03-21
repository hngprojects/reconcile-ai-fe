"use client";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import CTASection from "@/src/components/CTASection";
import { motion } from "framer-motion";
import { useAuth } from "@/src/components/context/AuthContext";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";

export default function PricingPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanLink, setSelectedPlanLink] = useState("");
  const { isAuthenticated } = useAuth();

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

  const handleGetStarted = (planLink: string) => {
    if (!isAuthenticated) {
      setSelectedPlanLink(planLink);
      setShowAuthModal(true);
    } else {
      window.location.href = planLink;
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (selectedPlanLink) {
      window.location.href = selectedPlanLink;
    }
  };

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

  return (
    <>
      <Container className="py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[600] text-[48px] leading-[100%] mb-6 font-inter break-words text-center max-w-full sm:max-w-[90%] lg:max-w-[60%] mx-auto"
          >
            Flexible Pricing Plans for Every Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[150%] max-w-[90%] md:max-w-[1216px] mx-auto text-center font-inter"
          >
            Find the perfect financial reconciliation plan for your business.
            From freelancers to large enterprises, ReconXi makes AI-powered
            reconciliation fast, accurate, and affordable.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-[111px] flex flex-col lg:flex-row justify-between gap-8 px-4"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative w-full lg:w-[383px] h-[563px] rounded-[13px] p-[60px_24px] md:p-[80px_28px] lg:p-[94.7px_32px_94.7px_32px] transition-all duration-300",
                activeCard === plan.id
                  ? "bg-[#2E604A] scale-105"
                  : "border-2 border-[#38B43C] hover:scale-105",
                activeCard !== null && activeCard !== plan.id && "opacity-50",
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

                {plan.id === 1 ? (
                  <button
                    onClick={() => handleGetStarted(plan.link)}
                    className={cn(
                      "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                      activeCard === plan.id
                        ? "bg-white text-[#2A5743] border-white"
                        : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]",
                    )}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    onClick={() => handleGetStarted(plan.link)}
                    className={cn(
                      "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                      activeCard === plan.id
                        ? "bg-white text-[#2A5743] border-white"
                        : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]",
                    )}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-[111px]"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-2xl text-center sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-[42px] text-[#101828] leading-tight tracking-tight"
          >
            Why Choose ReconXi?
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col w-full"
          >
            <div className="flex justify-between  flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] w-full">
              {["SME-Friendly Pricing", "Secure & Reliable"].map((title, i) => (
                <div
                  key={i}
                  className="border border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col gap-1.5
                  w-full"
                >
                  <div className="flex mb-2">
                    <Image
                      src={`/assets/images/${
                        i === 0 ? "dollar" : "security"
                      }.svg`}
                      alt={`${title} icon`}
                      width={25}
                      height={25}
                      style={{ width: "auto", height: "auto" }}
                    />
                    <h3 className="flex text-[#2E604A] font-medium ml-[10px]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-start text-sm sm:text-base leading-relaxed">
                    {i === 0 &&
                      " Affordable plans designed for Nigerian businesses and global startups."}
                    {i === 1 &&
                      "Your financial data is protected with bank-grade encrytion."}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-6 lg:gap-[38px] mt-7 lg:mt-11 w-full">
              {["Upload & Export", "AI-Powered Reconciliation"].map(
                (title, i) => (
                  <div
                    key={i}
                    className="border w-full border-[#D9D9D9] rounded-[8px] p-4 md:p-6 flex flex-col justify-center gap-1.5"
                  >
                    <div className="flex justify-left items-center mb-2">
                      <Image
                        src={`/assets/images/${
                          i === 0 ? "upload" : "aiReconcillation"
                        }.svg`}
                        alt={`${title} icon`}
                        width={25}
                        height={25}
                        style={{ width: "auto", height: "auto" }}
                      />
                      <h3 className="text-[#2E604A] font-medium ml-[10px]">
                        {title}
                      </h3>
                    </div>
                    <p className="text-start text-sm sm:text-base leading-relaxed">
                      {i === 0 && "Easily upload and export reports in CSV."}
                      {i === 1 && "Helps to reduce errors."}
                    </p>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSwitchToLogin={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      <CTASection />
      <Footer />
    </>
  );
}
