import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  Variant?: ElementType;
  variantProps?: React.ComponentProps<ElementType>;
};

const Container = ({
  children,
  className = "",
  Variant = "div",
  variantProps = {},
}: ContainerProps) => {
  return (
    <Variant
      {...variantProps}
      className={cn(`px-4 md:px-10 max-w-[90rem] mx-auto`, className)}
    >
      {children}
    </Variant>
  );
};

export default Container;
