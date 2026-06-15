import Router from "express"
import { getLogsController } from "../controllers/logs.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const logsRouter = Router();

logsRouter.get("/",protect,getLogsController);