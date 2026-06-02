"use client";

import { useEffect, useId, useRef, useState } from "react";

function MenuIcon() {
  return (
    <span className="flex flex-col gap-[5px]" aria-hidden>
      <span className="h-[2px] w-5 rounded-full bg-sky-100/55" />
      <span className="h-[2px] w-5 rounded-full bg-sky-100/55" />
      <span className="h-[2px] w-5 rounded-full bg-sky-100/55" />
    </span>
  );
}

const sectionLinks = [
  { href: "#corporate-experience", label: "Corporate Experience" },
  { href: "#current-builds", label: "Current builds" },
  { href: "#contact-me", label: "Contact me" },
] as const;

export function HeaderBrandMenuDark() {
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
      <div className="flex items-center gap-3 rounded-full border border-white/20 bg-[#0b1220]/75 py-2 pl-2 pr-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/70 to-indigo-500/70 text-sm font-extrabold text-white shadow-sm">
          A
        </span>
        <span className="text-sm font-bold tracking-tight text-white/90">Aakansha</span>
        <button
          type="button"
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:bg-sky-300/15 hover:text-sky-100"
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
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[14rem] rounded-2xl border border-white/18 bg-[#0b1220]/95 py-1.5 shadow-lg shadow-black/45 backdrop-blur-md"
        >
          <ul className="flex flex-col">
            {sectionLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-4 py-2.5 text-sm font-bold text-white/88 transition hover:bg-sky-300/12"
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
