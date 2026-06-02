import Image from "next/image";
import type { ReactNode } from "react";

import { ExperienceSectionDark } from "@/components/ExperienceSectionDark";
import { HeaderBrandMenuDark } from "@/components/HeaderBrandMenuDark";
import { ContactQuickActions } from "@/components/ContactQuickActions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FadeInView } from "@/components/motion/FadeInView";

function ArrowCircleIcon() {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#101a2a] text-sky-300 shadow-inner shadow-sky-900/40"
      aria-hidden
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="translate-x-[1px] translate-y-[-1px]"
      >
        <path
          d="M7 17L17 7M17 7H9M17 7V15"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const heroPillCtaClass =
  "group relative inline-flex w-full min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-[#0f1522]/95 via-[#131d2d]/95 to-[#172539]/95 py-2 pl-2 pr-6 text-left text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_46px_-18px_rgba(35,97,225,0.45)] transition duration-300 hover:scale-[1.02] hover:border-sky-300/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_56px_-20px_rgba(35,97,225,0.62)] sm:pr-8";

function DarkHeroPillLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={heroPillCtaClass}>
      <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-sky-200/35 to-transparent opacity-0 transition duration-300 group-hover:left-[105%] group-hover:opacity-100" />
      <ArrowCircleIcon />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

const darkProjects = [
  {
    title: "Zomato Restaurant Recommendations",
    summary:
      "Built an AI restaurant recommendation engine on a static database-driven ranking model for Zomato restaurants.",
    tags: ["ranking AI algorithms"],
    link: "https://zomato-ai-restaurant-recommendation-system-2fogeucvt4vnqcwkh2p.streamlit.app",
  },
  {
    title: "RAG chatbot for Duolingo | Inspired by Duolingo",
    summary:
      "Built a RAG chatbot with Cursor.ai using Duolingo's public pages to answer user queries related to Duolingo.",
    tags: ["RAG chatbot", "web scraping"],
    link: "https://duolingo-inspired-rag-chatbot.streamlit.app/",
  },
] as const;

export default function DarkPage() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-clip bg-[#020205] text-[#dbe7ff]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_74%_at_12%_-8%,rgba(35,74,155,0.16),transparent),radial-gradient(ellipse_85%_66%_at_94%_4%,rgba(157,23,77,0.08),transparent),linear-gradient(180deg,#04050a_0%,#020206_48%,#020205_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_150%_94%_at_50%_54%,transparent_50%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_48%_44%_at_50%_38%,rgba(56,189,248,0.1),transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_150%_96%_at_50%_52%,transparent_44%,rgba(2,6,14,0.74)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.5px,transparent_0.7px)] [background-size:2px_2px]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#2563eb]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-[#0ea5e9]/18 blur-3xl"
        aria-hidden
      />

      <header className="relative z-40 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 pt-9 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">
        <FadeInView y={12}>
          <HeaderBrandMenuDark />
        </FadeInView>
        <FadeInView y={12} delay={0.05}>
          <ThemeToggle active="dusk" variant="dark" />
        </FadeInView>
      </header>

      <div className="relative z-10 flex-1 px-4 pb-10 pt-1 sm:px-6 lg:px-10">
        <div className="relative mx-auto min-h-[min(88dvh,820px)] w-full max-w-[1400px] lg:min-h-[calc(100dvh-4.5rem)]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[47%] z-0 h-[min(82vh,720px)] w-[min(60vw,660px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_68%_60%_at_50%_52%,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.9)_48%,rgba(4,8,16,0.44)_72%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-20 flex w-max max-w-[min(calc(100%-1.25rem),46%)] select-none flex-col gap-y-1 overflow-visible text-left font-sans font-medium tracking-[0.16em] text-white/[0.2] antialiased left-[max(0.5rem,1.5vw)] top-[clamp(17rem,52dvh,30rem)] sm:tracking-[0.18em] lg:left-[max(0.5rem,1.5vw)] lg:top-[clamp(26.5rem,54dvh,38rem)] lg:max-w-[min(34%,21rem)]"
            style={{
              fontSize:
                "min(4.1rem, max(1.75rem, calc((min(100vw, 1400px) * 0.27 - 1rem) / 4.95)))",
              lineHeight: 0.98,
            }}
          >
            <span className="block uppercase leading-[0.95]">SYSTEMS</span>
            <span className="block uppercase leading-[0.95]">USERS</span>
            <span className="block uppercase leading-[0.95]">INTELLIGENCE</span>
          </div>

          <FadeInView className="relative z-[6] mx-auto mt-1 w-[min(86vw,390px)] lg:absolute lg:left-1/2 lg:top-[2%] lg:mt-0 lg:w-[min(36vw,470px)] lg:-translate-x-1/2" delay={0.14}>
            <div className="group relative aspect-[768/1024] overflow-visible">
              <div className="pointer-events-none absolute -inset-x-16 -bottom-16 -top-12 bg-[radial-gradient(ellipse_62%_52%_at_50%_56%,rgba(56,189,248,0.22),rgba(56,189,248,0.04)_50%,transparent_80%)] blur-3xl" />
              <div className="pointer-events-none absolute -inset-x-18 -bottom-18 -top-12 bg-[radial-gradient(ellipse_44%_36%_at_42%_72%,rgba(239,68,68,0.12),transparent_70%)] blur-3xl" />
              <div className="pointer-events-none absolute inset-0 scale-[1.08] blur-2xl opacity-44">
                <Image
                  src="/dark-rider.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 86vw, 470px"
                  className="object-cover object-[48%_30%]"
                />
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-[2rem] [mask-image:radial-gradient(ellipse_124%_114%_at_50%_42%,#000_52%,rgba(0,0,0,0.52)_74%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_124%_114%_at_50%_42%,#000_52%,rgba(0,0,0,0.52)_74%,transparent_100%)] sm:rounded-[2.25rem] lg:rounded-[2.5rem]">
                <Image
                  src="/dark-rider.png"
                  alt="Aakansha on bike"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 500px"
                  className="rounded-[2rem] scale-[1.12] object-cover object-[48%_30%] saturate-[0.93] brightness-[0.84] contrast-[1.02] transition duration-700 group-hover:scale-[1.16] sm:rounded-[2.25rem] lg:rounded-[2.5rem]"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020206]/6 via-[#020206]/1 via-26% to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[84%] bg-gradient-to-t from-[#020205]/98 via-[#020205]/56 via-44% to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#020205] via-[#020205]/72 via-50% to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] bg-gradient-to-l from-[#020205] via-[#020205]/72 via-50% to-transparent" />
            </div>
          </FadeInView>

          <FadeInView
            className="relative z-40 isolate mx-auto mt-8 max-w-xl px-1 lg:absolute lg:left-[max(0.5rem,1.5vw)] lg:top-[11%] lg:mx-0 lg:mt-0 lg:max-w-[min(26rem,32vw)] lg:px-0"
            delay={0.08}
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-[#0c111b]/80 px-3 py-1.5 shadow-sm shadow-sky-900/25 backdrop-blur-md">
              <span
                className="relative flex h-2 w-2 shrink-0 rounded-full bg-[#7dd3fc]"
                aria-hidden
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-sky-300/60" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-sky-100/85">
                Open to interesting opportunities
              </span>
            </div>

            <p className="mt-5 text-base font-semibold leading-relaxed tracking-[-0.01em] text-white/88 sm:text-[1.02rem]">
              Hi, I&apos;m <span className="text-sky-200">Aakansha</span> — I build{" "}
              <span className="text-white">systems, users, and intelligence</span>.
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white/95 sm:text-4xl lg:mt-6 lg:text-[2.15rem] lg:leading-[1.06]">
              Program Manager,
              <br />
              Fintech
              <br />
              building toward
              <br />
              Product with AI
              <br />
              <span className="font-bold text-sky-200 [text-shadow:0_0_14px_rgba(56,189,248,0.45)]">
                based in Bangalore
              </span>
            </h1>
          </FadeInView>

          <div className="relative z-40 mx-auto mt-12 max-w-sm px-1 lg:absolute lg:right-[max(0.5rem,1.5vw)] lg:top-[20%] lg:bottom-[max(6.5rem,12dvh)] lg:mx-0 lg:mt-0 lg:flex lg:max-w-[min(24rem,92vw)] lg:flex-col lg:justify-between lg:px-0 lg:text-right">
            <FadeInView className="space-y-5 rounded-2xl bg-[#060913]/55 p-3 text-left text-sm font-medium leading-relaxed text-white/82 backdrop-blur-[1px] sm:text-[0.95rem] lg:space-y-6 lg:bg-transparent lg:p-0 lg:text-right" delay={0.2}>
              <p>
                Program Manager (Management Trainee) at Aditya Birla Capital, with a PPO conversion from my Product Intern role.
              </p>
              <p>
                BBA-MBA from IIM Rohtak,
                <br />
                building across fintech and AI
                <br />
                with Figma Make, Cursor, Claude Code, and Codex.
              </p>
            </FadeInView>
            <FadeInView
              className="mt-8 flex w-full flex-col items-stretch gap-3 sm:gap-3.5 lg:mt-0 lg:max-w-[min(22rem,30vw)] lg:-translate-y-10 lg:self-end"
              delay={0.28}
            >
              <nav aria-label="Section links" className="contents">
                <DarkHeroPillLink href="#corporate-experience">
                  Corporate Experience
                </DarkHeroPillLink>
                <DarkHeroPillLink href="#current-builds">
                  Current builds
                </DarkHeroPillLink>
                <DarkHeroPillLink href="#contact-me">
                  Contact me
                </DarkHeroPillLink>
              </nav>
            </FadeInView>
          </div>
        </div>
      </div>

      <FadeInView delay={0.06}>
        <ExperienceSectionDark />
      </FadeInView>

      <section id="current-builds" className="relative z-20 px-4 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <FadeInView className="mx-auto max-w-[1100px]" delay={0.06}>
          <div className="mb-7 flex flex-wrap items-center justify-start gap-6">
            <h2 className="text-xl font-extrabold uppercase tracking-[0.1em] text-white/92 sm:text-2xl">
              Current Builds
            </h2>
            <a
              href="https://github.com/AakanshaPathak-sudo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/24 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-sky-100/90 shadow-sm transition hover:border-sky-300/70 hover:bg-sky-300/12"
            >
              Visit my GitHub
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {darkProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-white/16 bg-[#0d1320]/90 p-5 shadow-[0_18px_34px_-22px_rgba(37,99,235,0.34)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:shadow-[0_22px_40px_-18px_rgba(14,165,233,0.42)]"
              >
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <p
                      key={tag}
                      className="inline-flex rounded-full border border-white/20 bg-white/6 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-100/90"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-bold text-white/92">{project.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">{project.summary}</p>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-sky-200 underline decoration-sky-400/70 underline-offset-4"
                  >
                    View project
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </FadeInView>
      </section>

      <section className="relative z-20 border-t border-white/12 bg-[#060b14] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <FadeInView className="mx-auto grid max-w-[1100px] gap-7 lg:grid-cols-2" delay={0.08}>
          <article className="rounded-2xl border border-white/14 bg-[#0b1220]/90 p-5 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.45)]">
            <h3 className="text-lg font-extrabold uppercase tracking-[0.08em] text-white/92">
              Education
            </h3>
            <p className="mt-3 text-sm font-bold text-white/92">
              BBA + MBA - Integrated Programme in Management (IPM) | Indian Institute of Management (IIM) Rohtak
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              September 2020 - March 2025
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/72">
              Completed coursework across 50+ subjects during undergraduate studies, spanning Psychology, Philosophy, Mathematics, Law, Information Technology, Communication, and Foreign Languages. Specialized in MIS (IT) and Marketing & Strategy during MBA.
            </p>
          </article>

          <article className="rounded-2xl border border-white/14 bg-[#0b1220]/90 p-5 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.45)]">
            <h3 className="text-lg font-extrabold uppercase tracking-[0.08em] text-white/92">
              Licenses & Certifications
            </h3>
            <ul className="mt-3 space-y-2 text-sm font-medium text-white/72">
              <li>🦾 NextLeap - Product Management Fellowship</li>
              <li>🚀 New York Academy of Sciences - Junior Academy and 1000Girls 1000Futures</li>
            </ul>
          </article>
        </FadeInView>
      </section>

      <section
        id="contact-me"
        className="relative z-20 border-t border-white/12 bg-[#070b13]/85 px-4 py-14 backdrop-blur-sm sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <FadeInView className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[1.2fr_1fr]" delay={0.08}>
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-[0.1em] text-white/92 sm:text-2xl">Contact me</h2>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/72 sm:text-base">
              Open to roles across product, fintech, and AI systems - let&apos;s connect.
            </p>
          </div>
          <div className="flex h-full items-center rounded-2xl border border-white/15 bg-[#0d1320]/90 p-5 shadow-[0_16px_34px_-24px_rgba(0,0,0,0.46)]">
            <ContactQuickActions theme="dark" />
          </div>
        </FadeInView>
      </section>
    </section>
  );
}
