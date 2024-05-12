// Import necessary models
import User from "../models/User.js";
import Video from "../models/Video.js";
import Blog from "../models/Blog.js";
import Feedback from "../models/Feedback.js";


// index to easy to track all api
// 1. using user username find that user all data like video,blogs,tweets,feedbacks
// 2.get all user all data
// 3.update the videos
// 4.updates all  data user wants
// 5.delete the user with its all data
// 6.delete video by its title
//7.update blogs by its title
//8.delete blogs by its title



///////////////////////////////////////////////////////////////////////////////////////////////
// 1.Define the controller method to find a user by username and fetch related data
export const getUserDetailsByUsername = async (req, res, next) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ name: username });

    // If user is not found, return a 404 error
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Fetch related data for the user
    const videos = await Video.find({ userId: user._id });
    const blogs = await Blog.find({ userId: user._id });
    const feedbacks = await Feedback.find({ email: user.email });

    // Return the user's details along with related data
    res.status(200).json({ user, videos, blogs, feedbacks });
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
//2.all user data
// Define the controller method to get all users with related data
export const getAllUsersWithDetails = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find().lean();

    // Populate related data for each user
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        // Find videos, blogs, tweets, and feedbacks associated with the user
        const videos = await Video.find({ userId: user._id }).lean();
        const blogs = await Blog.find({ userId: user._id }).lean();
        const tweets = await Tweet.find({ userId: user._id }).lean();
        const feedbacks = await Feedback.find({ email: user.email }).lean();
        const music =await Music.find({userId:user._id}).lean();
        // Return the user along with related data
        return { ...user, videos, blogs, tweets, feedbacks,music };
      })
    );

    res.status(200).json(usersWithDetails);
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//3.update the videos
export const updateVideoByTitle = async (req, res, next) => {
  const { title } = req.params;

  try {
    // Find the video by its title
    const video = await Video.findOne({ title });
    if (!video) return next(createError(404, "Video not found!"));
    
    // Update the video
    const updatedVideo = await Video.findOneAndUpdate(
      { title },
      {
        $set: req.body,
      },
      { new: true }
    );
    
    // Respond with the updated video
    res.status(200).json(updatedVideo);
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////

//4.updates any data wants
// Import necessary models
import Tweet from "../models/Tweet.js";
// import { createError } from "../error.js";
import { createError } from "../error.js";
import Admin from "../models/Admin.js";
import Music from "../models/Music.js";

// Define the controller method to update user data by username
export const updateUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  const userDataToUpdate = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ name: username });

    // If user is not found, return a 404 error
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Update the user's data
    await User.findOneAndUpdate(
      { name: username },
      userDataToUpdate
    );

    // Update user's videos
    await Video.updateMany(
      { userId: user._id },
      { $set: { title: userDataToUpdate.title, desc: userDataToUpdate.desc } }
    );

    // Update user's blogs
    await Blog.updateMany(
      { userId: user._id },
      { $set: { title: userDataToUpdate.title, desc: userDataToUpdate.desc } }
    );

    // Update user's tweets
    await Tweet.updateMany(
      { userId: user._id },
      { $set: { content: userDataToUpdate.content } }
    );

    // Return success message
    res.status(200).json({ message: "User data updated successfully" });
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//5.delete the user with its all data
// Define the controller method to delete user data by username
export const deleteUserByUsername = async (req, res, next) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ name: username });

    // If user is not found, return a 404 error
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Delete related videos
    await Video.deleteMany({ userId: user._id });

    // Delete related blogs
    await Blog.deleteMany({ userId: user._id });

    // Delete related tweets
    await Tweet.deleteMany({ userId: user._id });

    // Delete related feedback
    await Feedback.deleteMany({ userId: user._id });

    // Delete the user
    await User.findOneAndDelete({ name: username });

    // Return success message
    res.status(200).json({ message: "User and associated data deleted successfully" });
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//6.delete video by its title
// Define the controller method to delete a video by ID
// Import necessary modules

