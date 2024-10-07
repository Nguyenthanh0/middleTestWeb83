import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: { type: String },
    content: { type: String },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true },
  { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
