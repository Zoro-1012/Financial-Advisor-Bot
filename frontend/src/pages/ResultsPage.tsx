import { useEffect } from "react";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/ui/Button";
import { ResultsDashboard } from "../components/results/ResultsDashboard";
import { useRecommendations } from "../hooks/useQuestionnaire";
import { useQuestionnaireContext } from "../context/QuestionnaireContext";

export function ResultsPage({ onRestart }: { onRestart: () => void }) {
  const { completedProfile } = useQuestionnaireContext();
  const { status, data, error, run } = useRecommendations();

  useEffect(() => {
    if (completedProfile) run(completedProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 md:py-16">
      {status === "loading" && <Spinner label="Matching instruments to your profile…" />}

      {status === "error" && (
        <div className="max-w-md mx-auto text-center py-16">
          <p className="text-white mb-2 font-display text-xl">Couldn't build your plan</p>
          <p className="text-ink2 text-sm mb-6">{error}</p>
          <Button onClick={() => completedProfile && run(completedProfile)}>Try again</Button>
        </div>
      )}

      {status === "success" && data && <ResultsDashboard data={data} onRestart={onRestart} />}
    </div>
  );
}
