import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";

export const signup= async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({...req.body,password:hash});
        
        await newUser.save();
        res.status(200).send("user has been created!");
    } catch (err) {
        next(err);
    }
};

export const signin= async (req,res,next)=>{
    try {
        const user=await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"User not found"));

        const isCorrect = await bcrypt.compare(req.body.password,user.password);
        
        if(!isCorrect) return next(createError(404,"wrong password"));

        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;

        res
            .cookie("access_token",token,{
            httpOnly:true,
        })
        .status(200)
        .json(others);

    } catch (err) {
        next(err);
    }
};

export const adminsignup= async (req,res,next)=>{
    console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newAdmin = new Admin({ ...req.body,password: hash });        
        await newAdmin.save();
        res.status(200).send("admin has been created!");
    } catch (error) {
        next(error)
    }
};


export const adminSignin = async (req, res, next) => {
    try {
        const { name } = req.body; // Extract username directly
        const admin = await Admin.findOne({ name }); // Enhanced readability

        
        if (!admin) {
            return next(new createError("Admin not found!")); // Dedicated 404 error class
        }

        const token=jwt.sign({id:admin._id},process.env.JWT)        
        const { password, ...others } = admin._doc;

        res
            .cookie("access_token",token,
            {
                httpOnly:true
            })
            .status(200)
            .json(others)

    } catch (error) {
      next(error); // Pass the error to error-handling middleware
    }
  };


export const googleAuth=async (req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT);
            res
            .cookie("access_token",token,{
            httpOnly:true,
            })
            .status(200)
            .json(user._doc);
        }
        else{
            const newUser=new User({
                ...req.body,
                fromGoogle:true,
            });
            const savedUser=await newUser.save();
            const token=jwt.sign({id:savedUser._id},process.env.JWT);
            res
                .cookie("access_token",token,{
                httpOnly:true,
            })
            .status(200)
            .json(savedUser._doc);
        }
    } catch (err) {
        next(err)
        console.log("this is google auth error");
    }
};