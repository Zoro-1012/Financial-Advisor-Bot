import { GoogleGenerativeAI } from "@google/generative-ai";
import { env, isGeminiConfigured } from "../config/env";
import { logger } from "../utils/logger";
import { Instrument, TierResult, UserProfile } from "../models/types";

let client: GoogleGenerativeAI | null = null;
function getClient(): GoogleGenerativeAI {
  if (!client) client = new GoogleGenerativeAI(env.geminiApiKey);
  return client;
}

function fallbackReason(instrument: Instrument, profile: UserProfile): string {
  return `Fits your ${profile.horizonMonths}-month horizon and ${instrument.liquidity} liquidity profile, ` +
    `with expected returns of ${instrument.expectedReturnMin}-${instrument.expectedReturnMax}% annually.`;
}

/**
 * Generates a short, plain-language explanation for why each matched instrument fits the
 * user's profile. Gemini NEVER chooses instruments here — it only explains choices already
 * made deterministically by the risk engine + matcher, in a single batched call per tier.
 */
export async function explainTier(
  tier: TierResult,
  profile: UserProfile,
  riskScore: number
): Promise<TierResult> {
  if (tier.instruments.length === 0 || !isGeminiConfigured()) {
    return {
      ...tier,
      instruments: tier.instruments.map((i) => ({ ...i, fitReason: fallbackReason(i, profile) })),
    };
  }

  try {
    const model = getClient().getGenerativeModel({ model: env.geminiModel });

    const prompt = buildPrompt(tier, profile, riskScore);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = parseReasons(text, tier.instruments.map((i) => i.id));

    return {
      ...tier,
      instruments: tier.instruments.map((i) => ({
        ...i,
        fitReason: parsed[i.id] ?? fallbackReason(i, profile),
      })),
    };
  } catch (err) {
    logger.error("Gemini explanation call failed, using fallback text", { error: String(err) });
    return {
      ...tier,
      instruments: tier.instruments.map((i) => ({ ...i, fitReason: fallbackReason(i, profile) })),
    };
  }
}

function buildPrompt(tier: TierResult, profile: UserProfile, riskScore: number): string {
  const instrumentList = tier.instruments
    .map(
      (i) =>
        `- id: ${i.id}\n  name: ${i.name}\n  category: ${i.category}\n  expectedReturn: ${i.expectedReturnMin}-${i.expectedReturnMax}%\n  liquidity: ${i.liquidity}\n  minHorizonMonths: ${i.minHorizonMonths}\n  description: ${i.description}`
    )
    .join("\n");

  return `You are writing short, plain-language explanations for a personal finance app.
Do not give new recommendations or change the instrument list — only explain, in 1-2 sentences
per instrument, why EACH instrument below suits this specific user. Be concrete and reference
their actual numbers where useful. Avoid hype language. Avoid disclaimers (handled elsewhere).

User profile:
- Budget: INR ${profile.budget}
- Investment horizon: ${profile.horizonMonths} months
- Risk tolerance (1-5): ${profile.riskTolerance}
- Liquidity need (1-5): ${profile.liquidityNeed}
- Goal: ${profile.goal}
- Computed risk score (0-100): ${riskScore}

Instruments to explain:
${instrumentList}

Respond ONLY in this exact format, one line per instrument, nothing else:
id|explanation text`;
}

function parseReasons(text: string, ids: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const separatorIndex = line.indexOf("|");
    if (separatorIndex === -1) continue;
    const id = line.slice(0, separatorIndex).trim();
    const reason = line.slice(separatorIndex + 1).trim();
    if (ids.includes(id) && reason) map[id] = reason;
  }
  return map;
}
