import Link from "next/link";

type ThemeToggleProps = {
  active: "dawn" | "dusk";
  variant: "light" | "dark";
};

/**
 * Prominent Dawn / Dusk switcher. Root `/` is Dawn; `/dark` is Dusk.
 */
export function ThemeToggle({ active, variant }: ThemeToggleProps) {
  const wrap =
    variant === "light"
      ? "inline-flex rounded-full border border-rose-200/90 bg-white/90 p-1 shadow-sm shadow-rose-100/50 backdrop-blur-sm"
      : "inline-flex rounded-full border border-white/22 bg-[#0b1220]/80 p-1 shadow-sm shadow-black/40 backdrop-blur-md";

  const inactive =
    variant === "light"
      ? "rounded-full px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-rose-900/55 transition hover:bg-rose-50/90 hover:text-rose-950 sm:px-3.5 sm:text-xs"
      : "rounded-full px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/55 transition hover:bg-white/8 hover:text-white/90 sm:px-3.5 sm:text-xs";

  const activeCls =
    variant === "light"
      ? "rounded-full bg-gradient-to-r from-[#f8c8dc]/90 via-[#fcecf4]/95 to-[#c7dbef]/90 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-rose-950 shadow-inner shadow-white/60 sm:px-3.5 sm:text-xs"
      : "rounded-full bg-gradient-to-r from-sky-500/35 via-sky-400/25 to-indigo-500/30 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-sky-50 shadow-inner shadow-sky-900/30 sm:px-3.5 sm:text-xs";

  return (
    <nav aria-label="Portfolio theme" className={wrap}>
      <Link href="/" className={active === "dawn" ? activeCls : inactive} aria-current={active === "dawn" ? "page" : undefined}>
        Dawn
      </Link>
      <Link href="/dark" className={active === "dusk" ? activeCls : inactive} aria-current={active === "dusk" ? "page" : undefined}>
        Dusk
      </Link>
    </nav>
  );
}
