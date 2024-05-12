import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    singer: {
      type: String,
    },
    songsname: {
      type: String,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    audioUrl:{
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
  },
  { timestamps: true }
);

export default mongoose.model("Music", MusicSchema);