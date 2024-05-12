import  express  from "express";
import { 
    deleteUser,
    dislike, 
    feedback, 
    getAllUsersWithTweets, 
    getUser, 
    getUserFeedbacks, 
    like, 
    randomUser, 
    savingvid, 
    subscribe, 
    unsubscribe, 
    update, 
    updatePassword
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
import { addToPlaylist, getCurrentUserLikedVideos } from "../controllers/video.js";
// import { verifyToken } from "../verifyToken.js";
// import { verifyToken } from './../verifyToken.js';

const router=express.Router();

//update user
router.put("/:id",verifyToken, update);

//delete user
router.delete("/:id",verifyToken,deleteUser);

//get a user 
router.get("/find/:id",getUser);

//subscriber a user
router.put("/sub/:id",verifyToken,subscribe);

//unsubscriber a user
router.put("/unsub/:id",verifyToken,unsubscribe);

//like a video
router.put("/like/:videoId",verifyToken,like);

//saving a video
router.put("/savingvid/:videoId",verifyToken,savingvid);

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike);

//random user get
//get All user
router.get("/randomuser", randomUser)

//user tweets
router.get('/users-with-tweets', getAllUsersWithTweets);

//get feedback
router.post("/feedback",feedback)

// Route to get current user's feedbacks
router.get('/feedbacks', verifyToken, getUserFeedbacks);

// Route to update user password
router.post('/update-password', updatePassword);

export default router;