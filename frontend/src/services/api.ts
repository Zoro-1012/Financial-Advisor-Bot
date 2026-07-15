import { RecommendationResponse, UserProfile } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function fetchRecommendations(profile: UserProfile): Promise<RecommendationResponse> {
  const res = await fetch(`${BASE_URL}/recommendations/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Request failed with status ${res.status}`);
  }

  return res.json();
}
