import { ObjectEnumValue } from "@prisma/client/runtime/library";
import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    eventType : {
        type : String,
        required : true,
        enum : [
            "PAGE_VISIT",
            "CTA_CLICK",
            "CONTACT_SUBMIT"
        ]
    },
    page : {
        type : String,
        required : true,
    },
    metadata : {
        type : Object,
        default : {},
    }
},{
    timestamps:true,
}
)

export const Analytics = mongoose.model("analytics",analyticsSchema)