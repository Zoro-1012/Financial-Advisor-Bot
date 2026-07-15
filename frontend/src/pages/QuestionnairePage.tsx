import { AnimatePresence } from "framer-motion";
import { ProgressLadder } from "../components/layout/ProgressLadder";
import { ProgressBar } from "../components/ui/ProgressBar";
import { BudgetStep } from "../components/questionnaire/BudgetStep";
import { HorizonStep } from "../components/questionnaire/HorizonStep";
import { RiskStep } from "../components/questionnaire/RiskStep";
import { LiquidityStep } from "../components/questionnaire/LiquidityStep";
import { GoalStep } from "../components/questionnaire/GoalStep";
import { useQuestionnaireContext } from "../context/QuestionnaireContext";

interface QuestionnairePageProps {
  onComplete: () => void;
}

export function QuestionnairePage({ onComplete }: QuestionnairePageProps) {
  const { stepIndex, totalSteps, currentStep } = useQuestionnaireContext();

  const steps: Record<string, JSX.Element> = {
    budget: <BudgetStep />,
    horizon: <HorizonStep />,
    risk: <RiskStep />,
    liquidity: <LiquidityStep />,
    goal: <GoalStep onSubmit={onComplete} />,
  };

  return (
    <div className="min-h-screen px-6 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 md:hidden">
          <ProgressBar current={stepIndex} total={totalSteps} />
        </div>

        <div className="flex gap-16">
          <ProgressLadder activeIndex={stepIndex} />
          <div className="flex-1 flex items-start justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <div key={currentStep}>{steps[currentStep]}</div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
