import { Router } from "express";
import { generateRecommendations } from "../controllers/recommendation.controller";

export const recommendationRouter = Router();

recommendationRouter.post("/generate", generateRecommendations);
