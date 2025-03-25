import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

export const DashboardInfoCards = () => {
  // const { data: session } = useSession();
  // console.log({ session });

  const { user } = useAuth();

  console.log({ user });
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
  const userPlan = getUserPlan(user?.payment_plan?.plan);

  // Add plan validation helper
  const hasPlanAccess = () => {
    switch (userPlan) {
      case "starter":
        return true;
      case "basic":
        return false;
      default:
        return true; // business plan
    }
  };

  const reconciliationUsed = user?.payment_plan?.reconciliations_used;
  const remainingReconciliationCount =
    userPlan === "basic" ? 5 : userPlan === "starter" ? 20 : "Unlimited";

  const expiryDate = user?.payment_plan.expire_date as string;
  const date = new Date(expiryDate);

  const formattedExpiryDate = format(new Date(date), "d MMMM yyyy, HH:mm:ss");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:gap-6">
      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col items-start justify-between md:p-6">
          <h2 className="text-xl font-medium mb-2">
            Current Plan -{" "}
            <span className="text-primary capitalize">{userPlan}</span>
          </h2>
          <Button
            className="bg-primary transition-all duration-300 hover:bg-primary/90"
            size="lg"
            disabled={userPlan === "business"}
          >
            Upgrade plan
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col justify-between md:p-6">
          <h2 className="font-medium mb-2">Number of reconciliation left</h2>
          <p className="text-xl font-bold mb-1">
            {user?.payment_plan?.reconciliations_used}/
            {remainingReconciliationCount}
          </p>
          <Progress
            value={reconciliationUsed}
            max={
              remainingReconciliationCount === "Unlimited"
                ? undefined
                : remainingReconciliationCount
            }
            className="h-2 bg-gray-200"
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 md:p-6 flex flex-col justify-between h-40">
          <h2 className="font-medium mb-2">
            {hasPlanAccess() ? "Next billing date" : "Usage reset"}
          </h2>
          <p className="text-xl font-bold">{formattedExpiryDate}</p>
        </CardContent>
      </Card>
    </div>
  );
};
