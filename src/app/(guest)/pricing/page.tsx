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
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import Link from "next/link"
import { ErrorIcon } from "@/src/components/Icon/Icons";


export default function PricingPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanLink, setSelectedPlanLink] = useState("");  
  const [openPlanDialog, setOpenPlanDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false); 
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
      link: "https://buy.stripe.com/00g9Ez9c42XW9mo14q ",
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
        "Advanced AI matching and reconciliation (Large data set: up to 2000 rows)",
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

        <div className="mt-[111px] flex flex-col gap-[44px] items-end px-4">
          <div className="flex gap-[32px]">
            {/* My Plan */}
            <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
              <DialogTrigger asChild>
                {/* <Button 
                  variant="outline" 
                  className="h-[48px] cursor-pointer border border-[#2E604A] py-[12px] px-[28px] rounded-[8px] text-[#2A5743]"
                  onClick={() => setOpenPlanDialog(true)}
                >
                  My Plan
                </Button> */}
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-[20px] text-[#000000] font-semibold">My Plan</DialogTitle>
                  <DialogDescription>
                    <div className="space-y-[12px] p-2">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#475467]">Current Plan</h3>
                        <p className="text-[14px] text-[#475467] font-semibold">Starter</p>
                      </div>

                      <div className="space-y-[12px]">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-[#475467]">Price</h3>
                          <p className="text-[14px] text-[#475467] font-semibold">$10</p>
                        </div>

                        <div className="flex justify-between">
                          <h3 className="font-semibold text-[#475467]">Billing interval</h3>
                          <p className="text-[14px] text-[#475467] font-semibold">Monthly</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-[#475467]">Reconcilation</h3>
                            <p className="text-[14px] text-[#475467] font-semibold">12/20</p>
                          </div>
                          <div className="w-full h-1 bg-[#F5F5F5] rounded-[100px] overflow-hidden">
                            <div className="w-[60%] h-full bg-[#2E604A]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  {/* <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose> */}
                 <Button
                  variant="outline"
                  className="h-[48px] w-[80%] mx-auto cursor-pointer border border-[#E63946] py-[12px] px-[28px] rounded-[8px] text-[#E63946]"
                  onClick={() => {
                    setOpenPlanDialog(false);
                    setTimeout(() => setOpenCancelDialog(true), 200);
                  }}
                >
                  Cancel Subscription
                 </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Cancel Subscription */}
            <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogDescription className="space-y-4">
                    <div className="border rounded-[12px] p-[16px] border-[#FDA29B] bg-[#FFFBFA] flex flex-col gap-4">
                      <ErrorIcon className="text-[#D92D20]" />
                      <div className="space-y-2">
                       <h3 className="text-[#B42318] font-semibold">Important</h3>
                       <p className="text-[#B42318]">Canceling your subscription will downgrade your account to the Free plan at the end of your current billing period.</p>
                      </div>
                    </div>

                    <div className="py-[24px] px-[16px]">
                      <h2 className="text-[#101828] text-[18px]">What you will loose</h2>

                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <ErrorIcon className="text-[#333333]"/>
                          <p>Reconcile up to 20 transaction/month</p>
                        </div>
                        <div className="flex gap-2">
                          <ErrorIcon className="text-[#333333]"/>
                          <p>Basic AI matching (date, amount, description).</p>
                        </div>
                        <div className="flex gap-2">
                          <ErrorIcon className="text-[#333333]"/>
                          <p>Export results to CSV.</p>
                        </div>
                        <div className="flex gap-2">
                          <ErrorIcon className="text-[#333333]"/>
                          <p>Manual adjustments ( unlink and match errors)</p>
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer border border-[#E63946] py-[12px] px-[28px] rounded-[8px] text-[#E63946]" onClick={() => alert("Subscription Canceled!")}>
                      Cancel Subscription
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="cursor-pointer border border-[#E63946] py-[12px] px-[28px] rounded-[8px] text-[#E63946]" onClick={() => setOpenCancelDialog(false)}>
                      Keep Subscription
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* <Link href="billing-history" className="h-[48px] border border-[#2E604A] py-[12px] px-[28px] rounded-[8px] text-[#2A5743]">Billing History</Link> */}
          </div>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col lg:flex-row justify-between gap-8"
        >

          {pricingPlans.map((plan) => (
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

                {plan.id === 1 ? (
                  <button
                    onClick={() => handleGetStarted(plan.link)}
                    className={cn(
                      "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-colors cursor-pointer",
                      activeCard === plan.id
                        ? "bg-white text-[#2A5743] border-white"
                        : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]"
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
                        : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E]"
                    )}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
          </motion.div>
        </div>

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
                )
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
