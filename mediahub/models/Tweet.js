import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);