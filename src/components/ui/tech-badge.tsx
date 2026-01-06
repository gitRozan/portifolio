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

export function TechBadge({ label, tone, className }: Props) {
  const resolved = tone ?? toneForLabel(label);

  return (
    <span
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/55 px-2 py-1 text-[11px] font-medium tracking-tight text-muted-fg backdrop-blur-sm transition-[transform,box-shadow,border-color,color,background-color] hover:-translate-y-0.5 hover:border-ring/60 hover:text-fg hover:bg-card/70",
        className
      )}
    >
      <span className="text-brand">{iconForTone(resolved)}</span>
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}


