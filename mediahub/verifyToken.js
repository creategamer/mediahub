import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(createError(401,"You are not authenticated token problem is that!"));

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token is not valid!"));
        req.user=user;
        next();
    });
};


export const verifyAdminToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if (!token) return next(createError(401, "admin Token are not authenticated!"));
    
      jwt.verify(token, process.env.JWT, (err, admin) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.admin = admin;
        next()
      });
  }
  