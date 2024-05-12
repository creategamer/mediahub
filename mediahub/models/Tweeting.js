import mongoose from "mongoose";

const TweetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        name: String,
        reply: String,
        desc: String, // Add the desc field to each reply
        likes: {
          type: Number,
          default: 0,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Tweeting = mongoose.model("community", TweetingSchema);

export default Tweeting;