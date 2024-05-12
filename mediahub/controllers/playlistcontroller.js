import User from "../models/User";

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