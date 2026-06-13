import Router from "express";
import { getProject } from "../controllers/project.controller.js";

export const projectRoute = Router();

projectRoute.get("/",getProject)