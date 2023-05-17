const router = require("express").Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
  viewUser,
  followUser,
  unfollowUser,
  getFriendList,
} = require("../controllers/users.js");

router.get("/", getAllUsers);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/view", viewUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);
router.get("/friends/:userId", getFriendList);

module.exports = router;
