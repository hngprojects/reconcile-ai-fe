import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";

export const DashboardInfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:gap-6">
      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col items-start justify-between md:p-6">
          <h2 className="text-xl font-medium mb-2">
            Current Plan - <span className="text-primary">Basic</span>
          </h2>
          <Button
            className="bg-primary transition-all duration-300 hover:bg-primary/90"
            size="lg"
          >
            Upgrade plan
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 h-40 flex flex-col justify-between md:p-6">
          <h2 className="font-medium mb-2">Number of reconciliation left</h2>
          <p className="text-xl font-bold mb-1">12/20</p>
          <Progress value={60} className="h-2 bg-gray-200" />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 md:p-6 flex flex-col justify-between h-40">
          <h2 className="font-medium mb-2">Usage reset</h2>
          <p className="text-xl font-bold">24 April, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
};
