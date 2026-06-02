type ExperienceDetails = {
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
};

type Experience = {
  index: string;
  slug: string;
  role: string;
  company: string;
  /** Shown after company, e.g. "Full-time" / "Internship" */
  employment?: string;
  timeline: string;
  location?: string;
  details: ExperienceDetails;
  skill?: string;
};

const experiences: Experience[] = [
  {
    index: "01",
    slug: "abc-management-trainee",
    role: "Management Trainee - Program Management",
    company: "Aditya Birla Capital",
    employment: "Full-time",
    timeline: "Jun 2025 – Present · 11 mos",
    details: {
      bullets: [
        "Started as a Program Manager for the Personal Loans sales team and gradually identified key gaps in field support for sales managers.",
        "Built performance tracking dashboards and incentive calculators, then moved to the Business Loans sales team.",
        "Built an AI chatbot to support stakeholders with surface-level case analysis and policy inputs.",
      ],
    },
    skill: "Program Management",
  },
  {
    index: "02",
    slug: "abc-product-intern",
    role: "Summer Intern - Product Management",
    company: "Aditya Birla Capital",
    employment: "Internship",
    timeline: "Apr 2024 – May 2024 · 2 mos",
    details: {
      bullets: [
        "Worked across multiple projects in the Retail Assets team for the Business Loans product.",
        "Identified Turn Around Time bottlenecks by observing and collaborating with Sales, Ops, Credit, and External Agents.",
        "Built a dashboard that improved key metrics by more than 50%.",
      ],
    },
    skill: "Product Management",
  },
  {
    index: "03",
    slug: "carret-pm-intern",
    role: "Summer Intern - Product Management",
    company: "Carret",
    employment: "Internship",
    timeline: "Apr 2023 – May 2023 · 2 mos",
    details: {
      paragraphs: [
        "Worked on five products in the crypto user space to improve acquisition, engagement, and retention:",
      ],
      ordered: [
        "Private client services product development",
        "Referral program product development",
        "Integration of customer support channels via APIs with the existing product",
        "Additional product tracks for acquisition and engagement",
        "Retention-focused experiments across crypto user journeys",
      ],
    },
    skill: "Product Management",
  },
];

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function hasDetailsContent(details: ExperienceDetails) {
  return (
    (details.paragraphs?.length ?? 0) > 0 ||
    (details.bullets?.length ?? 0) > 0 ||
    (details.ordered?.length ?? 0) > 0
  );
}

function DetailsBody({ details }: { details: ExperienceDetails }) {
  if (!hasDetailsContent(details)) return null;
  return (
    <div className="border-t border-rose-100/60 bg-rose-950/[0.02] px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
        {details.paragraphs?.map((p, i) => (
          <p key={`p-${i}`}>{p}</p>
        ))}
        {details.bullets && details.bullets.length > 0 ? (
          <ul className="list-disc space-y-2 pl-4 marker:text-rose-300/80">
            {details.bullets.map((b, i) => (
              <li key={`b-${i}`}>{b}</li>
            ))}
          </ul>
        ) : null}
        {details.ordered && details.ordered.length > 0 ? (
          <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-rose-950/50">
            {details.ordered.map((item, i) => (
              <li key={`o-${i}`}>{item}</li>
            ))}
          </ol>
        ) : null}
      </div>
    </div>
  );
}

function skillBubbleClass(skill: string) {
  if (skill === "Product Management") {
    return "border-sky-200/90 bg-gradient-to-br from-sky-50 to-[#e8f2fc] text-sky-900/88 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]";
  }
  return "border-rose-200/90 bg-gradient-to-br from-rose-50 to-[#fff5f8] text-rose-900/88 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]";
}

const skillBubbleBase =
  "inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-bold leading-tight tracking-tight sm:px-3 sm:text-[11px]";

/** Shorten legal/org subtitle after em dash so the bubble stays scannable */
function companyNameForBubble(company: string) {
  if (company.includes("—")) {
    const left = company.split("—")[0]?.trim();
    if (left) return left;
  }
  return company;
}

const companyBubbleClass =
  "inline-flex max-w-[9.75rem] items-center justify-center rounded-full border border-stone-200/80 bg-white/95 px-2.5 py-1 text-center text-[10px] font-semibold leading-tight text-rose-950/78 shadow-[0_1px_0_rgba(255,255,255,1)_inset] sm:max-w-[11rem] sm:px-3 sm:text-[11px]";

