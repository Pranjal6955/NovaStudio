import { prisma } from "../config/prisma.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { Logs } from "../models/logs.model.js"

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

        try {
        //Added Logs when user is Logged in
        await Logs.create({
            action : "LOGIN",
            adminId : admin.id,
            details : {
                email : admin.email
            }
        })
        } catch (error) {
            console.log("Failed to create log",error)
        }

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

        try {

        // Added Logs when user Logout 
        await Logs.create({
            action : "LOGOUT",
            adminId : req.admin.id,
            details : {
                email : admin.email
            }
        })   
        } catch (error) {
            console.log("Failed to create a Log",error)
            
        }

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