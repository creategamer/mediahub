import  express  from "express";

import { addMusic, getMusic, random, updateMusic } from './../controllers/Music.js';
import { verifyToken } from "../verifyToken.js";


const router=express.Router()


//create a video 
// router.post("/:userId",addMusic)
// Define the route for creating a new music
router.post('/', addMusic);

//update
router.put("/:id",verifyToken,updateMusic)

//delete
router.delete("/:id",verifyToken,addMusic)

//find
router.get("/find/:id",getMusic)

//get all random videos
router.get("/random",random)


export default router;