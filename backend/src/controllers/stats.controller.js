import { prisma } from "../config/prisma.js"

export const getStats = async(req,res) => {
    try {
        const stats = await prisma.stat.findMany();
        return res.status(200).json({
            success : true,
            data : stats,
            message : "All Stats fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
        
    }
    
}