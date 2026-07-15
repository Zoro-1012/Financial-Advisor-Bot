import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { computeRiskScore, riskScoreToSummary } from "../services/riskEngine.service";
import { matchInstruments } from "../services/instrumentMatcher.service";
import { explainTier } from "../services/gemini.service";
import { RecommendationResponse } from "../models/types";

const profileSchema = z.object({
  budget: z.number().positive(),
  horizonMonths: z.number().int().positive(),
  riskTolerance: z.number().int().min(1).max(5),
  liquidityNeed: z.number().int().min(1).max(5),
  goal: z.enum(["wealth_growth", "capital_protection", "passive_income", "short_term_parking"]),
});

const DISCLAIMER =
  "This tool provides educational, generalized information based on the inputs you provided. " +
  "It is not personalized financial advice from a registered investment adviser. Please do your " +
  "own research or consult a SEBI-registered advisor before investing.";

export async function generateRecommendations(req: Request, res: Response, next: NextFunction) {
  try {
    const parseResult = profileSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: "Invalid profile", details: parseResult.error.flatten() });
    }
    const profile = parseResult.data;

    const riskScore = computeRiskScore(profile);
    const rawTiers = matchInstruments(profile, riskScore);

    const explainedTiers = await Promise.all(
      rawTiers.map((tier) => explainTier(tier, profile, riskScore))
    );

    const response: RecommendationResponse = {
      riskScore,
      profileSummary: riskScoreToSummary(riskScore),
      tiers: explainedTiers,
      disclaimer: DISCLAIMER,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
}
