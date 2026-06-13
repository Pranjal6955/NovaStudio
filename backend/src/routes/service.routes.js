import { getService } from "../controllers/service.controller.js";
import { Router } from "express";

export const serviceRouter = Router();

serviceRouter.get("/",getService)

