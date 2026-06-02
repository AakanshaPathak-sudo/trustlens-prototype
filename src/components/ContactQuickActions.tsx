"use client";

import { useMemo, useState } from "react";

const CONTACT_EMAIL = "ipm02aakanshap@iimrohtak.ac.in";
const LINKEDIN_URL = "https://linkedin.com/in/aakansha-pathak-ba04731b8";

type ContactQuickActionsProps = {
  theme: "light" | "dark";
};

export function ContactQuickActions({ theme }: ContactQuickActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");

  const styles = useMemo(
    () =>
      theme === "light"
        ? {
            linkedin:
              "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-sky-200/80 bg-sky-50/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-sky-900/85 transition hover:border-sky-400/70 hover:bg-sky-100/80",
            copy:
              "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-rose-200/85 bg-rose-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-rose-900/80 transition hover:border-rose-300/75 hover:bg-rose-100/80",
            note: "text-rose-900/45",
          }
        : {
            linkedin:
              "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-sky-300/40 bg-sky-400/14 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-sky-100 transition hover:border-sky-300/70 hover:bg-sky-300/22",
            copy:
              "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-fuchsia-300/35 bg-fuchsia-400/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-fuchsia-100/95 transition hover:border-fuchsia-300/65 hover:bg-fuchsia-300/20",
            note: "text-white/45",
          },
    [theme],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyState("done");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.35fr_1fr]">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.linkedin}
        >
          Message me on LinkedIn
        </a>
        <button type="button" onClick={handleCopy} className={styles.copy}>
          {copyState === "done" ? "Email copied" : "Copy email ID"}
        </button>
      </div>
    </div>
  );
}
