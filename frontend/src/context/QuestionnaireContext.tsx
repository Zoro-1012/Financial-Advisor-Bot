import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Goal, QUESTIONNAIRE_STEPS, QuestionnaireStep, UserProfile } from "../types";

type PartialProfile = Partial<UserProfile>;

interface QuestionnaireContextValue {
  answers: PartialProfile;
  stepIndex: number;
  currentStep: QuestionnaireStep;
  totalSteps: number;
  setAnswer: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
  goNext: () => void;
  goBack: () => void;
  isComplete: boolean;
  completedProfile: UserProfile | null;
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<PartialProfile>({});
  const [stepIndex, setStepIndex] = useState(0);

  const setAnswer = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, QUESTIONNAIRE_STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const completedProfile = useMemo<UserProfile | null>(() => {
    const { budget, horizonMonths, riskTolerance, liquidityNeed, goal } = answers;
    if (
      budget === undefined ||
      horizonMonths === undefined ||
      riskTolerance === undefined ||
      liquidityNeed === undefined ||
      goal === undefined
    ) {
      return null;
    }
    return { budget, horizonMonths, riskTolerance, liquidityNeed, goal: goal as Goal };
  }, [answers]);

  const value: QuestionnaireContextValue = {
    answers,
    stepIndex,
    currentStep: QUESTIONNAIRE_STEPS[stepIndex],
    totalSteps: QUESTIONNAIRE_STEPS.length,
    setAnswer,
    goNext,
    goBack,
    isComplete: completedProfile !== null,
    completedProfile,
  };

  return <QuestionnaireContext.Provider value={value}>{children}</QuestionnaireContext.Provider>;
}

export function useQuestionnaireContext() {
  const ctx = useContext(QuestionnaireContext);
  if (!ctx) throw new Error("useQuestionnaireContext must be used within QuestionnaireProvider");
  return ctx;
}
