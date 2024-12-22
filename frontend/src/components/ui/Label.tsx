"use client"

import * as React from "react";
// import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils"; 


const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none ${className}`}
    {...props}
  />
));

Label.displayName = "Label";

export { Label }; 