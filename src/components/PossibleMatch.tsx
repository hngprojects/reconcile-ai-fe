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
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">Find Possible Match</DialogTitle>
          <DialogClose asChild className='flex'>
            {/* <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </Button> */}
          </DialogClose>
        </DialogHeader>

        <div className="bg-red-100 p-4 rounded-lg border border-red-300">
          <div className="flex justify-between text-sm font-semibold">
            <span>Bank Statement</span>
            <span>615,209</span>
          </div>
          <p className="text-xs text-gray-500">27/01/2024</p>
          <p className="text-sm mt-1">Chichi’s School fees</p>

          <div className="mt-2">
            <Button variant="destructive" className="w-full flex items-center justify-center">
              Unmatched <X className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            // className="pl-10"
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button className="w-fit bg-gray-400 hover:bg-gray-500 text-white mt-2 flex">
          Match
        </Button>
      </DialogContent>
    </Dialog>
  );
}
