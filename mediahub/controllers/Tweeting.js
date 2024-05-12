// Import necessary modules

import Tweeting from "../models/Tweeting.js";
import User from "../models/User.js";

// Controller function to add a tweet
// export const addTweet = async (req, res) => {
//     try {
//       let { desc, name, img } = req.body;
  
//       // If username and img are not provided in the request body, fetch them from the user model
//       if (!name || !img) {
//         const userId = req.userId; // Assuming you have middleware to extract the user ID from the request
//         const user = await User.findById(userId);
  
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
  
//         // Extract username and img from user
//         name = user.name; // Assuming the user's name is stored in the 'name' field
//         img = user.img;
//       }
  
//       // Create a new tweet document
//       const newTweet = new Tweeting({
//         name,
//         img,
//         desc,
//       });
  
//       // Save the new tweet to the database
//       await newTweet.save();
  
//       // Return success response
//       res.status(201).json({ message: 'Tweet added successfully' });
//     } catch (error) {
//       // Handle errors
//       console.error('Error adding tweet:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };


export const addTweet = async (req, res) => {
  try {
    const { desc, name } = req.body;

    // Create a new tweet document
    const newTweet = new Tweeting({
      name,
      desc,
    });

    // Save the new tweet to the database
    await newTweet.save();

    // Return success response
    res.status(201).json({ message: 'Tweet added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  export const getAllUsersTweets = async (req, res) => {
    try {
        // Find all tweets from the database
        const allTweets = await Tweeting.find({});

        // Return all tweets
        res.status(200).json(allTweets);
    } catch (error) {
        // Handle errors
        console.error('Error fetching all users tweets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// export const addReply = async (req, res) => {
//   try {
//     const { reply } = req.body;
//     const { tweetId } = req.params; // Assuming you're passing tweetId in the URL

//     // Find the tweet by its ID
//     const tweet = await Tweeting.findById(tweetId);

//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }

//     // Add the reply to the tweet's replies array
//     tweet.replies.push({ user: req.userId, reply });
//     await tweet.save();

//     // Return success response
//     res.status(201).json({ message: 'Reply added successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Error adding reply:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// Controller function to add a reply to a tweet
// export const addReply = async (req, res) => {
//   try {
//     const { name, desc } = req.body;
//     const { tweetId } = req.params; // Assuming you're passing tweetId in the URL

//     // Find the tweet by its ID
//     const tweet = await Tweeting.findById(tweetId);
//     if (!tweet) {
//       return res.status(404).json({ message: 'Tweet not found' });
//     }

//     // Add the reply to the tweet's replies array
//     tweet.replies.push({ name, desc });
//     await tweet.save();
    
//     // Return success response
//     res.status(201).json({ message: 'Reply added successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Error adding reply:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const addReply = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const { username } = req.params; // Assuming you're passing the username in the URL instead of tweetId

    // Find the tweet by the username of the user who posted it
    const tweet = await Tweeting.findOne({ name: username });
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Add the reply to the tweet's replies array
    tweet.replies.push({ name, desc });
    await tweet.save();
    
    // Return success response
    res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getAllRepliesForTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;

    // Find the tweet by its ID
    const tweet = await Tweeting.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Create an array to store replies with desc
    const repliesWithDesc = tweet.replies.map(reply => ({
      reply: reply.reply,
      desc: tweet.desc
    }));

    // Return the replies with desc for the tweet
    res.status(200).json(repliesWithDesc);
  } catch (error) {
    // Handle errors
    console.error('Error fetching replies for tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
