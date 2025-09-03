import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]",
          variant === "outline"
            ? "border border-[#4fd1ff] text-[#4fd1ff] bg-transparent hover:bg-[#101c2c] hover:text-white shadow-neon"
            : "bg-[#4fd1ff] text-black hover:bg-[#38bdf8]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
