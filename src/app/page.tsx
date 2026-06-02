"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Stage = "idle" | "running" | "results" | "actions";
type SuggestedAction = {
  title: string;
  intent: string;
  prompt: string;
  preview: string[];
};

const checks = [
  { label: "Evidence Quality", value: 78 },
  { label: "Reasoning Quality", value: 72 },
  { label: "Source Support", value: 58 },
  { label: "Completeness", value: 69 },
];

const findings = [
  {
    type: "Unsupported claim",
    title: "Outcome improvement is overstated",
    detail: "The response says AI tutoring consistently improves outcomes, but it does not identify study size, setting, or comparison group.",
  },
  {
    type: "Missing perspective",
    title: "Equity tradeoffs are underdeveloped",
    detail: "The literature review mentions access gaps, but does not cover privacy, disability access, teacher training, or uneven device availability.",
  },
  {
    type: "Weak reasoning",
    title: "Policy recommendation moves too quickly",
    detail: "The conclusion recommends broad school adoption before weighing evidence quality, implementation cost, or risks of over-reliance.",
  },
];

const suggestedActions: SuggestedAction[] = [
  {
    title: "Verify Claim",
    intent: "Attach evidence to the highlighted claim before keeping it in the paper.",
    prompt: "Find source-backed evidence for the claim about AI tutoring improving achievement across socioeconomic groups.",
    preview: [
      "Check whether the source measures learning outcomes or only engagement.",
      "Add study date, sample size, student group, and limitation.",
      "Downgrade the wording if evidence is mixed.",
    ],
  },
  {
    title: "Improve Sources",
    intent: "Replace vague source language with stronger academic or institutional references.",
    prompt: "Revise the literature review using peer-reviewed studies, government data, and course-approved sources.",
    preview: [
      "Add a source table with author, year, method, and finding.",
      "Flag unsupported claims instead of presenting them as settled facts.",
      "Prefer recent meta-analyses over product blogs or vendor reports.",
    ],
  },
  {
    title: "Add Counterarguments",
    intent: "Make the answer more balanced by adding missing perspectives.",
    prompt: "Add counterarguments about privacy, bias, access gaps, teacher workload, and over-reliance on AI tutors.",
    preview: [
      "Include risks for rural schools and students with limited devices.",
      "Compare teacher-led support with AI-assisted support.",
      "Add a paragraph on when AI tutoring may not improve outcomes.",
    ],
  },
  {
    title: "Regenerate with Stronger Evidence",
    intent: "Ask ChatGPT to rewrite the response with stricter evidence standards.",
    prompt: "Regenerate this literature review with stronger evidence, citations for every major claim, and a cautious conclusion.",
    preview: [
      "Keep the original structure but strengthen claim-by-claim support.",
      "Add counter-evidence and explain conflicting findings.",
      "End with a submission-ready limitations paragraph.",
    ],
  },
];

