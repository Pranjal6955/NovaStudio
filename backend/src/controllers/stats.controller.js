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

export const updateStats = async (req,res) => {
    try {
        const {id} = req.params
        const project = await prisma.stat.findUnique({
            where:{id}
        })
        if(!project){
            return res.status(404).json({
                success : false,
                message : "Project not found"
            })
        }
        const updateStats = await prisma.stat.update({
            where : {id},
            data : req.body,
        })
        return res.status(200).json({
            success : true,
            data : updateStats,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
        
    }
}