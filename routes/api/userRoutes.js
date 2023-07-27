const router = require("express").Router();
// all the different user api methods
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// routes for getUser and createUser
router.get("/", getUser);
router.post("/", createUser);
// routes for getSingleUser, updateUser, and deleteUser
router.get("/:userId", getSingleUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

// routes for addFriend and removeFriend
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;