const experienceCardClass =
  "scroll-mt-28 rounded-2xl border border-rose-100/80 bg-white/92 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_36px_-14px_rgba(26,21,24,0.14),0_24px_60px_-28px_rgba(26,21,24,0.08)] transition duration-300 hover:border-rose-200/85 hover:shadow-[0_14px_44px_-14px_rgba(26,21,24,0.12)]";

const experienceCardClassInteractive =
  `${experienceCardClass} group open:border-rose-200/90 open:bg-white/95 open:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_18px_52px_-14px_rgba(167,199,231,0.32),0_28px_64px_-24px_rgba(26,21,24,0.1)]`;

function ExperienceCardFace({
  row,
  companyLine,
  withChevron,
}: {
  row: Experience;
  companyLine: string;
  withChevron: boolean;
}) {
  return (
    <>
      <span
        className="select-none font-sans text-[2.25rem] font-semibold leading-none tracking-tight text-rose-950/[0.14] tabular-nums sm:text-[2.5rem] lg:text-[2.75rem]"
        aria-hidden
      >
        {row.index}
      </span>
      <div className="min-w-0 flex-1 pr-2">
        <h3 className="text-base font-bold leading-snug tracking-tight text-rose-950/90 sm:text-lg">
          {row.role}
        </h3>
        <p className="mt-1 text-sm font-semibold text-rose-950/75">{companyLine}</p>
        <p className="mt-1 text-xs font-medium text-[var(--muted)] sm:text-sm">
          {row.timeline}
        </p>
        {row.location ? (
          <p className="mt-0.5 text-xs font-medium text-[var(--muted)]/90">{row.location}</p>
        ) : null}
      </div>
      <div className="flex items-start gap-2 sm:shrink-0 sm:items-center sm:gap-2.5">
        <div className="flex max-w-[min(100%,15rem)] flex-wrap items-center justify-end gap-1.5 sm:max-w-none sm:flex-nowrap sm:justify-end sm:gap-2">
          <span className={`${companyBubbleClass} text-balance`}>
            {companyNameForBubble(row.company)}
          </span>
          {row.skill ? (
            <span className={`${skillBubbleBase} ${skillBubbleClass(row.skill)}`}>
              {row.skill}
            </span>
          ) : null}
        </div>
        {withChevron ? (
          <ChevronIcon className="mt-0.5 shrink-0 text-rose-400/80 transition duration-300 group-open:rotate-180 sm:mt-0" />
        ) : null}
      </div>
    </>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="corporate-experience"
      aria-labelledby="corporate-experience-heading"
      className="relative z-20 border-t border-rose-100/60 bg-gradient-to-b from-[#ebe8ed] via-[#eef1f7] to-[#e6edf8] px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <h2
          id="corporate-experience-heading"
          className="mb-10 text-xl font-extrabold uppercase tracking-[0.12em] text-rose-950/80 sm:mb-12 sm:text-2xl sm:tracking-[0.1em] lg:text-3xl lg:tracking-[0.08em]"
        >
          Corporate Experience
        </h2>

        <ul className="relative flex flex-col gap-3 pb-10 sm:gap-4 sm:pb-12">
          {experiences.map((row, i) => {
            const hash = `experience-${row.slug}`;
            const companyLine = row.employment
              ? `${row.company} · ${row.employment}`
              : row.company;
            const stackTop = `clamp(4.25rem, ${4.5 + i * 0.65}rem, 9rem)`;
            const stackZ = 10 + i;
            const expandable = hasDetailsContent(row.details);
            return (
              <li key={row.slug} className="relative">
                <div
                  className="sticky"
                  style={{ top: stackTop, zIndex: stackZ }}
                >
                  {expandable ? (
                    <details id={hash} className={experienceCardClassInteractive}>
                      <summary className="flex cursor-pointer list-none flex-col items-start gap-3 p-4 marker:hidden sm:flex-row sm:gap-5 sm:p-5 lg:p-6 [&::-webkit-details-marker]:hidden">
                        <ExperienceCardFace
                          row={row}
                          companyLine={companyLine}
                          withChevron
                        />
                      </summary>
                      <DetailsBody details={row.details} />
                    </details>
                  ) : (
                    <div id={hash} className={experienceCardClass}>
                      <div className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:gap-5 sm:p-5 lg:p-6">
                        <ExperienceCardFace
                          row={row}
                          companyLine={companyLine}
                          withChevron={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
