import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error("Unhandled request error", { error: err instanceof Error ? err.message : String(err) });
  res.status(500).json({ error: "Something went wrong. Please try again." });
}
