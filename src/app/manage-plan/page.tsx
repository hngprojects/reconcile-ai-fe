// "use client";

// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { cn } from "@/src/lib/utils";
// import Container from "@/src/components/Container";
// import Footer from "@/src/components/Footer";
// import { useState, useEffect } from "react";
// import { CircleCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAuth } from "@/src/components/context/AuthContext";
// import { useRequireAuth } from "@/src/hooks/useRequireAuth";
// import { Loader } from "@/src/components/ui/loader";
// import UnAuthorized from "@/src/components/reconciliation/UnAuthorized";
// import { SquarePen } from "lucide-react";
// import { FileDown } from "lucide-react";

// interface PlanMap {
//   [key: string]: number;
//   Basic: number;
//   Starter: number;
//   Business: number;
// }

// export default function ManagePlanPage() {
//   const { isLoading, isAuthenticated } = useRequireAuth();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [activeCard, setActiveCard] = useState<number | null>(null);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   // const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
//   //   "monthly"
//   // );

//   useEffect(() => {
//     if (user?.payment_plan?.plan) {
//       // Check for the plan property
//       const planMap: PlanMap = {
//         Basic: 1,
//         Starter: 2,
//         Business: 3,
//       };
//       const currentPlan = user.payment_plan.plan; // Access the plan property
//       if (currentPlan in planMap) {
//         setActiveCard(planMap[currentPlan]);
//       }
//     }
//   }, [user]);

//   const pricingPlans = [
//     {
//       id: 1,
//       name: "Basic",
//       price: "Free",
//       link: "/file-upload",
//       features: [
//         "Reconcile up to 5 reconciliations/month",
//         "Upload CSV files",
//         "Basic AI reconciliation",
//         "Manually match transactions detected as unmatched",
//       ],
//     },
//     {
//       id: 2,
//       name: "Starter Plan",
//       price: "10",
//       link: "https://buy.stripe.com/00g9Ez9c42XW9mo14q ",
//       features: [
//         "Reconcile up to 20 reconciliations/month",
//         "Basic AI matching and reconciliation",
//         "Export results to CSV",
//         "Manually match records detected as unmatched",
//         "Unlink records matched by AI, and match them correctly",
//       ],
//     },
//     {
//       id: 3,
//       name: "Business Plan",
//       price: "25",
//       link: "https://buy.stripe.com/6oEdUPag8dCAbuw14r",
//       features: [
//         "Everything in Starter Plan",
//         "Unlimited reconciliation/month",
//         "Advanced matching of unmatched records",
//         "Advanced AI matching and reconciliation (Large data set: up to 2000 rows)",
//         "Merging multiple records/files",
//         "Email notification for reconciled results",
//       ],
//     },
//   ];

//   const renderFeaturesList = (features: string[], isActive: boolean) => (
//     <ul className="space-y-4">
//       {features.map((feature, index) => (
//         <li key={index} className="flex items-start gap-2" role="listitem">
//           <span className="flex-shrink-0 my-auto">
//             <CircleCheck
//               className={cn(
//                 "w-5 h-5",
//                 isActive ? "text-white" : "text-[#39B057]"
//               )}
//             />
//           </span>
//           <span
//             className={cn(
//               "font-[400] text-[13px] leading-[150%] font-inter",
//               isActive ? "text-white" : "text-[#333333]"
//             )}
//           >
//             {feature}
//           </span>
//         </li>
//       ))}
//     </ul>
//   );

//   const handlePlanClick = (planLink: string) => {
//     window.location.href = planLink;
//   };

//   if (isLoading || isAuthenticated === null) {
//     return <Loader />;
//   }

//   if (!isAuthenticated) {
//     return <UnAuthorized />;
//   }

//   return (
//     <>
//       <Container className="py-8 pb-[100px]">
//         {/* Back button and Header */}
//         <div className="pb-8 px-4 border-b border-[#EAECF0]">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex items-center gap-2 mb-6 group cursor-pointer"
//           >
//             <ArrowLeft className="w-5 h-5 text-[#101828] group-hover:translate-x-[-4px] transition-transform" />
//             <span className="font-inter font-medium text-[16px] leading-[38px] text-[#101828]">
//               Go Back
//             </span>
//           </button>

