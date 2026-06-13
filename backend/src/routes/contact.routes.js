import { Router }from "express";
import { createContact } from "../controllers/contact.controller.js";
import { getContact } from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const contactRoute = Router();

contactRoute.post("/",createContact)
contactRoute.get("/",protect,getContact)