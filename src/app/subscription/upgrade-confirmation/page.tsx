import Footer from "@/src/components/Footer";
import { Check } from "lucide-react";
import Link from "next/link";

export default function UpgradeConfirmationPage() {
    const features = [
        "Reconcile up to 20 transactions/month",
        "Do basic AI matching (date, amount, description)",
        "Export results to CSV",
        "Manual adjustments (unlink and match errors)",
      ];
  return (
    <div>
        <div className="flex items-center justify-center h-screen bg-gray-50 font-inter">
            <div className="max-w-lg w-[90%] mx-auto bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center space-y-4">
                <Check className="w-12 h-12 mx-auto text-[#096012] border-1 borde-solid bg-[#E7F7E9] border-[#91DA98] rounded-full outline-2 ouline-solid outline-[#B5E6BA] p-2" />
                <div>
                    <h2 className="text-xl font-semibold mt-4">Success! You've Upgraded Your Plan!</h2>
                    <p className="text-[#64748B] mt-2">
                    Congratulations! You've successfully upgraded to the Starter plan. This means you now have access to:
                    </p>
                    <div className="flex justify-center items-center">    
                        <ul className="mt-4 text-left space-y-2 text-[#64748B]">
                            {features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link
                    className="bg-primary whitespace-nowrap w-full  py-2 px-4 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex mt-3"
                    href="/file-upload"
                >
                    Start Reconciling
                </Link>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
