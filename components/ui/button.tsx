// components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // utility to merge Tailwind classes

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      variants: {
        variant: {
          default: "bg-blue-600 text-white hover:bg-blue-700",
          outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
          ghost: "text-blue-600 hover:bg-blue-100",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-8 px-3 text-sm",
          lg: "h-12 px-6 text-base",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
          <Comp
              className={cn(buttonVariants({ variant, size }), className)}
              ref={ref}
              {...props}
          />
      );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
