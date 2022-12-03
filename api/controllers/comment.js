import Comment from "../models/Comment";

export const CreateComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const save = await newComment.save();
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
    const comment = await Comment.find({ commentId: req.body.commentId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};
