import express from "express";
import dotenv from "dotenv"
import { serviceRouter } from "./routes/service.routes.js";


dotenv.config()


const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.get("/",(req,res)=>{
    return res.status(200).json({message:"Welcome to NovaStudio : Backend is Live"})
})
app.use("/api/service",serviceRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
