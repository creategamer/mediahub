// Import necessary modules and controllers
import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addReply, addTweet, getAllRepliesForTweet, getAllUsersTweets } from '../controllers/Tweeting.js';

// Create a router instance
const router = express.Router();

// Define route for adding a new tweet
router.post('/tweets', addTweet);

// Define route to get all users' tweets
router.get('/tweets', getAllUsersTweets);

// Define route for adding a reply to a tweet
// router.post('/tweets/:tweetId/replies', verifyToken, addReply);

// Define route for adding a reply to a tweet
// router.post('/tweets/:tweetId/replies', verifyToken, addReply);
router.post('/tweets/:username/replies', verifyToken, addReply);



// Route to get all replies for a tweet
router.get('/tweets/:tweetId/replies', getAllRepliesForTweet);

// Export the router
export default router;
