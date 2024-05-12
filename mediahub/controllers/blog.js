import User from "../models/User.js"
import Blogs from "../models/Blog.js"
import { createError } from "../error.js"


export const addBlog= async (req,res,next)=>{
    const newBlog=new Blogs({userId:req.user.id,...req.body});
    try {
        const savedBlog=await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        next(err);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
      const Blog = await Blogs.findById(req.params.id);
      if (!Blog) return next(createError(404, "Video not found!"));
      if (req.user.id === Blog.userId) {
        const updatedBlog = await Blogs.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedBlog);
      } else {
        return next(createError(403, "You can update only your video!"));
      }
    } catch (err) {
      next(err);
    }
};
  

export const deleteBlog = async (req, res, next) => {
    try {
      const blog = await Blogs.findById(req.params.id);
      if (!blog) return next(createError(404, "Video not found!"));
      if (req.user.id === blog.userId) {
        await Blogs.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(createError(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };

export const getBlog= async (req,res,next)=>{
    try {
        const blog=await Blogs.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
};

export const addViewBlog = async (req, res, next) => {
    try {
      await Blogs.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };
  
  export const randomBlog = async (req, res, next) => {
    try {
      const blogs = await Blogs.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  };
  
  export const trendBlog = async (req, res, next) => {
    try {
      const blogs = await Blogs.find().sort({ views: -1 });
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  };


  
// Controller function to fetch blogs uploaded by the current user
export const getCurrentUserBlogs = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    
    // Query the database to find blogs associated with the given user ID
    const blogs = await Blogs.find({ userId });

    // Send the response with the retrieved blogs
    res.status(200).json(blogs);
  } catch (error) {
    // Handle errors
    next(error); // Pass the error to the error handling middleware
  }
};

