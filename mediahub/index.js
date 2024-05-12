import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import tweetsRoutes from "./routes/tweets.js"
import blogRoutes from "./routes/blogs.js"
import adminRoutes from "./routes/Admin.js"
import tweetingRoutes from "./routes/Tweeting.js"
import MusicRoutes from "./routes/Music.js"

import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";



const app=express();

dotenv.config();

const connect=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to DB");
    }).catch((err)=>{
        throw err;
    });

}

//middlewares
app.use(cookieParser())
app.use(express.json());


app.use("/api/admin",adminRoutes)
app.use("/api/users",userRoutes)
app.use("/api/vidoes",videoRoutes)
app.use("/api/blog",blogRoutes)
app.use("/api/feedback",blogRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/tweets",tweetsRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/tweeting",tweetingRoutes)
app.use("/api/music",MusicRoutes)


//error handler
app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success:false,
        status,
        message,
    });
});




app.listen(8800,()=>{
    connect();
    console.log("connected to server");
})