import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const OPTIONS = [
  { label: "Under 1 year", months: 6 },
  { label: "1–3 years", months: 24 },
  { label: "3–5 years", months: 48 },
  { label: "5–10 years", months: 84 },
  { label: "10+ years", months: 144 },
];

export function HorizonStep() {
  const { setAnswer, goNext, goBack, answers } = useQuestionnaireContext();
  const [selected, setSelected] = useState<number | undefined>(answers.horizonMonths);

  const handleNext = () => {
    if (selected === undefined) return;
    setAnswer("horizonMonths", selected);
    goNext();
  };

  return (
    <QuestionCard
      eyebrow="02 — Horizon"
      question="When might you need this money back?"
      helper="A longer horizon can absorb more short-term ups and downs — that opens up more of the plan."
      onNext={handleNext}
      onBack={goBack}
      nextDisabled={selected === undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.months}
            onClick={() => setSelected(opt.months)}
            className={`text-left px-5 py-4 rounded-xl border transition-colors ${
              selected === opt.months
                ? "border-gold bg-gold/10 text-white"
                : "border-line text-ink2 hover:border-ink2"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </QuestionCard>
  );
}
