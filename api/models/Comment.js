import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      default: "",
    },
    postId: {
      type: String,
    },
    fullName: {
      type: String,
    },
    userId: {
      type: String,
    },
    image: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
