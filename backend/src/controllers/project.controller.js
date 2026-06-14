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

export const createProject = async (req,res) => {
    try {
        const {title, category,imageUrl,techStack,description} = req.body;
        if(!title || !category || !imageUrl || !techStack){
            res.status(401).json({
                success : false,
                message : "All Fields are Required"
            })
        }
        const createdProject = await prisma.project.create({
            data : {title,category,imageUrl,techStack,description}
        })
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