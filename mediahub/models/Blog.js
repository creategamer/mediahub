import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
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
    briefdesc: {
        type: String,
      },
    imgUrl: {
      type: String,
    },
    // videoUrl: {
    //   type: String,
    // },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    // likes: {
    //   type: [String],
    //   default: [],
    // },
    // dislikes: {
    //   type: [String],
    //   default: [],
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Blogs", BlogSchema);