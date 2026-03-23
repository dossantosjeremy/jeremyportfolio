"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingDown,
  MousePointerClick,
  Database,
  Sparkles,
  Search,
  PenTool,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/utils";

const problems = [
  { id: "p1", title: "Manual Tasks", icon: Clock, x: 15, y: 8 },
  { id: "p2", title: "Bounce Rate", icon: TrendingDown, x: 38, y: 18 },
  { id: "p3", title: "Low Conv.", icon: MousePointerClick, x: 62, y: 8 },
  { id: "p4", title: "Messy Data", icon: Database, x: 85, y: 18 },
];

const solutions = [
  { id: "s1", title: "Insights", icon: Search, x: 20, y: 85 },
  { id: "s2", title: "Value", icon: PenTool, x: 50, y: 95 },
  { id: "s3", title: "Efficiency", icon: Zap, x: 80, y: 85 },
];

const center = { x: 50, y: 50 };

export const ProcessFlow = ({ className }: { className?: string }) => {
  const width = 400;
  const height = 500;

  const getPath = (startX: number, startY: number, endX: number, endY: number) => {
    const sx = (startX / 100) * width;
    const sy = (startY / 100) * height;
    const ex = (endX / 100) * width;
    const ey = (endY / 100) * height;
    const cy1 = sy + (ey - sy) / 2;
    const cy2 = sy + (ey - sy) / 2;
    return `M ${sx} ${sy} C ${sx} ${cy1}, ${ex} ${cy2}, ${ex} ${ey}`;
  };

  return (
    <div className={cn("relative w-full max-w-[500px] h-[450px] sm:h-[500px] mx-auto", className)}>
      {/* SVG Background for lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {/* Base faint lines */}
        {problems.map((p) => (
          <path
            key={`base-${p.id}`}
            d={getPath(p.x, p.y, center.x, center.y)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-zinc-800/50"
          />
        ))}
        {solutions.map((s) => (
          <path
            key={`base-${s.id}`}
            d={getPath(center.x, center.y, s.x, s.y)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-zinc-800/50"
          />
        ))}

        {/* Animated glowing lines */}
        {problems.map((p, i) => (
          <motion.path
            key={`anim-${p.id}`}
            d={getPath(p.x, p.y, center.x, center.y)}
            stroke="url(#glow-in)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="30 400"
            animate={{
              strokeDashoffset: [400, -30],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
        {solutions.map((s, i) => (
          <motion.path
            key={`anim-${s.id}`}
            d={getPath(center.x, center.y, s.x, s.y)}
            stroke="url(#glow-out)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="30 400"
            animate={{
              strokeDashoffset: [400, -30],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 1.2 + i * 0.4,
            }}
          />
        ))}

        <defs>
          <linearGradient id="glow-in" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="glow-out" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* HTML Nodes */}
      {problems.map((p) => (
        <div
          key={p.id}
          className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)] mb-1 sm:mb-2">
            <p.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[9px] sm:text-xs font-medium text-zinc-300 whitespace-nowrap bg-zinc-900/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-zinc-800 backdrop-blur-sm">
            {p.title}
          </span>
        </div>
      ))}

      <div
        className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: `${center.x}%`, top: `${center.y}%` }}
      >
        <div className="relative flex flex-col gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-md w-40 sm:w-48">
          <div className="absolute inset-0 rounded-2xl bg-purple-500/10 animate-pulse"></div>
          
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-800/80 px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
            <Search className="w-4 h-4 text-purple-400" />
            <span>UX Research</span>
          </div>
          
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-800/80 px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
            <PenTool className="w-4 h-4 text-purple-400" />
            <span>Design</span>
          </div>
          
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-800/80 px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Automation</span>
          </div>
        </div>
      </div>

      {solutions.map((s) => (
        <div
          key={s.id}
          className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-1 sm:mb-2">
            <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-sm font-medium text-zinc-200 whitespace-nowrap bg-zinc-900/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-zinc-800 backdrop-blur-sm">
            {s.title}
          </span>
        </div>
      ))}
    </div>
  );
};
