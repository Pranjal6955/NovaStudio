import {Router} from "express";
import { getProject } from "../controllers/project.controller.js";
import { createProject } from "../controllers/project.controller.js";
import { deleteProjectById } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { updateProject } from "../controllers/project.controller.js";

export const projectRoute = Router();

projectRoute.get("/",getProject)
projectRoute.post("/",protect,createProject)
projectRoute.delete("/:id",protect,deleteProjectById)
projectRoute.put("/:id",protect,updateProject)