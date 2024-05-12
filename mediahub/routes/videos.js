import  express  from "express";
import { 
    addToPlaylist,
    addVideo, 
    addView, 
    getByTag, 
    getCurrentUserAllVideos, 
    getCurrentUserLikedVideos, 
    getCurrentUserSavedVideos, 
    getCurrentUserSavingVideos, 
    getCurrentUserVideos,  
    getPlaylist, 
    getVideo, 
    getsub, 
    random, 
    search, 
    sub, 
    trend 
} from "../controllers/video.js";

import { verifyToken } from './../verifyToken.js';
// import { verifyToken } from '../verifyToken.js';


const router=express.Router()

//create a video 
router.post("/",verifyToken,addVideo)

//update
router.put("/:id",verifyToken,addVideo)

//delete
router.delete("/:id",verifyToken,addVideo)

//find
router.get("/find/:id",getVideo)

//views
router.put("/view/:id",addView)

//trends
router.get("/trend",trend)

//get all random videos
router.get("/random",random)

//get sub 
router.get("/sub",verifyToken,sub)

//get tags
router.get("/tags",getByTag)

//get search
router.get("/search", search)

// Route to fetch current user's videos
router.get("/current-user-videos", verifyToken, getCurrentUserVideos);

//pending
router.get('/currentuservideos/:userId', getCurrentUserAllVideos);

//pending 
// Define a route to get current user's liked videos
router.get('/likedVideos/:userId', verifyToken, getCurrentUserLikedVideos);

//get likes all likes videos videos
//true save likes videos but used verify token
// Route to get all saved videos liked by the current user
// router.get("/videos/saved", verifyToken, getCurrentUserSavedVideos);

// Route to get all saved videos liked by the current user
router.get("/videos/saved/:userId", getCurrentUserSavedVideos);

// Route to get all saved videos liked by the current user
router.get("/videos/saving/:userId", getCurrentUserSavingVideos);

// Playlist Routes
router.post('/playlist/add', addToPlaylist);
router.get('/playlist', verifyToken, getPlaylist);

// Route to get videos from channels subscribed by the specified user
router.get("/videos/subscribed/:userId", getsub);


export default router;