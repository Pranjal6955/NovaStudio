import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";

export const statsRoute = Router();

statsRoute.get("/",getStats)