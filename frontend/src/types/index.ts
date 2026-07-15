export type Tier = "safe" | "balanced" | "aggressive";
export type Liquidity = "high" | "medium" | "low";
export type Goal = "wealth_growth" | "capital_protection" | "passive_income" | "short_term_parking";

export interface UserProfile {
  budget: number;
  horizonMonths: number;
  riskTolerance: number;
  liquidityNeed: number;
  goal: Goal;
}

export interface MatchedInstrument {
  id: string;
  name: string;
  category: string;
  tier: Tier;
  expectedReturnMin: number;
  expectedReturnMax: number;
  minInvestment: number;
  liquidity: Liquidity;
  minHorizonMonths: number;
  description: string;
  risks: string[];
  niche: boolean;
  fitReason: string;
}

export interface TierResult {
  tier: Tier;
  label: string;
  riskBandDescription: string;
  instruments: MatchedInstrument[];
}

export interface RecommendationResponse {
  riskScore: number;
  profileSummary: string;
  tiers: TierResult[];
  disclaimer: string;
}

export const QUESTIONNAIRE_STEPS = ["budget", "horizon", "risk", "liquidity", "goal"] as const;
export type QuestionnaireStep = (typeof QUESTIONNAIRE_STEPS)[number];
