import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import {
  regisUser,
  createPost,
  fixPost,
  createComment,
  fixComment,
  getCommentsByPostId,
} from "../controller/bt1.js";

const router = express.Router();

// router.get("/users", getAllUsers);
// router.get("/users/:id", getUserById);
// router.post("/users", createUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

router.post("/register", regisUser);
router.post("/createpost", createPost);
router.put("/fixPost/:id", fixPost);
router.post("/createComment", createComment);
router.put("/fixComment/:id", fixComment);
router.get("/getCommentsByPostId/:postId", getCommentsByPostId);
export default router;
