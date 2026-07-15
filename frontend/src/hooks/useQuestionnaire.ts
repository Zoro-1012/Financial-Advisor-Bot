import { useCallback, useState } from "react";
import { fetchRecommendations } from "../services/api";
import { RecommendationResponse, UserProfile } from "../types";

type Status = "idle" | "loading" | "success" | "error";

export function useRecommendations() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (profile: UserProfile) => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetchRecommendations(profile);
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, []);

  return { status, data, error, run };
}
