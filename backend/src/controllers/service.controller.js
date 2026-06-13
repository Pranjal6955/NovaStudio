import { prisma } from "../config/prisma.js";

export const getService = async (req,res) => {
    try {
        const services = await prisma.service.findMany();
        return res.status(200).json({
        sucess:true,
        data:services,
        message:"All Services fetch Successfully"
    })
        
    } catch (error) { 
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }


}