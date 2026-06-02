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
      paragraphs: [
        "Started as Program Manager for the Personal Loans sales team and identified key field support gaps for sales managers.",
        "Built performance tracking dashboards and incentive calculators, then shifted to the Business Loans sales team.",
        "Built an AI chatbot for quick stakeholder case analysis and policy input checks.",
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
        "Executed multiple projects in the Retail Assets team for the Business Loans product.",
        "Identified Turn Around Time bottlenecks through direct collaboration with Sales, Ops, Credit, and External Agents.",
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
        "Worked across five crypto products to improve acquisition, engagement, and retention:",
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
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="border-t border-white/12 bg-[#0a0f18]/90 px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-white/70">
        {details.paragraphs?.map((p, i) => (
          <p key={`p-${i}`}>{p}</p>
        ))}
        {details.bullets && details.bullets.length > 0 ? (
          <ul className="list-disc space-y-2 pl-4 marker:text-sky-300/75">
            {details.bullets.map((b, i) => (
              <li key={`b-${i}`}>{b}</li>
            ))}
          </ul>
        ) : null}
        {details.ordered && details.ordered.length > 0 ? (
          <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-white/65">
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
    return "border-sky-300/45 bg-sky-300/12 text-sky-100";
  }
  return "border-violet-300/45 bg-violet-300/12 text-violet-100";
}

const skillBubbleBase =
  "inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-bold leading-tight tracking-tight sm:px-3 sm:text-[11px]";

function companyNameForBubble(company: string) {
  if (company.includes("—")) {
    const left = company.split("—")[0]?.trim();
    if (left) return left;
  }
  return company;
}

const companyBubbleClass =
  "inline-flex max-w-[9.75rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-2.5 py-1 text-center text-[10px] font-semibold leading-tight text-white/85 sm:max-w-[11rem] sm:px-3 sm:text-[11px]";

const experienceCardClass =
  "scroll-mt-28 rounded-2xl border border-white/16 bg-[#0c111b]/92 shadow-[0_12px_34px_-18px_rgba(0,0,0,0.65)] transition duration-300 hover:border-sky-300/55 hover:shadow-[0_16px_44px_-18px_rgba(41,97,255,0.3)]";

const experienceCardClassInteractive =
  `${experienceCardClass} group open:border-sky-300/60 open:bg-[#0d1422]/95`;

function ExperienceCardFace({ row, companyLine, withChevron }: { row: Experience; companyLine: string; withChevron: boolean }) {
  return (
    <>
      <span className="select-none font-sans text-[2.25rem] font-semibold leading-none tracking-tight text-white/[0.16] tabular-nums sm:text-[2.5rem] lg:text-[2.75rem]" aria-hidden>
        {row.index}
      </span>
      <div className="min-w-0 flex-1 pr-2">
        <h3 className="text-base font-bold leading-snug tracking-tight text-white/92 sm:text-lg">{row.role}</h3>
        <p className="mt-1 text-sm font-semibold text-white/75">{companyLine}</p>
        <p className="mt-1 text-xs font-medium text-white/65 sm:text-sm">{row.timeline}</p>
        {row.location ? <p className="mt-0.5 text-xs font-medium text-white/55">{row.location}</p> : null}
      </div>
      <div className="flex items-start gap-2 sm:shrink-0 sm:items-center sm:gap-2.5">
        <div className="flex max-w-[min(100%,15rem)] flex-wrap items-center justify-end gap-1.5 sm:max-w-none sm:flex-nowrap sm:justify-end sm:gap-2">
          <span className={`${companyBubbleClass} text-balance`}>{companyNameForBubble(row.company)}</span>
          {row.skill ? <span className={`${skillBubbleBase} ${skillBubbleClass(row.skill)}`}>{row.skill}</span> : null}
        </div>
        {withChevron ? <ChevronIcon className="mt-0.5 shrink-0 text-sky-200/75 transition duration-300 group-open:rotate-180 sm:mt-0" /> : null}
      </div>
    </>
  );
}

export function ExperienceSectionDark() {
  return (
    <section
      id="corporate-experience"
      aria-labelledby="corporate-experience-heading"
      className="relative z-20 border-t border-white/12 bg-gradient-to-b from-[#0a0f18] via-[#080d16] to-[#070b12] px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <h2 id="corporate-experience-heading" className="mb-10 text-xl font-extrabold uppercase tracking-[0.12em] text-white/92 sm:mb-12 sm:text-2xl sm:tracking-[0.1em] lg:text-3xl lg:tracking-[0.08em]">
          Corporate Experience
        </h2>

        <ul className="relative flex flex-col gap-3 pb-10 sm:gap-4 sm:pb-12">
          {experiences.map((row, i) => {
            const hash = `experience-${row.slug}`;
            const companyLine = row.employment ? `${row.company} · ${row.employment}` : row.company;
            const stackTop = `clamp(4.25rem, ${4.5 + i * 0.65}rem, 9rem)`;
            const stackZ = 10 + i;
            const expandable = hasDetailsContent(row.details);
            return (
              <li key={row.slug} className="relative">
                <div className="sticky" style={{ top: stackTop, zIndex: stackZ }}>
                  {expandable ? (
                    <details id={hash} className={experienceCardClassInteractive}>
                      <summary className="flex cursor-pointer list-none flex-col items-start gap-3 p-4 marker:hidden sm:flex-row sm:gap-5 sm:p-5 lg:p-6 [&::-webkit-details-marker]:hidden">
                        <ExperienceCardFace row={row} companyLine={companyLine} withChevron />
                      </summary>
                      <DetailsBody details={row.details} />
                    </details>
                  ) : (
                    <div id={hash} className={experienceCardClass}>
                      <div className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:gap-5 sm:p-5 lg:p-6">
                        <ExperienceCardFace row={row} companyLine={companyLine} withChevron={false} />
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
