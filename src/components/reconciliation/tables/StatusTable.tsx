"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import { ReconciliationItem } from "../../../types/frontendResponseTypes";
import useRowHeights from "../../../hooks/useRowHeights";

export function StatusTable() {
  const { paginatedData, setShowUnlinkModal, setSelectedRow, userPlan } =
    useReconciliation();
  const rowHeights = useRowHeights(paginatedData);

  const hasPlanAccess = (featureType: "export" | "unlink" | "match") => {
    if (!featureType) return false;

    switch (userPlan) {
      case "starter":
        return true;
      case "basic":
        return false;
      default:
        return true; // business plan has all features
    }
  };

  const getMatchScore = (row: ReconciliationItem): string | null => {
    // If matched, try to get the score from statements or ledgers
    if (row.matched) {
      // Prefer statement score if available
      if (
        row.statements &&
        row.statements.length > 0 &&
        row.statements[0].score
      ) {
        return row.statements[0].score;
      }
      // Fallback to ledger score if statement score is not available
      if (row.ledgers && row.ledgers.length > 0 && row.ledgers[0].score) {
        return row.ledgers[0].score;
      }
    }
    return null;
  };

  const statusColumn: ColumnDef<ReconciliationItem>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const matched = row.original.matched;
        const statementLength = row.original.statements?.length || 0;
        const ledgerLength = row.original.ledgers?.length || 0;
        const matchScore = getMatchScore(row.original);

        // Determine the maximum number of status indicators needed
        const maxItems = Math.max(statementLength, ledgerLength, 1);

        return (
          <div className="flex flex-col">
            {Array.from({ length: maxItems }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "py-5 flex justify-center items-center",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                <div
                  className={cn(
                    "relative flex justify-center items-center text-sm font-semibold px-1",
                    matched ? "text-[#007A55]" : "text-[#C50700] "
                  )}
                >
                  {matchScore && matched && (
                    <span className="mr-2 text-sm">{matchScore}%</span>
                  )}
                  {matched ? "Matched" : "Unmatched"}
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full ml-2 flex items-center justify-center",
                      matched
                        ? "bg-[#007A55] group-hover:hidden"
                        : "bg-[#C50700]"
                    )}
                  >
                    {matched ? (
                      <CheckIcon className="h-3 w-3 text-white" />
                    ) : (
                      <XIcon className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {hasPlanAccess("match") && matched && (
                    <button
                      type="button"
                      title="Unlink matching transactions"
                      className="absolute hidden group-hover:block hover:bg-black/20 p-1 rounded-full cursor-pointer -top-5 -right-5 z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(row.original);
                        setShowUnlinkModal(true);
                      }}
                    >
                      <XIcon className="w-4 h-4 text-[#333333]" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns: statusColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center h-12">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={cn(
                  "transition-colors",
                  row.original.matched
                    ? "bg-green-50 hover:bg-green-50"
                    : "bg-red-50 hover:bg-red-50"
                )}
                style={{ height: `${rowHeights[index]}px` }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("py-0 transition duration-200", {
                      "group hover:bg-[#CEFFED]":
                        row.original.matched && hasPlanAccess("match"),
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
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
// import { cn } from "@/src/lib/utils";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { CheckIcon, XIcon } from "lucide-react";
// import { useReconciliation } from "@/src/context/ReconciliationProvider";
// import { ReconciliationItem } from "../../../types/frontendResponseTypes";
// import useRowHeights from "../../../hooks/useRowHeights";

// export function StatusTable() {
//   const { paginatedData, setShowUnlinkModal, setSelectedRow, userPlan } =
//     useReconciliation();
//   const rowHeights = useRowHeights(paginatedData);

//   const hasPlanAccess = (featureType: "export" | "unlink" | "match") => {
//     if (!featureType) return false;

//     switch (userPlan) {
//       case "starter":
//         return true;
//       case "basic":
//         return false;
//       default:
//         return true; // business plan has all features
//     }
//   };

//   const statusColumn: ColumnDef<ReconciliationItem>[] = [
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => {
//         const matched = row.original.matched;
//         const statementLength = row.original.statements?.length || 0;
//         const ledgerLength = row.original.ledgers?.length || 0;

//         // Determine the maximum number of status indicators needed
//         const maxItems = Math.max(statementLength, ledgerLength, 1);

//         return (
//           <div className="flex flex-col">
//             {Array.from({ length: maxItems }).map((_, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "py-5 flex justify-center items-center",
//                   index > 0 ? "border-t border-gray-200" : ""
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "relative flex justify-center items-center text-sm font-semibold px-1",
//                     matched ? "text-[#007A55]" : "text-[#C50700] "
//                   )}
//                 >
//                   {matched ? "Matched" : "Unmatched"}
//                   <div
//                     className={cn(
//                       "h-4 w-4 rounded-full ml-2 flex items-center justify-center",
//                       matched
//                         ? "bg-[#007A55] group-hover:hidden"
//                         : "bg-[#C50700]"
//                     )}
//                   >
//                     {matched ? (
//                       <CheckIcon className="h-3 w-3 text-white" />
//                     ) : (
//                       <XIcon className="h-3 w-3 text-white" />
//                     )}
//                   </div>

//                   {hasPlanAccess("match") && (
//                     <button
//                       type="button"
//                       title="Unlink matching transactions"
//                       className="absolute hidden group-hover:block hover:bg-black/20 p-1 rounded-full cursor-pointer -top-4 -right-8 z-20"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedRow(row.original);
//                         setShowUnlinkModal(true);
//                       }}
//                     >
//                       <XIcon className="w-4 h-4 text-[#333333]" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: paginatedData,
//     columns: statusColumn,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <>
//       <div className="rounded-md border overflow-hidden">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id} className="text-center h-12">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.map((row, index) => (
//               <TableRow
//                 key={row.id}
//                 className={cn(
//                   "transition-colors",
//                   row.original.matched
//                     ? "bg-green-50 hover:bg-green-50"
//                     : "bg-red-50 hover:bg-red-50"
//                 )}
//                 style={{ height: `${rowHeights[index]}px` }}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                     key={cell.id}
//                     className={cn("py-0 transition duration-200", {
//                       "group hover:bg-[#CEFFED]":
//                         row.original.matched && hasPlanAccess("match"),
//                     })}
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}

//                     {/* {cell.row.original.matched && (
//                       <button
//                         type="button"
//                         title="Unlink matching transactions"
//                         className="absolute hidden group-hover:block hover:bg-black/20 p-1 rounded-full cursor-pointer top-2 right-2 z-50"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setSelectedRow(cell.row.original);
//                           setShowUnlinkModal(true);
//                         }}
//                       >
//                         <XIcon className="w-4 h-4 text-[#333333]" />
//                       </button>
//                     )} */}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }
