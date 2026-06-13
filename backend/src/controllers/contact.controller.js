import { prisma } from "../config/prisma.js"

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



    return res.status(201).json({success:true, data:contact, message:"Contact form submitted"})
        
    } catch (error) {
        return res.status(500).json({message : error.message})
        
    }

}
