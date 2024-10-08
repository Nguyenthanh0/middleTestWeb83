import express from "express";
import Profile from "../model/profileModel.js";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controller/profileController.js";
import { authenticate } from "../../middleware/authenticate.js";
// import { authorizeProfileOwner } from "../../middleware/authorizeProfileOwner.js";
const authorizeProfileOwner = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // console.log("Profile found:", profile);
    // console.log("Profile userId:", profile.userId.toString());
    // console.log("Request userId:", req.userId);

    // Kiểm tra xem userId trong profile có trùng với userId từ token không
    if (profile.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this profile" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const router = express.Router();

// Route tạo hồ sơ
router.post("/profiles", authenticate, createProfile);

// Route lấy tất cả hồ sơ
router.get("/allprofiles", getAllProfiles);

// Route lấy hồ sơ theo ID
router.get("/profile/:id", authenticate, getProfileById);

// Route cập nhật hồ sơ
router.put(
  "/updateprofile/:id",
  authenticate,
  authorizeProfileOwner,
  updateProfile
);

// Route xóa hồ sơ
router.delete(
  "/deleteprofile/:id",
  authenticate,
  authorizeProfileOwner,
  deleteProfile
);

export default router;