//           <h1 className="font-inter font-semibold text-[30px] leading-[38px] text-[#101828] mb-2">
//             Billing
//           </h1>
//           <p className="font-inter font-normal text-[16px] leading-[24px] text-[#333333]">
//             Manage your billing and payment details.
//           </p>
//         </div>

//         {/* buttons */}
//         <div className="flex items-center justify-end w-full my-[24px] gap-[32px]">
//           {/* <div className="flex items-center bg-gray-100 rounded-full p-1">
//             <button
//               className={cn(
//                 "px-4 py-2 rounded-full text-sm font-medium transition-colors",
//                 billingCycle === "monthly"
//                   ? "bg-[#2A5743] text-white"
//                   : "text-gray-600 hover:bg-gray-200"
//               )}
//               onClick={() => setBillingCycle("monthly")}
//             >
//               Monthly
//             </button>
//             <button
//               className={cn(
//                 "px-4 py-2 rounded-full text-sm font-medium transition-colors",
//                 billingCycle === "yearly"
//                   ? "bg-[#2A5743] text-white"
//                   : "text-gray-600 hover:bg-gray-200"
//               )}
//               onClick={() => setBillingCycle("yearly")}
//             >
//               Yearly
//             </button>
//           </div> */}
//           <div className="flex space-x-5">
//             <button className="flex items-center gap-2  border border-[#2E604A] text-[#2A5743] px-[28px] py-[12px] rounded-md text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-[color,box-shadow] duration-300">
//               <SquarePen />
//               My plan
//             </button>
//             <button className="flex items-center gap-2 border border-[#2E604A] text-[#2A5743] px-[28px] py-[12px] rounded-md text-sm font-semibold  hover:bg-accent hover:text-accent-foreground ttransition-[color,box-shadow]duration-300">
//               <FileDown />
//               Billing History
//             </button>
//           </div>
//         </div>

//         {/* Existing pricing cards section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="mt-8 flex flex-col lg:flex-row justify-between gap-8 px-4 xl:gap-12"
//         >
//           {pricingPlans.map((plan) => {
//             const isCurrentPlan = activeCard === plan.id;
//             const isHovered = hoveredCard === plan.id;

//             return (
//               <div
//                 key={plan.id}
//                 className={cn(
//                   "relative w-full lg:w-1/3 rounded-[13px] transition-all duration-300 p-[60px_24px] md:p-[40px_24px] xl:p-[94.7px_32px_40px_32px]",
//                   isCurrentPlan
//                     ? "bg-[#2E604A] scale-105"
//                     : "border-2 border-[#38B43C] hover:scale-105",
//                   !isCurrentPlan && activeCard !== null && "opacity-50",
//                   isHovered && !isCurrentPlan && "opacity-100"
//                 )}
//                 onMouseEnter={() => setHoveredCard(plan.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 tabIndex={0}
//                 aria-label={`${plan.name} pricing plan`}
//               >
//                 <div className="flex flex-col justify-between gap-10 h-full">
//                   <div>
//                     <div className="border-b border-[#BFB8B8] pb-5">
//                       <h3
//                         className={cn(
//                           "font-[500] text-[16px] leading-[100%] font-inter",
//                           activeCard === plan.id ? "text-white" : "text-black"
//                         )}
//                       >
//                         {plan.name}
//                       </h3>
//                     </div>

//                     <div className="mt-11 space-y-6">
//                       <p
//                         className={cn(
//                           "font-[600] text-[32px] leading-[100%]",
//                           activeCard === plan.id ? "text-white" : "text-black"
//                         )}
//                       >
//                         <span className="text-2xl">$</span>
//                         {plan.price}
//                         {plan.price !== "Free" && (
//                           <span className="text-sm font-normal">/month</span>
//                         )}
//                       </p>

