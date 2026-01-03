"use client";

import type { ReactNode } from "react";
import { Code2, Database, Cloud, PlugZap, Layers, Braces, Cpu, Wifi, Smartphone, Shield } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone =
  | "react"
  | "js"
  | "ts"
  | "node"
  | "php"
  | "vue"
  | "sap"
  | "cloud"
  | "db"
  | "api"
  | "mobile"
  | "security"
  | "neutral";

type Props = {
  label: string;
  tone?: Tone;
  className?: string;
};

function toneForLabel(label: string): Tone {
  const s = label.toLowerCase();
  if (s.includes("react")) return "react";
  if (s === "typescript" || s.includes("type")) return "ts";
  if (s === "javascript" || s === "js") return "js";
  if (s.includes("node")) return "node";
  if (s === "php") return "php";
  if (s.includes("vue")) return "vue";
  if (s.includes("sap")) return "sap";
  if (s.includes("cloud")) return "cloud";
  if (s.includes("hana") || s.includes("db")) return "db";
  if (s.includes("odata") || s.includes("api")) return "api";
  if (s.includes("native") || s.includes("mobile") || s.includes("hat")) return "mobile";
  if (s.includes("aws") || s.includes("serverless")) return "cloud";
  return "neutral";
}

function iconForTone(tone: Tone): ReactNode {
  if (tone === "react") return <Layers className="h-3.5 w-3.5" />;
  if (tone === "js") return <Code2 className="h-3.5 w-3.5" />;
  if (tone === "ts") return <Braces className="h-3.5 w-3.5" />;
  if (tone === "node") return <Cpu className="h-3.5 w-3.5" />;
  if (tone === "php") return <Code2 className="h-3.5 w-3.5" />;
  if (tone === "vue") return <Layers className="h-3.5 w-3.5" />;
  if (tone === "sap") return <PlugZap className="h-3.5 w-3.5" />;
  if (tone === "cloud") return <Cloud className="h-3.5 w-3.5" />;
  if (tone === "db") return <Database className="h-3.5 w-3.5" />;
  if (tone === "api") return <Wifi className="h-3.5 w-3.5" />;
  if (tone === "mobile") return <Smartphone className="h-3.5 w-3.5" />;
  if (tone === "security") return <Shield className="h-3.5 w-3.5" />;
  return <Code2 className="h-3.5 w-3.5" />;
}

function toneClasses(tone: Tone) {
  if (tone === "react")
    return {
      ring: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,.28),0_0_22px_rgba(34,211,238,.18)]",
      accent: "text-cyan-600 dark:text-cyan-300",
    };
  if (tone === "js")
    return {
      ring: "group-hover:border-amber-400/50 group-hover:shadow-[0_0_0_1px_rgba(251,191,36,.28),0_0_22px_rgba(251,191,36,.16)]",
      accent: "text-amber-700 dark:text-amber-300",
    };
  if (tone === "ts")
    return {
      ring: "group-hover:border-sky-400/55 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,.28),0_0_22px_rgba(56,189,248,.18)]",
      accent: "text-sky-700 dark:text-sky-300",
    };
  if (tone === "node")
    return {
      ring: "group-hover:border-emerald-400/50 group-hover:shadow-[0_0_0_1px_rgba(52,211,153,.25),0_0_22px_rgba(52,211,153,.16)]",
      accent: "text-emerald-700 dark:text-emerald-300",
    };
  if (tone === "php")
    return {
      ring: "group-hover:border-indigo-400/50 group-hover:shadow-[0_0_0_1px_rgba(129,140,248,.25),0_0_22px_rgba(129,140,248,.16)]",
      accent: "text-indigo-700 dark:text-indigo-300",
    };
  if (tone === "vue")
    return {
      ring: "group-hover:border-emerald-400/50 group-hover:shadow-[0_0_0_1px_rgba(52,211,153,.25),0_0_22px_rgba(52,211,153,.16)]",
      accent: "text-emerald-700 dark:text-emerald-300",
    };
  if (tone === "sap")
    return {
      ring: "group-hover:border-sky-400/55 group-hover:shadow-[0_0_0_1px_rgba(14,165,233,.26),0_0_24px_rgba(14,165,233,.18)]",
      accent: "text-sky-700 dark:text-sky-300",
    };
  if (tone === "cloud")
    return {
      ring: "group-hover:border-violet-400/55 group-hover:shadow-[0_0_0_1px_rgba(167,139,250,.24),0_0_22px_rgba(167,139,250,.16)]",
      accent: "text-violet-700 dark:text-violet-300",
    };
  if (tone === "db")
    return {
      ring: "group-hover:border-teal-400/55 group-hover:shadow-[0_0_0_1px_rgba(45,212,191,.22),0_0_22px_rgba(45,212,191,.14)]",
      accent: "text-teal-700 dark:text-teal-300",
    };
  if (tone === "api")
    return {
      ring: "group-hover:border-fuchsia-400/55 group-hover:shadow-[0_0_0_1px_rgba(232,121,249,.22),0_0_22px_rgba(232,121,249,.14)]",
      accent: "text-fuchsia-700 dark:text-fuchsia-300",
    };
  if (tone === "mobile")
    return {
      ring: "group-hover:border-lime-400/55 group-hover:shadow-[0_0_0_1px_rgba(163,230,53,.22),0_0_22px_rgba(163,230,53,.14)]",
      accent: "text-lime-700 dark:text-lime-300",
    };
  if (tone === "security")
    return {
      ring: "group-hover:border-rose-400/55 group-hover:shadow-[0_0_0_1px_rgba(251,113,133,.22),0_0_22px_rgba(251,113,133,.14)]",
      accent: "text-rose-700 dark:text-rose-300",
    };
  return {
    ring: "group-hover:border-slate-400/40 group-hover:shadow-[0_0_0_1px_rgba(148,163,184,.18)]",
    accent: "text-slate-700 dark:text-slate-200",
  };
}

export function TechBadge({ label, tone, className }: Props) {
  const resolved = tone ?? toneForLabel(label);
  const styles = toneClasses(resolved);

  return (
    <span
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-white/50 px-2 py-1 text-[11px] font-medium tracking-tight text-slate-700 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200",
        "backdrop-blur-sm",
        styles.ring,
        className
      )}
    >
      <span className={cn(styles.accent)}>{iconForTone(resolved)}</span>
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}


