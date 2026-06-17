import { Router }from "express";
import { createContact, getContact, deleteContact } from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const contactRoute = Router();

contactRoute.post("/",createContact)
contactRoute.get("/",protect,getContact)
contactRoute.delete("/:id",protect,deleteContact)