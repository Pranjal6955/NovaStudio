import {Router} from "express";
import { authAdminController } from "../controllers/auth.controller.js";


export const authRoute = Router();

authRoute.post("/auth",authAdminController)