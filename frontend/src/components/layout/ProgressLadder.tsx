import { QUESTIONNAIRE_STEPS } from "../../types";

const STEP_LABELS: Record<(typeof QUESTIONNAIRE_STEPS)[number], string> = {
  budget: "Budget",
  horizon: "Horizon",
  risk: "Risk tolerance",
  liquidity: "Liquidity need",
  goal: "Goal",
};

export function ProgressLadder({ activeIndex }: { activeIndex: number }) {
  return (
    <nav aria-label="Questionnaire progress" className="hidden md:flex flex-col gap-1 w-56 shrink-0">
      {QUESTIONNAIRE_STEPS.map((step, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;
        return (
          <div key={step} className="flex items-center gap-3 py-3">
            <div
              className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                isActive ? "bg-gold" : isDone ? "bg-safe" : "bg-line"
              }`}
            />
            <span
              className={`font-mono text-xs tracking-wide uppercase transition-colors duration-300 ${
                isActive ? "text-white" : isDone ? "text-ink2" : "text-line"
              }`}
            >
              {String(i + 1).padStart(2, "0")} — {STEP_LABELS[step]}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
