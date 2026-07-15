import { UserProfile } from "../models/types";

/**
 * Deterministic, auditable risk scoring — deliberately NOT delegated to the LLM.
 * Score range: 0 (very conservative) - 100 (very aggressive).
 *
 * Weighting rationale:
 * - riskTolerance (self-reported comfort with volatility) is the strongest signal -> 40%
 * - horizon (longer horizon can absorb more volatility) -> 25%
 * - liquidityNeed (higher need for cash access pulls score down) -> 20%
 * - goal (adjusts score toward growth or protection) -> 15%
 */
export function computeRiskScore(profile: UserProfile): number {
  const toleranceScore = ((profile.riskTolerance - 1) / 4) * 100; // 1-5 -> 0-100

  const horizonScore = Math.min(100, (profile.horizonMonths / 84) * 100); // 7yrs+ = max

  const liquidityScore = 100 - ((profile.liquidityNeed - 1) / 4) * 100; // higher need -> lower score

  const goalScoreMap: Record<UserProfile["goal"], number> = {
    wealth_growth: 80,
    passive_income: 55,
    capital_protection: 15,
    short_term_parking: 5,
  };
  const goalScore = goalScoreMap[profile.goal];

  const weighted =
    toleranceScore * 0.4 + horizonScore * 0.25 + liquidityScore * 0.2 + goalScore * 0.15;

  return Math.round(Math.min(100, Math.max(0, weighted)));
}

export function riskScoreToSummary(score: number): string {
  if (score < 35) return "You lean conservative — protecting capital matters more to you than chasing extra returns.";
  if (score < 65) return "You're a balanced investor — comfortable with some volatility in exchange for meaningfully better growth.";
  return "You lean aggressive — you're comfortable with real volatility in pursuit of higher long-term returns.";
}
