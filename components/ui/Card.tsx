"use client";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
}

export function Card({ className, children, glow }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm p-5",
        glow && "card-glow border-amber-500/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("text-base font-semibold text-slate-100", className)}>{children}</h3>;
}

export function CardSubtitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-xs text-slate-400 mt-0.5", className)}>{children}</p>;
}
