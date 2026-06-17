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
                success : false,
                message : "Invalid Email"
            })
        }

        const isHashValid = admin.password.startsWith("$2")

        let isPasswordMatch
        if (isHashValid) {
            isPasswordMatch = await bcryptjs.compare(password, admin.password)
        } else {
            // stored password is plain text (legacy seed bug)
            isPasswordMatch = password === admin.password
            if (isPasswordMatch) {
                // upgrade to bcrypt hash
                const hashed = await bcryptjs.hash(password, 10)
                await prisma.admin.update({
                    where: { id: admin.id },
                    data: { password: hashed },
                }).catch(() => {})
            }
        }

        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid Password"
            })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            })
        }
        const token = jwt.sign(
            {adminId : admin.id, adminEmail : admin.email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("novaStudio_token",token,{
            httpOnly: false,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

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
        console.error("Login error:", error)
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })

    }
}

export const logoutAdminController = async(req,res) => {
    try {
        res.clearCookie("novaStudio_token",{
            httpOnly: false,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        try {

        // Added Logs when user Logout 
        await Logs.create({
            action : "LOGOUT",
            adminId : req.admin.id,
            details : {
                email : req.admin.email
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