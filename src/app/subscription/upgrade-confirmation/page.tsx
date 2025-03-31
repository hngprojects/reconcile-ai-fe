import Footer from '@/components/Footer'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function UpgradeConfirmationPage() {
  const features = [
    'Reconcile up to 20 transactions/month',
    'Do basic AI matching (date, amount, description)',
    'Export results to CSV',
    'Manual adjustments (unlink and match errors)',
  ]
  return (
    <div>
      <div className="font-inter flex h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto flex w-[90%] max-w-lg flex-col items-center space-y-4 rounded-lg bg-white p-6 text-center shadow-lg">
          <Check className="borde-solid ouline-solid mx-auto h-12 w-12 rounded-full border-1 border-[#91DA98] bg-[#E7F7E9] p-2 text-[#096012] outline-2 outline-[#B5E6BA]" />
          <div>
            <h2 className="mt-4 text-xl font-semibold">
              Success You&apos;ve Upgraded Your Plan
            </h2>
            <p className="mt-2 text-[#64748B]">
              Congratulations You&apos;ve successfully upgraded to the Starter
              plan. This means you now have access to:
            </p>
            <div className="flex items-center justify-center">
              <ul className="mt-4 space-y-2 text-left text-[#64748B]">
                {features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            className="bg-primary hover:bg-primary/90 mt-3 flex h-12 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap text-white sm:h-9"
            href="/file-upload"
          >
            Start Reconciling
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
