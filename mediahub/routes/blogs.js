import  express  from "express";
import { verifyToken } from './../verifyToken.js';
import { addBlog, addViewBlog, deleteBlog, getBlog, getCurrentUserBlogs, randomBlog, trendBlog, updateBlog } from "../controllers/blog.js";


const router=express.Router()

//create a video 
router.post("/",verifyToken,addBlog)

//update a blog
router.put("/:id",verifyToken,updateBlog)

//delete a blog
router.delete("/:id",verifyToken,deleteBlog)

//get all blogs
//its a problem on its
router.get("/find/:id",getBlog)

//add view a blog
router.put("/view/:id",addViewBlog)

//trending blogs
router.get("/trend",trendBlog)

//trending blogs
router.get("/random",randomBlog)

// Define route for fetching blogs associated with a specific user ID
router.get('/blogs/user/:userId', getCurrentUserBlogs);


export default router;