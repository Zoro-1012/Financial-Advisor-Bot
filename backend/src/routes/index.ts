import { Router } from "express";
import { recommendationRouter } from "./recommendation.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));
apiRouter.use("/recommendations", recommendationRouter);
