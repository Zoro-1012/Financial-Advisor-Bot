export type Tier = "safe" | "balanced" | "aggressive";
export type Liquidity = "high" | "medium" | "low";

export interface Instrument {
  id: string;
  name: string;
  category: string;
  tier: Tier;
  expectedReturnMin: number; // annualized %
  expectedReturnMax: number; // annualized %
  minInvestment: number; // in INR
  liquidity: Liquidity;
  minHorizonMonths: number;
  description: string;
  risks: string[];
  niche: boolean;
}

export interface UserProfile {
  budget: number; // INR, amount available to invest
  horizonMonths: number;
  riskTolerance: number; // 1 (very conservative) - 5 (very aggressive)
  liquidityNeed: number; // 1 (can lock up for years) - 5 (need access anytime)
  goal: "wealth_growth" | "capital_protection" | "passive_income" | "short_term_parking";
}

export interface MatchedInstrument extends Instrument {
  fitReason: string; // filled in by Gemini (or fallback template)
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
