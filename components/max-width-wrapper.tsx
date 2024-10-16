import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full max-w-screen-xl mx-auto px-5 py-8 2xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
