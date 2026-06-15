import { Router } from "express";
import { createAnalytics, getAnalytics} from "../controllers/analytics.controllers.js";


export const analyticsRouter = Router()

analyticsRouter.post("/",createAnalytics)
analyticsRouter.get("/",getAnalytics)