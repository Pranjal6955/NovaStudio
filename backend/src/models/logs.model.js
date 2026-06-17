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
            "DELETE_CONTACT",
        ]
    },
    adminId : {
        type : String,
        required : false,
    },
    details : {
        type : Object,
        default : {},
    }
},{
    timestamps:true
})

export const Logs = mongoose.model("logs",logsSchema)