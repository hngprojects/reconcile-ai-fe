import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const DashboardInfoCards = () => {
  const { user } = useAuth();
  const router = useRouter();

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

  const userPlan = getUserPlan(user?.payment_plan?.plan?.plan);

  const getReconciliationProgress = () => {
    const used = user?.payment_plan?.reconciliations_used || 0;
    const limit = user?.payment_plan?.plan?.reconciliations_per_month || 20;

    if (limit === -1) return { used, limit: "∞", progress: 0 };

    const progress = Math.min((used / limit) * 100, 100);
    return { used, limit, progress };
  };

  const { used, limit, progress } = getReconciliationProgress();

  // const calculateTimeLeft = (date: string) => {
  //   const end = new Date(date);
  //   const now = new Date();
  //   const diff = end.getTime() - now.getTime();

  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  //   return `${days}d ${hours}h left`;
  // };

  // Format date helper
  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleUpgrade = () => {
    router.push("/manage-plan");
  };

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
        <CardContent className="p-5 md:p-6 flex flex-col justify-between h-40">
          <h2 className="font-medium mb-2">
            {userPlan === "basic" ? "Usage reset" : "Next billing date"}
          </h2>
          <div>
            <p className="text-xl font-bold">
              {formatDate(user?.payment_plan?.expire_date)}
            </p>
          </div>
          {/* {user?.payment_plan?.is_active && (
            <p className="text-sm text-green-600">Active</p>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};
