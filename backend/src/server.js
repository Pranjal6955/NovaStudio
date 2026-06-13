import express from "express";
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import { serviceRouter } from "./routes/service.routes.js";
import { projectRoute } from "./routes/project.routes.js";
import { statsRoute } from "./routes/stats.routes.js";
import { contactRoute } from "./routes/contact.routes.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.get("/",(req,res)=>{
    return res.status(200).json({message:"Welcome to NovaStudio : Backend is Live"})
})
app.use("/api/service",serviceRouter)
app.use("/api/project",projectRoute)
app.use("/api/stats",statsRoute)
app.use("/api/contact",contactRoute)

app.use(morgan("dev"))

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
