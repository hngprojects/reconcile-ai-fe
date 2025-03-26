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
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
// import Link from "next/link";

import CancelSubscriptionModal from "@/src/components/modal/CancelSubscriptionModal";
import { EditIcon, NoteIcon } from "@/src/components/Icon/Icons";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import Link from "next/link";
import { ErrorIcon } from "@/src/components/Icon/Icons";

interface PlanMap {
  [key: string]: number;
  Basic: number;
  Starter: number;
  Business: number;
}

export default function ManagePlanPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPlanDialog, setOpenPlanDialog] = useState(true);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  useEffect(() => {
    if (user?.payment_plan?.plan) {
      // Check for the plan property
      const planMap: PlanMap = {
        Basic: 1,
        Starter: 2,
        Business: 3,
      };
      const currentPlan = user.payment_plan.plan; // Access the plan property
      if (typeof currentPlan === "string" && currentPlan in planMap) {
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
        "Advanced AI matching and reconciliation (Large data set: up to 2000 rows)",
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
    <ProtectedRoute>
      <Container className="py-8 pb-[100px]">
        {/* Back button and Header */}
        <div className="pb-8 px-4 border-b border-[#EAECF0]">
          <button
            type="button"
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

        <div className="flex items-center md:justify-end w-full my-[32px] px-4 md:px-2 gap-[32px]">
          {/* My Plan */}
          <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 border border-[#2E604A] text-[#2E604A] px-4 py-2 rounded-md text-sm cursor-pointer font-medium bg-white shadow-none"
                onClick={() => setOpenPlanDialog(true)}
              >
                <EditIcon className="w-4 h-4" />
                My Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[20px] text-[#000000] font-semibold">
                  My Plan
                </DialogTitle>
                <DialogDescription>
                  <div className="space-y-[12px] p-2">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[#475467]">
                        Current Plan
                      </h3>
                      <p className="text-[14px] text-[#475467] font-semibold">
                        {user?.payment_plan.plan.plan}
                      </p>
                    </div>

                    <div className="space-y-[12px]">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#475467]">Price</h3>
                        <p className="text-[14px] text-[#475467] font-semibold">
                          {user?.payment_plan.price}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#475467]">
                          Billing interval
                        </h3>
                        <p className="text-[14px] text-[#475467] font-semibold">
                          Monthly
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-[#475467]">
                            Reconcilation
                          </h3>
                          <p className="text-[14px] text-[#475467] font-semibold">
                            {user?.payment_plan.reconciliations_used}/{user?.payment_plan.plan.reconciliations_per_month}
                          </p>
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
                      <h3 className="text-[#B42318] font-semibold">
                        Important
                      </h3>
                      <p className="text-[#B42318]">
                        Canceling your subscription will downgrade your account
                        to the Free plan at the end of your current billing
                        period.
                      </p>
                    </div>
                  </div>

                  <div className="py-[24px] px-[16px]">
                    <h2 className="text-[#101828] text-[18px] py-4">
                      What you will loose
                    </h2>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Reconcile up to 20 transaction/month</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Basic AI matching (date, amount, description).</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Export results to CSV.</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Manual adjustments ( unlink and match errors)</p>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer border border-[#E63946] py-[12px] px-[28px] rounded-[8px] text-[#E63946]"
                    onClick={() => alert("Subscription Canceled!")}
                  >
                    Cancel Subscription
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-[#275B4E] text-white py-[12px] px-[28px] rounded-[8px] hover:bg-[#1E4A3E] transition cursor-pointer"
                    onClick={() => setOpenCancelDialog(false)}
                  >
                    Keep Subscription
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href={"/billing-history"}>
            <Button
              variant={"secondary"}
              className="flex gap-2 border border-[#2E604A] text-[#2E604A] px-4 py-2 rounded-md text-sm font-medium cursor-pointer shadow-none bg-white"
            >
              <NoteIcon className="w-4 h-4" />
              Billing history
            </Button>
          </Link>
        </div>

        {/* Existing pricing cards section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col lg:flex-row justify-between gap-8 px-4 xl:gap-12"
        >
          {pricingPlans.map((plan) => {
            const isCurrentPlan = activeCard === plan.id;
            const isHovered = hoveredCard === plan.id;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative w-full lg:w-1/3 rounded-[13px] transition-all duration-300 p-[60px_24px] md:p-[40px_24px] xl:p-[94.7px_32px_40px_32px]",
                  isCurrentPlan
                    ? "bg-[#2E604A] scale-105"
                    : "border-2 border-[#38B43C] hover:scale-105",
                  !isCurrentPlan && activeCard !== null && "opacity-50",
                  isHovered && !isCurrentPlan && "opacity-100"
                )}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                aria-label={`${plan.name} pricing plan`}
              >
                <div className="flex flex-col justify-between gap-10 h-full">
                  <div>
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

                    <div className="mt-11 space-y-6">
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
                        {renderFeaturesList(
                          plan.features,
                          activeCard === plan.id
                        )}
                      </div>
                    </div>
                  </div>

                  {isCurrentPlan ? (
                    <button
                      type="button"
                      disabled
                      className="w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] bg-gray-200 text-primary cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      type="button"
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
        {/* Cancel Subscription Modal */}
        <CancelSubscriptionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </Container>

      <Footer />
    </ProtectedRoute>
  );
}
