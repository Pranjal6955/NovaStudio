import {Router} from "express";
import { authAdminLoginController } from "../controllers/auth.controller.js";
import { logoutAdminController } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js";


export const authRoute = Router();

authRoute.post("/login",authAdminLoginController)
authRoute.post("/logout",protect,logoutAdminController)
