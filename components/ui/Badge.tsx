"use client";
import { cn } from "@/lib/utils";

type BadgeVariant = "yellow" | "green" | "blue" | "red" | "gray" | "orange";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  yellow: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
  gray: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export function Badge({ variant = "gray", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
