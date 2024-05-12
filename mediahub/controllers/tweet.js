import { createError } from "../error.js"
import Tweet from "../models/Tweet.js";
import User from "../models/User.js";


// Controller method to add a tweet
export const addTweet = async (req, res) => {
    try {
      const { userId, desc } = req.body;
      const tweet = await Tweet.create({ userId, desc });
      res.status(201).json(tweet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const deleteTweet=async (req,res,next)=>{
    try {
        const Tweet=await Tweet.findById(res.params.id);
        const user=await User.findById(res.params.id);
        if(req.user.id === comment.userId || req.user.id === user.userId){
            await Tweet.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");

        }else{
            return next(createError(403,"You can delete any your commets!"));
        }
    } catch (err) {
        next(err);
    }
}

// Controller method to get all tweets for a user
export const getAllTweetsForUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const tweets = await Tweet.find({ userId });
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Controller method to get tweets for multiple users
export const getTweetsForUsers = async (req, res) => {
    try {
      const { userIds } = req.body;
      // Find tweets for the specified user IDs
      const tweets = await Tweet.find({ userId: { $in: userIds } });
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const randomTweets = async (req, res, next) => {
    try {
        const tweets = await Tweet.aggregate([{ $sample: { size: 60 } }]);
        
        res.status(200).json(tweets);
        
    } catch (err) {
        next(err);
    }
  };