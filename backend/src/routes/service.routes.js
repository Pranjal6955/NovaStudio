import { getService } from "../controllers/service.controller.js";
import { createService } from "../controllers/service.controller.js";
import { deleteServiceById } from "../controllers/service.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { updateService } from "../controllers/service.controller.js";
import { Router } from "express";

export const serviceRouter = Router();

serviceRouter.get("/",getService)
serviceRouter.post("/",protect,createService)
serviceRouter.delete("/:id",deleteServiceById)
serviceRouter.put("/:id",protect,updateService)