//                       <div className="flex-grow">
//                         {renderFeaturesList(
//                           plan.features,
//                           activeCard === plan.id
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {isCurrentPlan ? (
//                     <button
//                       type="button"
//                       disabled
//                       className="w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] bg-gray-200 text-primary cursor-not-allowed"
//                     >
//                       Current Plan
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={() => handlePlanClick(plan.link)}
//                       className={cn(
//                         "w-full h-[47px] rounded-[8px] border-[1.5px] font-[600] text-[16px] leading-[100%] transition-all duration-300 cursor-pointer",
//                         isHovered
//                           ? "bg-[#eaf5f1] text-[#2A5743] border-[#2E604A]"
//                           : "bg-[#2E604A] text-[#EAEFED] border-[#6E756E] hover:bg-[#eaf5f1] hover:text-[#2A5743] hover:border-[#2E604A]"
//                       )}
//                     >
//                       Choose Plan
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </motion.div>
//       </Container>

//       <Footer />
//     </>
//   );
// }

// ManagePlanPage.tsx

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
import { useRequireAuth } from "@/src/hooks/useRequireAuth";
import { Loader } from "@/src/components/ui/loader";
import UnAuthorized from "@/src/components/reconciliation/UnAuthorized";
import { SquarePen } from "lucide-react";
import { FileDown } from "lucide-react";
 
import { MyPlanModal } from "./MyPlanModal";
import { CancelSubscriptionModal } from "./CancelSubscriptionModal";
import { toast } from "sonner";

interface PlanMap {
  [key: string]: number;
  Basic: number;
  Starter: number;
  Business: number;
}

export default function ManagePlanPage() {
  const { isLoading, isAuthenticated } = useRequireAuth();
  const { user } = useAuth();
  const router = useRouter();
 
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMyPlanModalOpen, setIsMyPlanModalOpen] = useState(false);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);

  useEffect(() => {
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

  const handleOpenCancelModal = () => {
    setIsMyPlanModalOpen(false);
    setIsCancelSubscriptionModalOpen(true);
  };

  const handleCancelSubscription = () => {
    setIsCancelSubscriptionModalOpen(false);

    // Show toast notification
    // toast({
    //   title: "Subscription Cancelled",
    //   description:
    //     "Your subscription has been cancelled and will be downgraded at the end of the billing period.",
    //   variant: "default",
    // });
    toast.success("Subscription Cancelled", {
      duration: 5000,
      // className: "bg-green-50 border-green-200",
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });

    // Navigate back to manage plan page
    router.push("/manage-plan");
  };

  const handleKeepSubscription = () => {
    setIsCancelSubscriptionModalOpen(false);
    router.push("/manage-plan");
  };

  if (isLoading || isAuthenticated === null) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <UnAuthorized />;
  }

  return (
    <>
      <Container className="py-8 pb-[100px]">
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

        <div className="flex items-center justify-end w-full my-[24px] gap-[32px]">
          <div className="flex space-x-5">
            <button
              onClick={() => setIsMyPlanModalOpen(true)}
              className="flex items-center gap-2 border border-[#2E604A] text-[#2A5743] px-[28px] py-[12px] rounded-md text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-[color,box-shadow] duration-300"
            >
              <SquarePen />
              My plan
            </button>
            <button
              onClick={() => router.push("/billing-history")}
              className="flex items-center gap-2 border border-[#2E604A] text-[#2A5743] px-[28px] py-[12px] rounded-md text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-[color,box-shadow] duration-300"
            >
              <FileDown />
              Billing History
            </button>
          </div>
        </div>

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

        <MyPlanModal
          isOpen={isMyPlanModalOpen}
          onClose={() => setIsMyPlanModalOpen(false)}
          onOpenCancelModal={handleOpenCancelModal}
        />
        <CancelSubscriptionModal
          isOpen={isCancelSubscriptionModalOpen}
          onClose={handleKeepSubscription}
          onCancel={handleCancelSubscription}
        />
      </Container>

      <Footer />
    </>
  );
}
