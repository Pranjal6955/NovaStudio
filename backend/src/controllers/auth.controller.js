import { prisma } from "../config/prisma.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const authAdminLoginController = async(req,res) => {
    try {
        const {email,password} = req.body

        if(!email || !password) {
            return res.status(401).json({
                success : false, 
                message : "Email and Password are required"})
        }
        
        const admin = await prisma.admin.findUnique({where : {email}})
        if(!admin){
            return res.status(401).json({
                success : true,
                message : "Invalid Email"
            })
        }

        const isPasswordMatch = await bcryptjs.compare(password,admin.password)
        
        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid Password"
            })
        }
        const token = jwt.sign(
            {adminId : admin.id, adminEmail : admin.email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("novaStudio_token",token)

        res.status(200).json({
            success : true,
            data : {
                id : admin.id,
                name : admin.name,
                email : admin.email,
            },
            message : "Logged in Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
        
    }
}

export const logoutAdminController = async(req,res) => {
    try {
        res.clearCookie("novaStudio_token");
        res.status(200).json({
            success : true,
            message : "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message : error.message
        })
        
    }
}