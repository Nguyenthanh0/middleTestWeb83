import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: { type: String },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
