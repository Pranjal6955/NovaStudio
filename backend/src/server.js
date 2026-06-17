import express from "express";
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors"

import { serviceRouter } from "./routes/service.routes.js";
import { projectRoute } from "./routes/project.routes.js";
import { statsRoute } from "./routes/stats.routes.js";
import { contactRoute } from "./routes/contact.routes.js";
import { authRoute } from "./routes/auth.routes.js";
import { analyticsRouter } from "./routes/analytics.routes.js";
import { logsRouter } from "./routes/logs.routes.js";
import { connectPrismaToDB } from "./config/prisma.js";
import { connectMongoToDB } from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map(s => s.trim().replace(/\/+$/, ""));

app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin) return cb(null, true);
            const cleaned = origin.replace(/\/+$/, "");
            return cb(null, allowedOrigins.includes(cleaned));
        },
        credentials:true,
    })
)

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

await connectPrismaToDB()
await connectMongoToDB()

app.get("/",(req,res)=>{
    return res.status(200).json({message:"Welcome to NovaStudio : Backend is Live"})
})
app.use("/api/service",serviceRouter)
app.use("/api/project",projectRoute)
app.use("/api/stats",statsRoute)
app.use("/api/contact",contactRoute)
app.use("/api/admin",authRoute)
app.use("/api/analytic",analyticsRouter)
app.use("/api/logs",logsRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
