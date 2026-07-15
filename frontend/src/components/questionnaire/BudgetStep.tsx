import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const PRESETS = [10000, 50000, 200000, 1000000];

export function BudgetStep() {
  const { setAnswer, goNext, answers } = useQuestionnaireContext();
  const [value, setValue] = useState<number>(answers.budget ?? 50000);

  const handleNext = () => {
    setAnswer("budget", value);
    goNext();
  };

  return (
    <QuestionCard
      eyebrow="01 — Budget"
      question="How much are you looking to invest right now?"
      helper="This can be a lump sum, or think of it as what you could commit today. You can always add more later."
      onNext={handleNext}
    >
      <div className="mb-6">
        <span className="font-mono text-4xl text-white font-tabular">
          ₹{value.toLocaleString("en-IN")}
        </span>
      </div>
      <input
        type="range"
        min={1000}
        max={2000000}
        step={1000}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-gold"
        aria-label="Investment budget in rupees"
      />
      <div className="flex flex-wrap gap-2 mt-5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => setValue(preset)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-colors ${
              value === preset
                ? "border-gold text-gold"
                : "border-line text-ink2 hover:border-ink2"
            }`}
          >
            ₹{preset.toLocaleString("en-IN")}
          </button>
        ))}
      </div>
    </QuestionCard>
  );
}
