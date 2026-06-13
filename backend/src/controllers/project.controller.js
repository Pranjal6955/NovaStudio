import { prisma } from "../config/prisma.js"

export const getProject = async (req,res) => {

    try {
        const projects = await prisma.project.findMany();
        return res.status(200).json({
            success : true,
            data : projects,
            message : "Projects Fetch Sucessfully"
    })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
        
    }   

}