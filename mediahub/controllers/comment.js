import { createError } from "../error.js"
import Comment from "../models/Comments.js"
import Video from "../models/Video.js"


export const addComment=async (req,res,next)=>{
  const newComments=new Comment({...req.body,userId:req.user.id})
  try {
    const savedComment=await newComments.save()
    res.status(200).send(savedComment)

  } catch (error) {
    next(error)
  }
}

export const deleteComment=async (req,res,next)=>{
  try {
    const comment=await Comment.findById(res.params.id)
    const video=await Video.findById(res.params.id)
    if(req.user.id===comment.userId || req.user.id === video.userId ){
      await Comment.findByIdAndDelete(req.params.id)
      res.status(200).json("The comments has been deleted")
    }else{
      return next(createError(403,"You can delete ony your comments"))
    }

  } catch (error) {
    next(error)
  }
}

export const getComment=async (req,res,next)=>{
  try {
    const comments=await Comment.find({videoId:req.params.videoId})
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}