const Post = require("../models/Post");
const User = require("../models/User");

//Create Post
const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(404).json("You can only upoload your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(404).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//React to Post
const likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get post
const viewPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get Timeline Posts
const getTimelinePosts = async (req, res) => {
  const sortByTimestampDesc = { _id: -1 };
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).sort(
      sortByTimestampDesc
    );
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId }).sort(sortByTimestampDesc);
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get Users Posts
const getUsersPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  viewPost,
  getTimelinePosts,
  getUsersPosts,
};
