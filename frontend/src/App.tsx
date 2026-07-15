import { useState } from "react";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";
import { LandingPage } from "./pages/LandingPage";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { ResultsPage } from "./pages/ResultsPage";

type View = "landing" | "questionnaire" | "results";

/**
 * v1 uses simple local view state instead of a router — there's only one linear flow.
 * If v2 adds saved profiles / history / auth, swap this for react-router without
 * touching the page components themselves (they're already self-contained).
 */
function AppShell() {
  const [view, setView] = useState<View>("landing");

  return (
    <>
      {view === "landing" && <LandingPage onStart={() => setView("questionnaire")} />}
      {view === "questionnaire" && (
        <QuestionnairePage onComplete={() => setView("results")} />
      )}
      {view === "results" && <ResultsPage onRestart={() => window.location.reload()} />}
    </>
  );
}

export default function App() {
  return (
    <QuestionnaireProvider>
      <AppShell />
    </QuestionnaireProvider>
  );
}
