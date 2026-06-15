import { Analytics } from "../models/analytics.model.js";

export const createAnalytics = async (req,res) => {
    try {

        const { eventType,page,metadata } = req.body
        if (!eventType || !page){
            return res.status(400).json({
                success : false,
                message : "Event Type and Page are required"
            })
        }
        const analytics = await Analytics.create(req.body);
        return res.status(201).json({
            success : true,
            data : analytics,
            message : "Analytics created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
        
    }
}

export const getAnalytics = async (req,res) => {
    try {
        const totalVisits = await Analytics.countDocuments({
            eventType : "PAGE_VISIT"
        })
        const totalClick = await Analytics.countDocuments({
            eventType : "CTA_CLICK"
        })
        const totalContact = await Analytics.countDocuments({
            eventType:"CONTACT_SUBMIT"
        })

        const recentActivity = await Analytics.find().sort({createdAt:-1}).limit(20);
        
        return res.status(200).json({
            success : true,
            summary : {
                totalVisits,
                totalClick,
                totalContact
            },
            recent : recentActivity
            
        })
    } catch (error) {

       return res.status(500).json({
        success : false,
        message : error.message
       })
        
    }

}