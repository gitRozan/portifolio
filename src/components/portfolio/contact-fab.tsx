"use client";

import { useEffect, useState } from "react";
import { Mail, MessageSquare, X, Download } from "lucide-react";
import { cn } from "@/lib/cn";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.52c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.78.98-.14.17-.28.19-.53.06-.25-.13-1.04-.38-1.99-1.21-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.01-.38.11-.51.11-.11.25-.28.37-.42.12-.14.17-.23.25-.38.08-.16.04-.29-.02-.42-.06-.13-.56-1.34-.77-1.83-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.42.06-.64.29-.22.23-.84.82-.84 2.01 0 1.18.86 2.33.98 2.49.12.17 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
      <path d="M15.99 3C8.82 3 3 8.82 3 15.99c0 2.28.61 4.5 1.76 6.46L3 29l6.71-1.76c1.9 1.04 4.05 1.59 6.28 1.59h.01c7.17 0 12.99-5.82 12.99-12.99C29 8.82 23.18 3 15.99 3zm0 23.54h-.01c-2.01 0-3.98-.54-5.69-1.56l-.41-.24-3.98 1.05 1.06-3.88-.27-.4a10.51 10.51 0 0 1-1.67-5.68c0-5.79 4.71-10.5 10.5-10.5 2.81 0 5.44 1.09 7.43 3.07a10.45 10.45 0 0 1 3.07 7.43c0 5.79-4.71 10.71-10.03 10.71z" />
    </svg>
  );
}

export function ContactFab({ onDownloadCV }: { onDownloadCV: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        <div
          className={cn(
            "absolute bottom-[56px] right-0 grid gap-2 transition-[opacity,transform] duration-200",
            open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-1"
          )}
        >
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-border bg-card text-fg shadow-soft backdrop-blur-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-ring/60 hover:bg-card/70 active:translate-y-0 active:scale-95"
            aria-label="Download CV"
            onClick={() => {
              onDownloadCV();
              setOpen(false);
            }}
          >
            <Download className="h-4 w-4 text-brand" />
          </button>
          <a
            href="https://api.whatsapp.com/send?phone=5535997434763"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center border border-border bg-card text-fg shadow-soft backdrop-blur-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-ring/60 hover:bg-card/70 active:translate-y-0 active:scale-95"
            aria-label="WhatsApp"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon className="h-5 w-5 text-brand" />
          </a>
          <a
            href="mailto:dev@nicolasbelchior.com"
            className="inline-flex h-11 w-11 items-center justify-center border border-border bg-card text-fg shadow-soft backdrop-blur-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-ring/60 hover:bg-card/70 active:translate-y-0 active:scale-95"
            aria-label="Email"
            onClick={() => setOpen(false)}
          >
            <Mail className="h-4 w-4 text-brand" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center border border-border bg-card text-fg shadow-soft backdrop-blur-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-ring/60 hover:bg-card/70 active:translate-y-0 active:scale-95"
          aria-label="Contato"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4 text-brand" /> : <MessageSquare className="h-4 w-4 text-brand" />}
        </button>
      </div>
    </div>
  );
}


