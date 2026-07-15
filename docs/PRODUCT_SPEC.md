# Product Spec — Personal Investment Advisor Bot (v1)

## 1. One-line pitch
A questionnaire-driven advisory tool that turns a user's financial profile (budget, horizon,
risk appetite, liquidity need, goal) into three tiers of concrete, explained investment
options — Safe, Balanced, and Aggressive/Niche — including under-the-radar instruments that
service-class investors don't usually hear about.

## 2. User persona & today's workflow
- **Persona**: salaried professional, some savings capacity, limited exposure to non-traditional
  instruments, currently defaults to FDs / recurring deposits / LIC policies / whatever their
  bank pushes, because that's what they know.
- **Today**: no structured way to compare options against their own risk/liquidity needs; niche
  high-return instruments (REITs, AIFs, P2P lending, specific debt funds, etc.) are invisible to them.

## 3. Core user flow
1. User answers a 5-step questionnaire: **Budget → Horizon → Risk tolerance → Liquidity need → Goal**.
2. Backend computes a **risk score (0–100)** from the answers (deterministic, rule-based — not
   left to the LLM, so it's auditable and consistent).
3. Risk score + inputs filter a **curated instrument dataset** into 3 tiers.
4. Gemini is used **only** to generate the plain-language explanation of *why* each pick fits the
   user's specific answers — it never decides the picks themselves. This keeps recommendations
   consistent and auditable, and keeps the LLM's role clearly educational rather than advisory.
5. Results page shows three "depth bands": Safe (shallow) → Balanced (mid) → Aggressive/Niche (deep),
   each with 2–3 instruments, expected return band, liquidity, and a one-line "why this fits you."

### Edge cases
- Budget below any minimum investment threshold in dataset → show only accessible instruments,
  note which ones need a higher budget to unlock.
- Horizon < 1 year → Aggressive/Niche tier is suppressed or clearly flagged as unsuitable.
- Gemini API failure → fall back to static template explanations (never block the core result).

## 4. Data model (v1, in-memory JSON — swap for DB in v2)
```
Instrument {
  id, name, category, tier: "safe" | "balanced" | "aggressive",
  expectedReturnMin, expectedReturnMax,   // % annualized
  minInvestment, liquidity: "high" | "medium" | "low",
  minHorizonMonths, description, risks[], niche: boolean
}

UserProfile {
  budget, horizonMonths, riskTolerance (1-5), liquidityNeed (1-5), goal
}
```

## 5. Agent/LLM behavior spec
- **Allowed**: generate natural-language explanation text per matched instrument, given the
  user profile + instrument facts. Purely explanatory, templated prompt, low temperature.
- **Not allowed (v1)**: deciding which instruments to recommend, real-time market data lookups,
  executing any transaction, remembering data across sessions server-side without explicit auth.
- **Escalation**: none needed in v1 (no transactions happen). In v2, any "invest now" action must
  route to a human/licensed flow, not be auto-executed.

## 6. Tech constraints
- No user auth in v1 (stateless, single session).
- Gemini API key stored server-side only, never exposed to frontend.
- Legal: v1 output must carry a visible "educational, not personalized financial advice" disclaimer.

## 7. Non-goals (v1)
- No real brokerage integration / no live trade execution.
- No user accounts, saved history, or portfolio tracking (v2).
- No live market data feeds (v2/v3).

## 8. Success metrics
- Completion rate of the questionnaire (not abandoned mid-way).
- % of users who click into a niche instrument they say they hadn't heard of.
- Qualitative: does the "why this fits you" text feel personalized, not generic.

## 9. Roadmap (future scope — not built in v1, but structure should allow it)
- v2: user accounts, saved profiles, portfolio tracking, admin panel to update instrument dataset.
- v3: live market data ingestion, SEBI-registered advisor partnership for real personalized advice,
  usage-based billing, multi-tenant support for distributing this as a white-label tool.
