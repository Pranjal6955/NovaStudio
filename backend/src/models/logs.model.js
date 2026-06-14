import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    action : {
        type : String,
        required : true,
        enum : [
            "LOGIN",
            "LOGOUT",
            "CREATE_PROJECT",
            "UPDATE_PROJECT",
            "DELETE_PROJECT",
            "CREATE_SERVICE",
            "UPDATE_SERVICE",
            "DELETE_SERVICE",
            "UPDATE_STATS",
            "CREATE_CONTACT_FORM",
        ]
    },
    adminId : {
        type : String,
        required : true,
    },
    detailes : {
        type : Object,
        default : {},
    }
},{
    timestamps:true
})

export const logs = mongoose.model("logs",logsSchema)