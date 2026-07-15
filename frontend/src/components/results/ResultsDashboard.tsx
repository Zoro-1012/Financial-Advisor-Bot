import { RecommendationResponse } from "../../types";
import { TierBand } from "./TierBand";
import { Button } from "../ui/Button";

interface ResultsDashboardProps {
  data: RecommendationResponse;
  onRestart: () => void;
}

export function ResultsDashboard({ data, onRestart }: ResultsDashboardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-3">Your plan</p>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-display text-5xl font-medium text-white font-tabular">
            {data.riskScore}
          </span>
          <span className="text-ink2 font-mono text-sm">/ 100 risk score</span>
        </div>
        <p className="text-white/80 max-w-2xl leading-relaxed">{data.profileSummary}</p>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        {data.tiers.map((tier, i) => (
          <TierBand key={tier.tier} tier={tier} index={i} />
        ))}
      </div>

      <p className="text-xs text-ink2 leading-relaxed border-t border-line pt-6 mb-8">
        {data.disclaimer}
      </p>

      <Button variant="ghost" onClick={onRestart}>
        Start over
      </Button>
    </div>
  );
}
