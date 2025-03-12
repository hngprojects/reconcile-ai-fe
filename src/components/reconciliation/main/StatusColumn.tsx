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

import { StatusBadge } from "./StatusBadge";

interface StatusData {
  matched: boolean;
}

interface StatusColumnProps {
  statusData: StatusData[];
}

export function StatusColumn({ statusData }: StatusColumnProps) {
  return (
    <div className="mt-[36px] w-[150px]">
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
            <TableRow className="!border-b-0">
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statusData.map((item, index) => (
              <TableRow
                key={index}
                className={cn(
                  item.matched
                    ? "bg-[#F3FEFA] hover:bg-[#F3FEFA]"
                    : "bg-[#FFF4F0] hover:bg-[#FFF4F0]"
                )}
              >
                <TableCell className="text-center h-[64px]">
                  <StatusBadge matched={item.matched} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
