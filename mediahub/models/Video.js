import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    savedvid: {
      type: [String],
      default: [],
    },
    unsavedvid:{
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);