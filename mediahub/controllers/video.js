import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

export const addVideo= async (req,res,next)=>{
    const newVideo=new Video({userId:req.user.id,...req.body});
    try {
        const savedVideo=await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return next(createError(404, "Video not found!"));
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return next(createError(403, "You can update only your video!"));
      }
    } catch (err) {
      next(err);
    }
};
  

export const deleteVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return next(createError(404, "Video not found!"));
      if (req.user.id === video.userId) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(createError(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };

export const getVideo= async (req,res,next)=>{
    try {
        const video=await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

export const addView = async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };
  

  export const random = async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };
  
  export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };


export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};


export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
     //console.log(tags);
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  //get current user videos
  export const getCurrentUserVideos = async (req, res, next) => {
    try {
      // Find videos uploaded by the current user
      const videos = await Video.find({ userId: req.user.id });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };



  // Controller function to fetch videos uploaded by the current user
export const getCurrentUserAllVideos = async (req, res, next) => {
  try {
    // Your logic to fetch videos uploaded by the current user
    // For example:
    const userId = req.params.userId;
    const videos = await Video.find({ userId });

    // Send the response
    res.status(200).json(videos);
  } catch (error) {
    // Handle errors
    next(error); // Pass the error to the error handling middleware
  }
};

// //get current user likes videos
// export const getCurrentUserLikedVideos = async (req, res, next) => {
//   try {
//     // Find videos where the current user's ID is present in the likes array
//     const likedVideos = await Video.find({ likes: req.user.id });
    
//     res.status(200).json(likedVideos);
//   } catch (err) {
//     next(err);
//   }
// };

// Controller function to get all videos liked by the current user
export const getCurrentUserLikedVideos = async (req, res, next) => {
  try {
    // Find videos where the current user's ID is present in the likes array
    const likedVideos = await Video.find({ likes: req.params.userId });
    
    res.status(200).json(likedVideos);
  } catch (err) {
    next(err);
  }
};

// Controller function to get all videos liked by the current user
// export const getCurrentUsersavedVideos = async (req, res, next) => {
//   try {
//     // Find videos where the current user's ID is present in the likes array
//     const savedVideos = await Video.find({ savedvid: req.params.userId });
    
//     res.status(200).json(savedVideos);
//   } catch (err) {
//     next(err);
//   }
// };


//this is used token
//get all current user likes videos
// export const getCurrentUserSavedVideos = async (req, res, next) => {
//   try {
//     // Get the current user's ID
//     const userId = req.user.id;

//     // Find videos where the current user's ID is present in the likes array
//     const savedVideos = await Video.find({ likes: userId });
    
//     res.status(200).json(savedVideos);
//   } catch (err) {
//     next(err);
//   }
// };

//get current user likes videos
export const getCurrentUserSavedVideos = async (req, res, next) => {
  try {
    // Get the current user's ID from the URL parameter
    const userId = req.params.userId;

    // Find videos where the current user's ID is present in the likes array
    const savedVideos = await Video.find({ likes: userId });
    
    res.status(200).json(savedVideos);
  } catch (err) {
    next(err);
  }
};

//get current user saved videos
export const getCurrentUserSavingVideos = async (req, res, next) => {
  try {
    // Get the current user's ID from the URL parameter
    const userId = req.params.userId;

    // Find videos where the current user's ID is present in the likes array
    const savedVideos = await Video.find({ savedvid: userId });
    
    res.status(200).json(savedVideos);
  } catch (err) {
    next(err);
  }
};

//playlist
// Playlist Controller
export const addToPlaylist = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const userId = req.user._id; // Assuming userId is provided in the request body
    console.log("videoId");
    console.log(videoId);
    console.log("user id :");
    console.log(userId);
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




// video controller
// export const getsub = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const subscribedChannels = user.subscribedUsers;

//     const list = await Promise.all(
//       subscribedChannels.map(async (channelId) => {
//         return await Video.find({ userId: channelId });
//       })
//     );

//     res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
//   } catch (err) {
//     next(err);
//   }
// };

export const getsub = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Extract user ID from URL parameter
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

//this is get playlist
export const getPlaylist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('playlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.playlist);
  } catch (error) {
    next(error);
  }
};
