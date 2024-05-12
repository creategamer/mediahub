import mongoose from "mongoose";

const FeedbackSchema=new mongoose.Schema({
    
    // userId:{
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    // },

    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true, 
    },
    phonenumber:{
        type:String,
        required:true,
    },
    feedbacks:{
        type:String,
    },
     
},
{timestamps:true}
);


export default mongoose.model("Feedback",FeedbackSchema);