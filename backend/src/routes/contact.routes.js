import Router from "express";
import { createContact } from "../controllers/contact.controller.js";

export const contactRoute = Router();

contactRoute.post("/",createContact)