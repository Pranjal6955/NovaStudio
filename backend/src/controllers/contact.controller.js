import { prisma } from "../config/prisma.js"
import { Logs } from "../models/logs.model.js";

export const createContact = async (req,res) => {

    try {
        const {name, email, message} = req.body;

    if (!name || !email || !message){
        res.status(400).json({
            message : "All Fields are Required"
        })
    }
    const contact = await prisma.contact.create({
        data : {name, email, message}
    })

    try {
        await Logs.create({
            action : "CREATE_CONTACT_FORM",
            adminId : req.admin.id,
            details : {
                contactId : contact.id,
                contactEmail : contact.email,
            }
        })
    } catch (error) {
        console.log("Failed to create log",error)
    }
    return res.status(201).json({success:true, data:contact, message:"Contact form submitted"})
        
    } catch (error) {
        return res.status(500).json({message : error.message})
        
    }

}

export const getContact = async (req,res) =>{
    try {
        const getContactForm = await prisma.contact.findMany()
        return res.status(200).json({
            success : true,
            messsage : "All Contact Form are successfully Fetched",
            data:getContactForm,
        })
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : error.message
        })
        
        
    }
}