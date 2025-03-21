"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { FrontendTransaction } from "../types/frontendResponseTypes";
import { cn } from "@/src/lib/utils";

interface TransactionTableProps {
  transaction?: FrontendTransaction | null;
  transactions?: FrontendTransaction | FrontendTransaction[] | null;
  status: "matched" | "unmatched" | "empty";
  NoOfMatchedData?: number;
}

export function TransactionTable({
  transaction,
  transactions,
  status,
  NoOfMatchedData,
}: TransactionTableProps) {
  const getRowStyles = () => {
    switch (status) {
      case "matched":
        return "bg-[#F3FEFA] hover:!bg-[#F3FEFA]";
      case "unmatched":
        return "bg-[#FFF4F0] hover:!bg-[#FFF4F0]";
      default:
        return "";
    }
  };

  // Process the transactions to display
  const transactionsToDisplay: FrontendTransaction[] = [];

  if (transaction) {
    // If a single transaction is provided
    transactionsToDisplay.push(transaction);
  } else if (transactions) {
    // If transactions array or single transaction is provided
    if (Array.isArray(transactions)) {
      transactionsToDisplay.push(...transactions);
    } else {
      transactionsToDisplay.push(transactions);
    }
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        {/* Table Header */}
        <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
          <TableRow className="!border-b-0">
            <TableHead className="text-left px-6 border-r">Date</TableHead>
            <TableHead className="text-left px-6 border-r">
              Description
            </TableHead>
            <TableHead className="text-left px-6">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body */}
        <TableBody>
          {status === "empty" ? (
            <TableRow className="hover:bg-white">
              <TableCell className="border-r h-[64px]"></TableCell>
              <TableCell className="px-6 border-r h-[64px]"></TableCell>
              <TableCell className="px-6 h-[64px]"></TableCell>
            </TableRow>
          ) : transactionsToDisplay.length > 0 ? (
            transactionsToDisplay.map((txn) => (
              <TableRow
                style={{
                  height: `${NoOfMatchedData ? NoOfMatchedData * 60.8 : 60.8}px`,
                }}
                key={txn.id}
                className={cn(getRowStyles())}
              >
                <TableCell className="px-6 border-r h-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn?.date}
                </TableCell>
                <TableCell className="px-6 border-r h-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn?.description}
                </TableCell>
                <TableCell className="px-6 h-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn?.amount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className={cn(getRowStyles())}>
              <TableCell
                colSpan={3}
                className="px-6 h-[64px] text-center text-gray-500"
              >
                No transaction data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/src/components/ui/table";
// import { FrontendTransaction } from "../types/frontendResponseTypes";
// import { cn } from "@/src/lib/utils";

// interface TransactionTableProps {
//   transaction: FrontendTransaction | null;
//   status: "matched" | "unmatched" | "empty";
// }

// export function TransactionTable({
//   transaction,
//   status,
// }: TransactionTableProps) {
//   const getRowStyles = () => {
//     switch (status) {
//       case "matched":
//         return "bg-[#F3FEFA] hover:!bg-[#F3FEFA]";
//       case "unmatched":
//         return "bg-[#FFF4F0] hover:!bg-[#FFF4F0]";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="rounded-lg border overflow-hidden">
//       <Table>
//         {/* Table Header */}
//         <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
//           <TableRow className="!border-b-0">
//             <TableHead className="text-left px-6 border-r">Date</TableHead>
//             <TableHead className="text-left px-6 border-r">
//               Description
//             </TableHead>
//             <TableHead className="text-left px-6">Amount</TableHead>
//           </TableRow>
//         </TableHeader>

//         {/* Table Body */}
//         <TableBody>
//           {status === "empty" ? (
//             <TableRow className="hover:bg-white">
//               <TableCell className="border-r h-[64px]"></TableCell>
//               <TableCell className="px-6 border-r h-[64px]"></TableCell>
//               <TableCell className="px-6 h-[64px]"></TableCell>
//             </TableRow>
//           ) : (
//             <TableRow className={cn(getRowStyles())}>
//               <TableCell className="px-6 border-r h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
//                 {transaction?.date}
//               </TableCell>
//               <TableCell className="px-6 border-r h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
//                 {transaction?.description}
//               </TableCell>
//               <TableCell className="px-6 h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
//                 {transaction?.amount}
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
