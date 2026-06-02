"use client";

import { useEffect, useId, useRef, useState } from "react";

function MenuIcon() {
  return (
    <span className="flex flex-col gap-[5px]" aria-hidden>
      <span className="h-[2px] w-5 rounded-full bg-rose-900/40" />
      <span className="h-[2px] w-5 rounded-full bg-rose-900/40" />
      <span className="h-[2px] w-5 rounded-full bg-rose-900/40" />
    </span>
  );
}

const sectionLinks = [
  { href: "#corporate-experience", label: "Corporate Experience" },
  { href: "#current-builds", label: "Current builds" },
  { href: "#contact-me", label: "Contact me" },
] as const;

export function HeaderBrandMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/80 py-2 pl-2 pr-4 shadow-sm shadow-rose-100/80 backdrop-blur-md">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f8c8dc] to-[#e8a4bf] text-sm font-extrabold text-white shadow-sm">
          A
        </span>
        <span className="text-sm font-bold tracking-tight text-rose-950/90">
          Aakansha
        </span>
        <button
          type="button"
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-rose-100 bg-white/70 text-rose-900/50 transition hover:bg-rose-50 hover:text-rose-900"
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="true"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>
      </div>
      {open ? (
        <nav
          id={panelId}
          aria-label="Sections"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[13.5rem] rounded-2xl border border-rose-100/90 bg-white/95 py-1.5 shadow-lg shadow-rose-200/40 backdrop-blur-md"
        >
          <ul className="flex flex-col">
            {sectionLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-4 py-2.5 text-sm font-bold text-rose-950/90 transition hover:bg-rose-50/90"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
