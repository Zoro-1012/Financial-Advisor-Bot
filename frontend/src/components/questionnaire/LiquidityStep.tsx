import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const LABELS = [
  "I won't touch this for years",
  "Unlikely, but nice to have access",
  "I might need part of it eventually",
  "I want fairly easy access",
  "I may need to withdraw anytime",
];

export function LiquidityStep() {
  const { setAnswer, goNext, goBack, answers } = useQuestionnaireContext();
  const [value, setValue] = useState<number>(answers.liquidityNeed ?? 3);

  const handleNext = () => {
    setAnswer("liquidityNeed", value);
    goNext();
  };

  return (
    <QuestionCard
      eyebrow="04 — Liquidity"
      question="How easily might you need to access this money?"
      helper="Some strong-return instruments lock your money up for years — this rules those in or out."
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
        aria-label="Liquidity need from 1 to 5"
      />
      <div className="flex justify-between mt-2 text-xs font-mono text-ink2">
        <span>Can lock up</span>
        <span>Need access</span>
      </div>
    </QuestionCard>
  );
}
