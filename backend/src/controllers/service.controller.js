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

export const createService = async (req,res) => {
    try {
        const {title,description} = req.body;
        if(!title || !description) {
            return res.status(401).json({
                success:false,
                message:"All Fields are Required"
            })
        }

        const createServices = await prisma.service.create({data:{title,description}})
        return res.status(201).json({
            success : true,
            data : createServices,
            message : "A Service Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success : false,
        })
        
    }
    


}

export const deleteServiceById = async (req,res) => {
    try {
        const {id} = req.params
        const service = await prisma.service.findUnique({
            where:{id}
        })
        if(!service){
            return res.status(404).json({
                success : false,
                message : "Service not found"
            })
        }
        await prisma.service.delete({
            where : {id}
        })
        return res.status(200).json({
            success : true,
            message : "Service Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
        
    }
}

export const updateService = async (req,res) => {

    try {
    const {id} = req.params
    const service = await prisma.service.findUnique({
        where:{id}
    })
    if(!service){
        return res.status(404).json({
            success : false,
            message : "Service Not Found"
        })
    }
    const updatedService = await prisma.service.update({
        where : {id},
        data : req.body,
    })

    return res.status(200).json({
        success : true,
        data : updatedService,
        message : "Service Updated Successfully"
    })
        
    } catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message,
    })
        
    }
    
}