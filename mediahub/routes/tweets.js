import  express  from "express";
import { verifyToken } from "../verifyToken.js";
import { addTweet, getAllTweetsForUser, getTweetsForUsers, randomTweets } from "../controllers/tweet.js";
// import { verifyToken } from './../verifyToken.js';


const router=express.Router()

// Route to add a tweet
router.post('/tweets', addTweet);

// Route to get all tweets for a user
router.get('/tweets/:userId', getAllTweetsForUser);

// Route to get tweets for multiple users
router.post('/tweet', getTweetsForUsers);

router.get("/randomtweet",randomTweets)

export default router;