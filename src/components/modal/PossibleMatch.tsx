"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import { StatusBadge } from "@/src/components/reconciliation/StatusBadge";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { X, Search } from "lucide-react";

export default function PossibleMatch(
    { open, setOpen }: { open: boolean; setOpen: (state: boolean) => void }) 
{
  const [search, setSearch] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm p-4">
        <DialogHeader className="flex justify-between">
          <DialogTitle className="text-lg font-semibold">Find Possible Match</DialogTitle>
        </DialogHeader>

              <div className="space-y-2 bg-[#FFF4F0] py-6 px-4 rounded-4">
                <div className="text-sm font-medium text-gray-500">
                  Bank Statement
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {/* {item.bankStatement.Date} */}
                      01/01/2025
                    </div>
                    <div className="font-medium text-gray-900">
                      {/* {item.bankStatement.Description} */}
                      chichi shool fees
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {/* {item.bankStatement.Amount} */}
                    612,500
                  </div>
                </div>
                <div className="pt-1">
                  <div className="inline-block border-[0.5px] border-[#C50700] p-2 rounded-3xl">
                    <StatusBadge matched={false} />
                  </div>
                </div>
              </div>

        <div className="relative w-48 py-3">
          <Search className="absolute right-3 top-6 w-4 h-4 text-gray-400" />
          <Input
            className='text-sm'
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-2">
            <Button className="w-52 bg-gray-400 hover:bg-gray-500 text-white cursor-pointer">
                Match
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
