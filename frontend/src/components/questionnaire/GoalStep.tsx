import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";
import { Goal } from "../../types";

const OPTIONS: { value: Goal; label: string; helper: string }[] = [
  { value: "wealth_growth", label: "Grow wealth long-term", helper: "Maximize returns over years, comfortable with ups and downs" },
  { value: "passive_income", label: "Generate steady income", helper: "Regular payouts or interest, not just capital growth" },
  { value: "capital_protection", label: "Protect what I have", helper: "Keep the money safe, growth is secondary" },
  { value: "short_term_parking", label: "Park it for a short while", helper: "Just need somewhere better than a savings account" },
];

interface GoalStepProps {
  onSubmit: () => void;
}

export function GoalStep({ onSubmit }: GoalStepProps) {
  const { setAnswer, goBack, answers } = useQuestionnaireContext();
  const [selected, setSelected] = useState<Goal | undefined>(answers.goal);

  const handleNext = () => {
    if (!selected) return;
    setAnswer("goal", selected);
    onSubmit();
  };

  return (
    <QuestionCard
      eyebrow="05 — Goal"
      question="What's the main job for this money?"
      onNext={handleNext}
      onBack={goBack}
      nextDisabled={!selected}
      nextLabel="See my plan"
    >
      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`text-left px-5 py-4 rounded-xl border transition-colors ${
              selected === opt.value
                ? "border-gold bg-gold/10"
                : "border-line hover:border-ink2"
            }`}
          >
            <p className="text-white font-medium">{opt.label}</p>
            <p className="text-ink2 text-sm mt-0.5">{opt.helper}</p>
          </button>
        ))}
      </div>
    </QuestionCard>
  );
}
