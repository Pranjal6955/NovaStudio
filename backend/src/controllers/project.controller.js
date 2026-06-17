import { prisma } from "../config/prisma.js"
import { Logs } from "../models/logs.model.js";

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

export const createProject = async (req,res) => {
    try {
        const {title, category,imageUrl,techStack,description} = req.body;
        if(!title || !category || !imageUrl || !techStack){
            return res.status(401).json({
                success : false,
                message : "All Fields are Required"
            })
        }
        const createdProject = await prisma.project.create({
            data : {title,category,imageUrl,techStack,description}
        })
        try {
        await Logs.create({
            action : "CREATE_PROJECT",
            adminId : req.admin.id,
            details : {
                projectId : createdProject.id,
                projectTitle : createdProject.title,
            }
        })
        } catch (error) {
            console.log("Faled to create a log",error)
            
        }
        return res.status(201).json({
            success : true,
            data : createdProject,
            message : "Project has Successfully Created"
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message : error.message
        })
        
    }
    
}

export const deleteProjectById = async (req,res) => {
    try {
        const {id} = req.params;
        const project = await prisma.project.findUnique({
            where:{id}
        })
        if(!project){
            return res.status(404).json({
                success : false,
                message : "Project not Found"
            })
        }
        await prisma.project.delete({
            where:{id}
        })
        try {
            await Logs.create({
                action : "DELETE_PROJECT",
                adminId : req.admin.id,
                details : {
                    projectId : project.id
                }
            })
        } catch (error) {
            console.log("Failed to create a Log",error)
            
        }
        return res.status(200).json({
            success : true,
            message : "Project Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
        
    }
}

export const updateProject = async (req,res) => {
    try {
        const {id} = req.params;

        const project = await prisma.project.findUnique({
            where:{id}
        })

        if (!project){
            return res.status(404).json({
                success : false,
                message : "Project not Found",
            })
        }

        const updateProject = await prisma.project.update({
            where:{id},
            data : req.body
        })
        try {
            await Logs.create({
                action : "UPDATE_PROJECT",
                adminId : req.admin.id,
                details : {
                    projectId : project.id
                }
            })
        } catch (error) {
            
        }
        return res.status(200).json({
            success:true,
            data : updateProject,
            message : "Project Updated Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
        
    }
}