const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  viewPost,
  getTimelinePosts,
  getUsersPosts,
} = require("../controllers/posts.js");

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.put("/likeDislike/:id", likeDislikePost);
router.get("/view/:id", viewPost);
router.get("/timeline/:userId", getTimelinePosts);
router.get("/profile/:username", getUsersPosts);

module.exports = router;
