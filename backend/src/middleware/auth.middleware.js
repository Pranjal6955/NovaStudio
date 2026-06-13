import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma.js"

export const protect = async(req,res) => {
    try {
         const token = req.cookies?.token

         if(!token){
            res.status(401).json({
                success : false,
                message : "Authentication Required",
            })
         }
         const decoded = jwt.verify(token,process.env.JWT_SECRET)

         const admin = await prisma.admin.findUnique({
            where :{ 
                id : decoded.adminId,
            },
            select : {
                id : true,
                email : true,
                password : true,
            }
         })

         if(!admin){
            res.status(401).json({
                success : false,
                message : "Admin not found",
            })
         }

         req.admin=admin;

         next();

        
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Invalid Token"

        })
        
    }
   

}