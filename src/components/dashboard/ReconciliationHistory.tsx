import { ReconciliationHistoryType } from '@/types/reconciliation'
import { ReconciliationHistoryCard } from './ReconcilaitionHistoryCard'
import { ReconciliationHistoryTable } from './ReconciliationHistoryTable'
// import Image from "next/image";
// import Link from "next/link";

interface ReconciliationHistoryProps {
  fromDate?: Date
  toDate?: Date
  isFilterApplied: boolean
  reconciliations: ReconciliationHistoryType[]
}

export default function ReconciliationHistory({
  fromDate,
  isFilterApplied,
  toDate,
  reconciliations,
}: ReconciliationHistoryProps) {
  // if (!!reconciliations && reconciliations.length === 0) {
  //   {
  //     /* Reconciliation History Empty State */
  //   }
  //   return (
  //     <div className="flex flex-col items-center gap-6 mt-12 mb-20">
  //       <div>
  //         <div className="flex items-center justify-center">
  //           <Image
  //             src="/assets/images/no_billing.png"
  //             alt="No Pending Activity"
  //             width={350}
  //             height={270}
  //             className=""
  //             quality={75}
  //             priority={true}
  //           />
  //         </div>
  //         <div className="flex flex-col items-center gap-1 max-w-md">
  //           <h5 className="font-medium text-2xl">No Pending Activity</h5>
  //           <p className="text-center text-[#333333]">
  //             It looks like you haven&apos;t made started reconciling. Once you
  //             do, you&apos;ll see there progress here.
  //           </p>
  //           <Link
  //             href="/file-upload"
  //             className="mt-4 cursor-pointer w-full text-sm font-medium hover:bg-accent border rounded-md h-10 flex justify-center items-center text-primary hover:text-primary border-primary"
  //           >
  //             Start Reconciliation
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="max-md:hidden">
        <ReconciliationHistoryTable
          fromDate={fromDate}
          reconciliations={reconciliations}
          toDate={toDate}
          isFilterApplied={isFilterApplied}
        />
      </div>

      <div className="md:hidden">
        <ReconciliationHistoryCard
          reconciliations={reconciliations}
          fromDate={fromDate}
          toDate={toDate}
          isFilterApplied={isFilterApplied}
        />
      </div>
    </div>
  )
}
