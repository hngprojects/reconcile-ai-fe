// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import Container from "@/src/components/Container";
// import { useAuth } from "@/src/components/context/AuthContext";
// import { PartyPopper } from "lucide-react";

// export default function SubscriptionSuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { user, updateUserPlan } = useAuth();
//   const [planDetails, setPlanDetails] = useState<{
//     name: string;
//     price: string;
//   } | null>(null);

// //   useEffect(() => {
// //     if (!user) {
// //       router.push("/file-upload");
// //       return;
// //     }

// //     const plan = searchParams.get("plan");
// //     if (plan) {
// //       // Update user plan in backend
// //       updateUserPlan(plan);

// //       // Set plan details for display
// //       const planMap: { [key: string]: { name: string; price: string } } = {
// //         starter: { name: "Starter Plan", price: "$10" },
// //         business: { name: "Business Plan", price: "$25" },
// //         free: { name: "Basic Plan", price: "Free" },
// //       };
// //       setPlanDetails(planMap[plan]);
// //     }
// //   }, [user, searchParams]);

//   return (
//     <Container>
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center max-w-[600px] mx-auto p-8"
//         >
//           <PartyPopper className="w-16 h-16 text-[#2E604A] mx-auto mb-6" />
//           <h1 className="font-inter font-semibold text-[32px] leading-[40px] text-[#101828] mb-4">
//             Welcome to {planDetails?.name}!
//           </h1>
//           <p className="font-inter text-[18px] leading-[28px] text-[#475467] mb-8">
//             Your subscription has been successfully activated. You now have
//             access to all the features included in the {planDetails?.name}.
//           </p>
//           <button
//             onClick={() => router.push("/file-upload")}
//             className="bg-[#2E604A] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[#2E604A]/90 transition-colors cursor-pointer"
//           >
//             Start Reconciling
//           </button>
//         </motion.div>
//       </div>
//     </Container>
//   );
// }