function Icon({ path, className = "h-4 w-4" }: { path: string; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-zinc-200">{label}</span>
        <span className="font-semibold text-zinc-400">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#10a37f,#74d4bd)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function TrustScore({ score }: { score: number }) {
  return (
    <div className="flex items-end gap-3">
      <span className="text-6xl font-semibold leading-none tracking-normal text-white">{score}</span>
      <span className="pb-2 text-sm font-medium text-zinc-500">/ 100</span>
    </div>
  );
}

function AssistantMark() {
  return (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#10a37f] text-[#06110e]">
      <Icon
        className="h-4 w-4"
        path="M12 3v4m0 10v4M5.64 5.64l2.83 2.83m7.06 7.06 2.83 2.83M3 12h4m10 0h4M5.64 18.36l2.83-2.83m7.06-7.06 2.83-2.83"
      />
    </div>
  );
}

function TrustLensPanel({
  stage,
  loadingStep,
  onClose,
  onActions,
  onResults,
}: {
  stage: Stage;
  loadingStep: number;
  onClose: () => void;
  onActions: () => void;
  onResults: () => void;
}) {
  const isRunning = stage === "running";
  const isActions = stage === "actions";
  const [selectedAction, setSelectedAction] = useState<SuggestedAction | null>(null);
  const [selectedActionTitles, setSelectedActionTitles] = useState<string[]>([]);
  const [appliedSelected, setAppliedSelected] = useState(false);
  const selectedCount = selectedActionTitles.length;

  const toggleAction = useCallback((title: string) => {
    setAppliedSelected(false);
    setSelectedActionTitles((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  }, []);

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 h-[82dvh] overflow-hidden rounded-t-[1.25rem] border border-white/10 bg-[#171717] shadow-[0_-24px_80px_rgba(0,0,0,0.55)] lg:static lg:h-auto lg:w-[390px] lg:shrink-0 lg:rounded-none lg:border-y-0 lg:border-r-0 lg:shadow-none">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-zinc-950">⭐</div>
            <div>
              <p className="text-sm font-semibold text-white">TrustLens</p>
              <p className="text-xs text-zinc-500">Native response evaluation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Close TrustLens panel"
          >
            <Icon path="M18 6 6 18M6 6l12 12" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          {isRunning ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#74d4bd]">Evaluation running</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">Checking the generated response</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  TrustLens is reading the answer in context, comparing claims to source support, and looking for
                  reasoning gaps a student should fix before submission.
                </p>
              </div>

              <div className="space-y-3">
                {checks.map((check, index) => {
                  const active = index <= loadingStep;

                  return (
                    <div
                      key={check.label}
                      className={`flex items-center justify-between gap-3 rounded-lg border p-3 ${
                        active ? "border-[#10a37f]/40 bg-[#10a37f]/10" : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full ${
                            active ? "bg-[#10a37f] text-[#06110e]" : "bg-white/10 text-zinc-500"
                          }`}
                        >
                          <Icon path={active ? "M20 6 9 17l-5-5" : "M12 6v6l4 2"} />
                        </span>
                        <span className="text-sm font-medium text-zinc-100">{check.label}</span>
                      </div>
                      <span className="text-xs font-medium text-zinc-500">{active ? "Done" : "Queued"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : isActions ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#74d4bd]">Suggested Actions</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">Strengthen this answer</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Select actions like a checklist, or open one to preview what ChatGPT will do next.
                </p>
              </div>

              <div className="space-y-3">
                {suggestedActions.map((action) => {
                  const isChecked = selectedActionTitles.includes(action.title);
                  const isOpen = selectedAction?.title === action.title;

                  return (
                    <div
                      key={action.title}
                      className={`flex min-h-14 items-center gap-2 rounded-lg border p-2 transition ${
                        isOpen
                          ? "border-[#10a37f]/50 bg-[#10a37f]/15"
                          : "border-white/10 bg-white/[0.04] hover:border-[#10a37f]/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAction(action.title)}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-[#10a37f]/30 ${
                          isChecked
                            ? "border-[#10a37f] bg-[#10a37f] text-[#06110e]"
                            : "border-white/15 bg-white/[0.04] text-zinc-500 hover:text-zinc-100"
                        }`}
                        aria-label={`${isChecked ? "Unselect" : "Select"} ${action.title}`}
                        aria-pressed={isChecked}
                      >
                        <Icon path={isChecked ? "M20 6 9 17l-5-5" : "M12 5v14M5 12h14"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAction(action)}
                        className="flex min-h-10 min-w-0 flex-1 items-center justify-between gap-3 rounded-md px-2 text-left text-sm font-medium text-zinc-100 transition hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/30"
                        aria-expanded={isOpen}
                      >
                        <span className="min-w-0">{action.title}</span>
                        <Icon path="M9 18l6-6-6-6" className="h-4 w-4 shrink-0 text-zinc-500" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-zinc-200">
                    {selectedCount === 0 ? "No actions selected" : `${selectedCount} action${selectedCount > 1 ? "s" : ""} selected`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedActionTitles(suggestedActions.map((action) => action.title))}
                    className="text-xs font-medium text-[#74d4bd] transition hover:text-white"
                  >
                    Select all
                  </button>
                </div>
                <button
                  type="button"
                  disabled={selectedCount === 0}
                  onClick={() => setAppliedSelected(true)}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
                >
                  {appliedSelected ? "Selected Actions Added" : "Apply Selected to Draft"}
                  <Icon path={appliedSelected ? "M20 6 9 17l-5-5" : "M9 18l6-6-6-6"} />
                </button>
                {appliedSelected ? (
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    ChatGPT is ready to revise the draft using your selected TrustLens actions.
                  </p>
                ) : null}
              </div>

              {selectedAction ? (
                <section className="rounded-xl border border-[#10a37f]/30 bg-[#10a37f]/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#74d4bd]">Action opened</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{selectedAction.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedAction(null)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close selected action"
                    >
                      <Icon path="M18 6 6 18M6 6l12 12" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{selectedAction.intent}</p>

                  <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Prompt ChatGPT will use</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-100">{selectedAction.prompt}</p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {selectedAction.preview.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#74d4bd]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => toggleAction(selectedAction.title)}
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    {selectedActionTitles.includes(selectedAction.title) ? "Selected for Draft" : "Select This Action"}
                    <Icon path={selectedActionTitles.includes(selectedAction.title) ? "M20 6 9 17l-5-5" : "M12 5v14M5 12h14"} />
                  </button>
                </section>
              ) : null}

              <button
                type="button"
                onClick={onResults}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/10 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                Back to Trust Score
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#74d4bd]">Trust Score</p>
                <div className="mt-4">
                  <TrustScore score={76} />
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Useful draft, but the response needs stronger source backing and a more balanced conclusion.
                </p>
              </section>

              <section className="space-y-4">
                {checks
                  .filter((check) => check.label !== "Source Support")
                  .map((check) => (
                    <MetricBar key={check.label} label={check.label} value={check.value} />
                  ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">Highlights</h3>
                  <span className="rounded-full bg-amber-300/15 px-2.5 py-1 text-xs font-medium text-amber-200">
                    3 issues
                  </span>
                </div>
                {findings.map((finding) => (
                  <article key={finding.title} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-xs font-semibold text-[#74d4bd]">{finding.type}</p>
                    <h4 className="mt-1 text-sm font-semibold text-white">{finding.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{finding.detail}</p>
                  </article>
                ))}
              </section>

              <button
                type="button"
                onClick={onActions}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                View Suggested Actions
                <Icon path="M9 18l6-6-6-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default function ChatGPTTrustLensPrototype() {
  const [stage, setStage] = useState<Stage>("idle");
  const [loadingStep, setLoadingStep] = useState(0);
  const panelOpen = stage !== "idle";

  const evaluateResponse = useCallback(() => {
    setLoadingStep(0);
    setStage("running");
  }, []);

  useEffect(() => {
    if (stage !== "running") {
      return;
    }

    const stepTimer = window.setInterval(() => {
      setLoadingStep((current) => Math.min(current + 1, checks.length - 1));
    }, 430);
    const finishTimer = window.setTimeout(() => setStage("results"), 2300);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(finishTimer);
    };
  }, [stage]);

  const highlighted = stage === "results" || stage === "actions";

  const conversationWidth = useMemo(
    () => (panelOpen ? "lg:max-w-[780px]" : "lg:max-w-[840px]"),
    [panelOpen],
  );

  return (
    <main className="min-h-[100dvh] bg-[#212121] text-zinc-100">
      <div className="flex min-h-[100dvh]">
        <aside className="hidden w-[260px] shrink-0 border-r border-white/10 bg-[#171717] px-3 py-3 md:block">
          <button
            type="button"
            className="mb-4 flex min-h-11 w-full items-center gap-3 rounded-lg border border-white/10 px-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            <Icon path="M12 5v14M5 12h14" />
            New chat
          </button>
          <div className="space-y-1 text-sm text-zinc-400">
            <p className="px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-600">Recent</p>
            <button type="button" className="w-full rounded-lg bg-white/10 px-3 py-2 text-left text-zinc-100">
              Literature review on AI tutoring
            </button>
            <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
              Research paper outline
            </button>
            <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
              Citation quality checklist
            </button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg text-zinc-300 hover:bg-white/10 md:hidden"
                aria-label="Open menu"
              >
                <Icon path="M4 6h16M4 12h16M4 18h16" />
              </button>
              <div>
                <p className="text-sm font-semibold text-zinc-100">ChatGPT</p>
                <p className="text-xs text-zinc-500">Future research assistance preview</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[#10a37f]/30 bg-[#10a37f]/10 px-3 py-1.5 text-xs font-medium text-[#74d4bd] sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#10a37f]" />
              TrustLens available
            </div>
          </header>

          <div className="flex min-h-0 flex-1">
            <div className="min-w-0 flex-1 overflow-y-auto">
              <div className={`mx-auto w-full ${conversationWidth} px-4 pb-36 pt-7 transition-[max-width] duration-300 sm:px-6 lg:pb-10`}>
                <div className="space-y-8">
                  <section className="flex justify-end">
                    <div className="max-w-[min(90%,660px)] rounded-3xl bg-[#2f2f2f] px-5 py-4 text-sm leading-6 text-zinc-100 sm:text-base">
                      Write a literature review on whether AI tutoring tools improve student learning outcomes.
                      Include benefits, limitations, and sources.
                    </div>
                  </section>

                  <section className="flex gap-4">
                    <AssistantMark />
                    <div className="min-w-0 flex-1">
                      <div className="prose prose-invert max-w-none text-zinc-100">
                        <p className="text-base leading-8">
                          AI tutoring tools have become a major focus in education research because they can provide
                          individualized feedback, adjust practice difficulty, and offer support outside classroom
                          hours. Several studies suggest that adaptive tutoring systems can improve student learning
                          outcomes, particularly when they give immediate feedback and align closely with curriculum
                          goals.
                        </p>
                        <p className="text-base leading-8">
                          The strongest benefits appear in settings where AI tutors supplement teacher instruction
                          rather than replace it. Students may receive more practice opportunities, teachers may gain
                          insight into common misconceptions, and schools may be able to provide extra help at lower
                          cost.{" "}
                          <span
                            className={
                              highlighted
                                ? "rounded-md bg-amber-300/15 px-1 text-amber-100 ring-1 ring-amber-300/30"
                                : ""
                            }
                          >
                            AI tutoring consistently improves achievement across socioeconomic groups.
                          </span>
                        </p>
                        <p className="text-base leading-8">
                          However, the evidence is mixed. Some tools show gains in narrow skill areas, while broader
                          learning outcomes depend on teacher training, implementation quality, student motivation,
                          and access to reliable devices.{" "}
                          <span
                            className={
                              highlighted
                                ? "rounded-md bg-sky-300/15 px-1 text-sky-100 ring-1 ring-sky-300/30"
                                : ""
                            }
                          >
                            More research is needed on privacy, bias, and long-term dependency.
                          </span>
                        </p>
                        <p className="text-base leading-8">
                          Overall, AI tutoring is promising, but schools should adopt it carefully.{" "}
                          <span
                            className={
                              highlighted
                                ? "rounded-md bg-rose-300/15 px-1 text-rose-100 ring-1 ring-rose-300/30"
                                : ""
                            }
                          >
                            Districts should scale AI tutoring broadly once they confirm the tool improves test scores.
                          </span>{" "}
                          A balanced approach would combine pilot programs, human oversight, data protection policies,
                          and evaluation across different student populations.
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={evaluateResponse}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#10a37f]/40 bg-[#10a37f]/15 px-5 text-sm font-semibold text-[#d7fff4] transition hover:bg-[#10a37f]/25 focus:outline-none focus:ring-2 focus:ring-[#10a37f]/40"
                        >
                          <span aria-hidden="true">⭐</span>
                          Evaluate Response
                        </button>
                        {highlighted ? (
                          <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-zinc-400">
                            TrustLens highlights are shown inline
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {panelOpen ? (
              <TrustLensPanel
                stage={stage}
                loadingStep={loadingStep}
                onClose={() => setStage("idle")}
                onActions={() => setStage("actions")}
                onResults={() => setStage("results")}
              />
            ) : null}
          </div>

          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent px-4 pb-4 pt-12 lg:absolute">
            <div className={`pointer-events-auto mx-auto ${conversationWidth} transition-[max-width] duration-300`}>
              <div className="flex min-h-14 items-end gap-3 rounded-3xl border border-white/10 bg-[#2f2f2f] px-4 py-3 shadow-2xl shadow-black/30">
                <p className="min-w-0 flex-1 pb-1 text-sm text-zinc-500">Ask anything</p>
                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-zinc-950"
                  aria-label="Send message"
                >
                  <Icon path="M12 19V5m0 0-6 6m6-6 6 6" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
