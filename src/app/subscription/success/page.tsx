"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@/src/components/Container";
import { useAuth } from "@/src/components/context/AuthContext";
import { PartyPopper } from "lucide-react";
import { updatePaymentPlan } from "@/src/lib/api";
import { toast } from "sonner";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [planDetails, setPlanDetails] = useState<{
    name: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/file-upload");
      return;
    }

    const plan = searchParams.get("plan");
    if (plan) {
      // Plan mapping
      const planMap: { [key: string]: { name: string; price: number } } = {
        starter: { name: "Starter Plan", price: 10.0 },
        business: { name: "Business Plan", price: 25.0 },
      };

      const selectedPlan = planMap[plan.toLowerCase()];
      if (selectedPlan) {
        setPlanDetails(selectedPlan);

        // Update plan in backend
        updatePaymentPlan({
          plan: plan.charAt(0).toUpperCase() + plan.slice(1),
          price: selectedPlan.price,
        })
          .then(() => {
            toast.success("Payment plan updated successfully");
          })
          .catch((error) => {
            console.error("Error updating plan:", error);
            toast.error("Failed to update payment plan");
            router.push("/manage-plan");
          });
      }
    }
  }, [user, searchParams, router]);

  return (
    <Container>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-[600px] mx-auto p-8 border-2 border-[#2E604A] rounded-xl shadow-lg bg-white"
        >
          <div className="bg-[#2E604A]/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-16 h-16 text-[#2E604A]" />
          </div>
          <h1 className="font-inter font-semibold text-[32px] leading-[40px] text-[#101828] mb-4">
            Welcome to {planDetails?.name}!
          </h1>
          <p className="font-inter text-[18px] leading-[28px] text-[#475467] mb-8">
            Your subscription has been successfully activated. You now have
            access to all the features included in the {planDetails?.name}.
          </p>
          <button
            onClick={() => router.push("/file-upload")}
            className="bg-[#2E604A] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[#2E604A]/90 transition-colors cursor-pointer"
          >
            Start Reconciling
          </button>
        </motion.div>
      </div>
    </Container>
  );
}
