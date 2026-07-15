import instrumentsData from "../data/instruments.json";
import { Instrument, Tier, TierResult, UserProfile } from "../models/types";

const instruments = instrumentsData as Instrument[];

const TIER_LABELS: Record<Tier, string> = {
  safe: "Safe",
  balanced: "Balanced",
  aggressive: "Aggressive / Niche",
};

const TIER_DESCRIPTIONS: Record<Tier, string> = {
  safe: "Capital protection first. Lower, steadier returns, minimal volatility.",
  balanced: "A mix of growth and stability — some volatility, meaningfully higher return potential.",
  aggressive: "Higher potential returns with real volatility and, in some cases, low liquidity — includes niche instruments most people never hear about.",
};

function isEligible(instrument: Instrument, profile: UserProfile): boolean {
  const budgetOk = profile.budget >= instrument.minInvestment;
  const horizonOk = profile.horizonMonths >= instrument.minHorizonMonths;
  // If liquidity need is high (4-5) and instrument liquidity is low, exclude for safe/balanced tiers
  const liquidityConflict = profile.liquidityNeed >= 4 && instrument.liquidity === "low";
  return budgetOk && horizonOk && !liquidityConflict;
}

/**
 * Selects up to `limit` instruments per tier that the user is eligible for,
 * sorted by expected return (favoring instruments that best fit, not just highest return).
 */
export function matchInstruments(profile: UserProfile, riskScore: number): TierResult[] {
  const tiers: Tier[] = ["safe", "balanced", "aggressive"];

  return tiers.map((tier) => {
    let candidates = instruments.filter((i) => i.tier === tier && isEligible(i, profile));

    // Aggressive tier: if horizon is short (<24 months), suppress illiquid/very long-horizon picks
    if (tier === "aggressive" && profile.horizonMonths < 24) {
      candidates = candidates.filter((i) => i.liquidity !== "low");
    }

    candidates = candidates
      .sort((a, b) => (b.expectedReturnMin + b.expectedReturnMax) - (a.expectedReturnMin + a.expectedReturnMax))
      .slice(0, 3);

    return {
      tier,
      label: TIER_LABELS[tier],
      riskBandDescription: TIER_DESCRIPTIONS[tier],
      instruments: candidates.map((i) => ({ ...i, fitReason: "" })),
    };
  });
}
