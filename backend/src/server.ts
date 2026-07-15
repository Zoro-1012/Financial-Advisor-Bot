import { createApp } from "./app";
import { env, isGeminiConfigured } from "./config/env";
import { logger } from "./utils/logger";

const app = createApp();

app.listen(env.port, () => {
  logger.info(`Advisor bot API listening on port ${env.port}`);
  if (!isGeminiConfigured()) {
    logger.warn("GEMINI_API_KEY not set — falling back to template explanations.");
  }
});
