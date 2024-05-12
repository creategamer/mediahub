import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";
import Feedback from "../models/Feedback.js"
import Tweet from "../models/Tweet.js";

export const update= async (req,res,next)=>{
    if(req.params.id ===  req.user.id){
        try {
            const updatedUser= await User.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }else{
        return next(createError(403,"You can update only Your account!"));
    }
};

export const deleteUser= async (req,res,next)=>{
    if(req.params.id ===  req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Has been deleted");
        } catch (err) {
            next(err);
        }
    }else{
        return next(createError(403,"You can delete only Your account!"));
    }
};


//admin part if required
//ADMIN PARTS CONTROLLS
export const updateByAdmin=async (req,res,next)=>{
  // // console.log(req.user.id);
  // console.log(req.admin.id);
  // console.log(req.params.id);
  if(req.params.id === req.admin.id){
      try {
          const updatedUser=await User.findByIdAndUpdate(
              req.params.id,{
                  $set:req.body,
              },
              {new:true}
          );
          res.status(200).json(updatedUser);
      } catch (error) {
          next(error)
      }
  }else{
      return next(createError(403,"You can update only your accounts!"))
  }
}

export const deleted=async (req,res,next)=>{
  
  if(req.params.id === req.admin.id){
      try {
          const DeletedUser=await User.findByIdAndDelete(
              req.params.id,
          );
          res.status(200).json("user has been deleted");
      } catch (error) {
          next(error)
      }
  }else{
      return next(createError(403,"You can Delete only your accounts!"))
  }
}



export const getUser= async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id);
        res.status(200).json(user);        
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      next(err);
    }
};
  
export const unsubscribe = async (req, res, next) => {
    try {
      try {
        await User.findByIdAndUpdate(req.user.id, {
          $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
};


export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
};

export const savingvid = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{savedvid:id},
      $pull:{unsavedvid:id}
    })
    res.status(200).json("The video has been saved.")
  } catch (err) {
    next(err);
  }
};


export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};


//feedback
 export const feedback= async (req,res,next)=>{
  
  try {
      const newUser = new Feedback({ ...req.body });
      
      await newUser.save();
      res.status(200).send("Feedback has been submitted!");
  } catch (error) {
      next(error)
  }
};


export const randomUser = async (req, res, next) => {
  try {
      const user = await User.aggregate([{ $sample: { size: 60 } }]);
      
      res.status(200).json(user);
      
  } catch (err) {
      next(err);
  }
};


//tweets
export const getAllUsersWithTweets = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find().lean();

    // Populate tweets for each user
    const usersWithTweets = await Promise.all(
      users.map(async (user) => {
        // Find tweets associated with the user
        const tweets = await Tweet.find({ userId: user._id }).lean();

        // Return the user along with associated tweets
        return { ...user, tweets };
      })
    );

    res.status(200).json(usersWithTweets);
  } catch (err) {
    next(err);
  }
};

//get currentUserFeedback
export const getUserFeedbacks = async (req, res, next) => {
  try {
      // Find all feedbacks submitted by the current user
      const feedbacks = await Feedback.find({ email: req.user.email });

      res.status(200).json(feedbacks);
  } catch (err) {
      next(err);
  }
};

// video controller
// export const getCurrentUserLikedVideos = async (req, res, next) => {
//   try {
//     // Find videos where the current user's ID is present in the likes array
//     const likedVideos = await Video.find({ likes: req.user.id });
    
//     res.status(200).json(likedVideos);
//   } catch (err) {
//     next(err);
//   }
// };

//this is get all subscribed user data
export const getSubscribedUserDetails = async (req, res, next) => {
  try {
    const currentUser = req.user; // Assuming you have middleware to get the current user
    const subscribedUserIds = currentUser.subscribedUsers;

    // Fetch details of subscribed users
    const subscribedUsers = await User.find({ _id: { $in: subscribedUserIds } });

    // Fetch videos of subscribed users
    const subscribedUserVideos = await Video.find({ userId: { $in: subscribedUserIds } });

    // Fetch blogs of subscribed users
    const subscribedUserBlogs = await Blog.find({ userId: { $in: subscribedUserIds } });

    res.status(200).json({ subscribedUsers, subscribedUserVideos, subscribedUserBlogs });
  } catch (error) {
    next(error);
  }
};


export const addToPlaylist = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const userId = req.user._id;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the video to the playlist if it's not already there
    if (!user.playlist.includes(videoId)) {
      user.playlist.push(videoId);
      await user.save();
    }

    res.status(200).json({ message: 'Video added to playlist successfully' });
  } catch (error) {
    next(error);
  }
};


export const getSubscribedUserVideos = async (req, res, next) => {
  try {
    // Get the current user's ID
    const userId = req.user._id;

    // Find the current user's subscribed users
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscribedUserIds = user.subscribedUsers;

    // Fetch videos uploaded by subscribed users
    const subscribedUserVideos = await Video.find({ userId: { $in: subscribedUserIds } });

    res.status(200).json(subscribedUserVideos);
  } catch (error) {
    next(error);
  }
};



import bcrypt from "bcryptjs"
//update the password
export const updatePassword = async (req, res, next) => {
  try {
      const { email, newPassword, confirmPassword } = req.body;

      // Validate if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // If user not found, return error
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Return success message
      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: "Internal server error" });
  }
};