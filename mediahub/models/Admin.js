import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema({
    name: { 
        type: String,  
    },
    password: { 
        type: String,  
    },
    userId: {
        type: String,
    },
    
    fromGoogle: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});


export default mongoose.model("Admin",AdminSchema);