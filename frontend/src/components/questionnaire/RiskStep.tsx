import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const LABELS = [
  "If it drops, I'm selling immediately",
  "A dip would worry me, but I'd hold",
  "I can stomach normal ups and downs",
  "Volatility doesn't bother me much",
  "I want maximum growth, swings and all",
];

export function RiskStep() {
  const { setAnswer, goNext, goBack, answers } = useQuestionnaireContext();
  const [value, setValue] = useState<number>(answers.riskTolerance ?? 3);

  const handleNext = () => {
    setAnswer("riskTolerance", value);
    goNext();
  };

  return (
    <QuestionCard
      eyebrow="03 — Risk tolerance"
      question="If your investment dropped 15% in a month, what's your honest reaction?"
      helper="Be honest here, not aspirational — this shapes everything else."
      onNext={handleNext}
      onBack={goBack}
    >
      <p className="font-display text-xl text-goldSoft mb-6">{LABELS[value - 1]}</p>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-gold"
        aria-label="Risk tolerance from 1 to 5"
      />
      <div className="flex justify-between mt-2 text-xs font-mono text-ink2">
        <span>Conservative</span>
        <span>Aggressive</span>
      </div>
    </QuestionCard>
  );
}