// Define the controller method to delete a video by title
export const deleteVideoByTitle = async (req, res, next) => {
  const { title } = req.params;

  try {
    // Find the video by its title
    const video = await Video.findOne({ title });
    
    // If video is not found, return a 404 error
    if (!video) {
      return next(createError(404, "Video not found!"));
    }

    // Delete the video
    await Video.findByIdAndDelete(video._id);
    
    // Respond with a success message
    res.status(200).json("The video has been deleted.");
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//7.update blogs by its title
// Define the controller method to update a blog by title
export const updateBlogByTitle = async (req, res, next) => {
  const { title } = req.params;

  try {
    // Find the blog by its title
    const blog = await Blog.findOne({ title });
    if (!blog) return next(createError(404, "Blog not found!"));
    
    // Update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { title },
      {
        $set: req.body,
      },
      { new: true }
    );
    
    // Respond with the updated blog
    res.status(200).json(updatedBlog);
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//8.delete blogs by its title
// Define the controller method to delete a blog by title
export const deleteBlogByTitle = async (req, res, next) => {
  const { title } = req.params;

  try {
    // Find the blog by its title
    const blog = await Blog.findOne({ title });
    if (!blog) return next(createError(404, "Blog not found!"));
    
    // Delete the blog
    await Blog.findOneAndDelete({ title });
    
    // Respond with a success message
    res.status(200).json("The blog has been deleted.");
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};



///////////////////////////////////////////////////////////////////////////////////////////////
// controllers/adminController.js
//9.update only  passowrd

export const updatePasswordByUsername = async (req, res, next) => {
  const { name } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ name });

    // If user is not found, return a 404 error
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Return success message
    res.status(200).json({ message: 'User password updated successfully' });
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};


// 10.update admin password
export const updateAdminPasswordByUsername = async (req, res, next) => {
  const { username } = req.params;
  const { password } = req.body;

  try {
    const admin = await Admin.findOne({ name: username });

    if (!admin) {
      return next(createError(404, 'Admin not found'));
    }

    admin.password = password;
    await admin.save();

    res.status(200).json({ message: 'Admin password updated successfully' });
  } catch (err) {
    next(err);
  }
};


// 11.show all videos in admin part

// controllers/video.js

// Controller function to retrieve all videos
export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};


// 12.Show all blogs
// Controller function to retrieve all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};


// 13. Update admin password by name
export const updateAdminPasswordByName = async (req, res, next) => {
  const { name } = req.params;
  const { password } = req.body;

  try {
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return next(createError(404, 'Admin not found'));
    }

    admin.password = password;
    await admin.save();

    res.status(200).json({ message: 'Admin password updated successfully' });
  } catch (err) {
    next(err);
  }
};


//14. Define the controller method to update user password by username
export const updateUserPasswordByUsername = async (req, res, next) => {
  const { username } = req.body;
  const { newPassword } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ name: username });

    // If user is not found, return a 404 error
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Return success message
    res.status(200).json({ message: 'User password updated successfully' });
  } catch (err) {
    // If an error occurs, pass it to the error handling middleware
    next(err);
  }
};


// 15.get all music
export const getAllMusic = async (req, res, next) => {
  try {
    const music = await Music.find();
    res.status(200).json(music);
  } catch (err) {
    next(err);
  }
};

// 16.delete the music using song name
// Controller function to delete music by song name
export const deleteMusicBySongName = async (req, res, next) => {
  const { songsname } = req.params;

  try {
    // Find the music by song name and delete it
    const deletedMusic = await Music.findOneAndDelete({ songsname: songsname });

    if (!deletedMusic) {
      return res.status(404).json({ message: 'Music not found' });
    }

    res.status(200).json({ message: 'Music deleted successfully' });
  } catch (err) {
    next(err);
  }
};