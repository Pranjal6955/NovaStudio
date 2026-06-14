import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import { updateStats } from "../controllers/stats.controller.js";
import { protect } from "../middleware/auth.middleware.js";
export const statsRoute = Router();

statsRoute.get("/",getStats)
statsRoute.put("/:id",protect,updateStats)