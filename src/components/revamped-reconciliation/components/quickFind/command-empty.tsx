"use client";

import { cn } from "@/src/lib/utils";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import type React from "react";

export const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      className={cn("px-2 py-4 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
};

CommandEmpty.displayName = "CommandEmpty";
