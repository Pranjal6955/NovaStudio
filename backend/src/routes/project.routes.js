import {Router} from "express";
import { getProject } from "../controllers/project.controller.js";
import { createProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const projectRoute = Router();

projectRoute.get("/",getProject)
projectRoute.post("/",protect,createProject)