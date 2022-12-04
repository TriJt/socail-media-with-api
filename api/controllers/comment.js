import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const CreateComment = async (req, res) => {
  try {
    const newComment = new Comment({
      commentId: req.body.commentId,
      postId: req.body.PostId,
      fullName: req.body.fullName,
      userId: req.body.userId,
      image: req.body.image,
      text: req.body.text,
    });
    const save = await newComment.save();
    const saveInPost = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      {
        $push: {
          comment: save._id,
        },
      },
      { new: true }
    );
    res.status(200).json(save);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const UpdateComment = async (req, res) => {
  try {
    const update = await Comment.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    const save = await update.save();
    res.status(200).json(save);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const DeleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId) {
      await comment.deleteOne({
        $set: req.body,
      });
      const deleteInPost = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        {
          $pull: {
            comment: comment._id,
          },
        },
        { new: true }
      );
      res.status(200).json("Deleted comment success");
    } else {
      res.status(403).json(" You can delete only your comment!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetCommentWithIdPost = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.body.postId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetCommentWithIdComment = async (req, res) => {
  try {
    const reply = await Comment.find({ commentId: req.params.id });

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetComments = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};
