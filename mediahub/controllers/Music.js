// import User from "../models/User.js"
// import Video from "../models/Video.js"
import { createError } from "../error.js";
import Music from "../models/Music.js";

// export const addMusic= async (req,res,next)=>{
//     const newMusic=new Music({userId:req.user.id,...req.body});
//     try {
//         const savedMusic=await newMusic.save();
//         res.status(200).json(savedMusic);
//     } catch (err) {
//         next(err);
//     }
// };

export const addMusic = async (req, res, next) => {
  const userId = req.params.userId; // Retrieve user ID from request parameters
  
  const newMusic = new Music({ userId, ...req.body }); // Use the retrieved user ID
  
  try {
      const savedMusic = await newMusic.save();
      res.status(200).json(savedMusic);
  } catch (err) {
      next(err);
  }
};


export const updateMusic = async (req, res, next) => {
    try {
      const Music = await Music.findById(req.params.id);
      if (!Music) return next(createError(404, "Video not found!"));
      if (req.user.id === Music.userId) {
        const updatedMusic = await Music.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMusic);
      } else {
        return next(createError(403, "You can update only your Music!"));
      }
    } catch (err) {
      next(err);
    }
};
  

export const deleteMusic = async (req, res, next) => {
    try {
      const Music = await Music.findById(req.params.id);
      if (!Music) return next(createError(404, "Video not found!"));
      if (req.user.id === Music.userId) {
        await Music.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(createError(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };

export const getMusic= async (req,res,next)=>{
    try {
        const music=await Music.findById(req.params.id);
        res.status(200).json(music);
    } catch (err) {
        next(err);
    }
};

export const random = async (req, res, next) => {
    try {
      const Musics = await Music.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(Musics);
    } catch (err) {
      next(err);
    }
  };
  