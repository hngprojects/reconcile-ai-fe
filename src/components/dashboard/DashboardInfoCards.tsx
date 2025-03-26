"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/src/components/ui/skeleton";

export const DashboardInfoCards = () => {
  const { user, getUserDetails } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const getUserPlan = (plan: string | undefined) => {
    switch (plan) {
      case "Starter":
        return "starter";
      case "Business":
        return "business";
      default:
        return "basic";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetch = async () => {
      await getUserDetails(token as string);
      setIsLoading(false);
    };

    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userPlan = getUserPlan(user?.payment_plan?.plan?.plan);

  const getReconciliationProgress = () => {
    const used = user?.payment_plan?.reconciliations_used || 0;
    // Get count from localStorage, default to 0 if not set
    //const used = parseInt(localStorage.getItem("reconcileCount") || "0");
    const limit = user?.payment_plan?.plan?.reconciliations_per_month || 20;

    if (limit === -1) return { used, limit: "∞", progress: 0 };

    const progress = Math.min((used / limit) * 100, 100);
    return { used, limit, progress };
  };

  const { used, limit, progress } = getReconciliationProgress();

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpgrade = () => {
    router.push("/manage-plan");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:gap-6">
        {/* Plan Card Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-5 h-40 flex flex-col items-start justify-between md:p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>

        {/* Reconciliation Progress Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-5 h-40 flex flex-col justify-between md:p-6">
            <Skeleton className="h-6 w-2/3" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          </CardContent>
        </Card>

        {/* Date Card Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-5 md:p-6 flex flex-col justify-center gap-4 h-40">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-8 w-40" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:gap-6">
      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col items-start justify-between md:p-6">
          <h2 className="text-xl font-medium mb-2">
            Current Plan -{" "}
            <span className="text-primary capitalize">{userPlan}</span>
          </h2>
          <Button
            className="bg-primary transition-all duration-300 hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
            disabled={userPlan === "business"}
            onClick={handleUpgrade}
          >
            Upgrade plan
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col justify-between md:p-6">
          <h2 className="font-medium mb-2">Reconciliations this month</h2>
          <div>
            <p className="text-xl font-bold mb-1">
              {used} {typeof limit === "string" ? "/ ∞" : `/ ${limit}`}
            </p>
            <Progress
              value={progress}
              className="h-2 bg-gray-200"
              color={progress > 80 ? "destructive" : "primary"}
            />
          </div>
          {typeof limit !== "string" && (
            <p className="text-sm text-gray-500 mt-1">
              {limit - used} reconciliations remaining
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 md:p-6 flex flex-col justify-center gap-4 h-auto">
          <h2 className="font-medium mb-2">
            {userPlan === "basic" ? "Usage reset" : "Next billing date"}
          </h2>
          <p className="text-xl font-bold">
            {formatDate(user?.payment_plan?.expire_date)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
