import React from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "@/src/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  p?: string;
  key?: React.Key;
}

export function GlowCard({ children, className, containerClassName, p = "p-8" }: GlowCardProps) {
  return (
    <div className={cn("relative h-full rounded-card p-1", containerClassName)}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1",
        p,
        className
      )}>
        {children}
      </div>
    </div>
  );
}
