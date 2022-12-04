import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
//create  a post
export const CreatePost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
};
//update  a post
export const UpdatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json("Updated post  success");
    } else {
      res.status(403).json(" You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete  a post
export const DeletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({
        $set: req.body,
      });
      res.status(200).json("Deleted post success");
    } else {
      res.status(403).json(" You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//like  a post
export const LikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      res.status(200).json(" The post has been liked");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      res.status(200).json(" The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//get a post
export const GetPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all post
export const GetAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get profile
export const GetProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    const posts = await Post.find({
      userId: user._id,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts
export const GetTimLinePost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPost = await Post.find({
      userId: currentUser._id,
    });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({
          userId: friendId,
        });
      })
    );
    res.status(200).json(userPost.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get post in profile of user with username
export const GetProfilePost = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    const posts = await Post.find({
      userId: user._id,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const CountPost = async (req, res) => {
  const userName = req.body.username;
  const user = await User.findOne({ username: userName });
  if (user !== null) {
    const count = await Post.find({ userId: user._id }).count();
    res.status(200).json(count);
  } else {
    res.status(404).json("something wrong");
  }
};

export const GetComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const comment = await Comment.find({ _id: post.comment });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};
