import { Logs } from "../models/logs.model"

export const getLogsController = async (req,res) =>{ 
    try {
        const logs = (await Logs.find()).sort({createdAt : -1}).limit(50);

        return res.status(200).json({
            success : true,
            count : logs.length,
            data : logs
        })
    } catch (error) {

        return res.status(500).json({
            success : false,
            message : error.message,
        })
        
    }

}