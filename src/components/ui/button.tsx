"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-none border px-4 font-semibold tracking-tight transition-[transform,box-shadow,filter,background-color,border-color,color]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" ? "h-9 text-sm" : "h-11 text-sm",
        variant === "primary" &&
          "bg-brand text-white border-transparent shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 active:translate-y-0 active:scale-95",
        variant === "secondary" &&
          "bg-transparent text-fg border-slate-200/80 hover:bg-slate-950/5 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 dark:border-slate-800 dark:hover:bg-slate-100/10 dark:hover:border-slate-700",
        variant === "ghost" &&
          "bg-transparent text-fg border-transparent hover:bg-slate-950/5 active:scale-95 dark:hover:bg-slate-100/10",
        className
      )}
      {...props}
    />
  );
}


