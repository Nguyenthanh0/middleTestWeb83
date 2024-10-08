import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";

// CREATE - Tạo hồ sơ cá nhân
export const createProfile = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      placeOfBirth,
      nationality,
      education,
      skills,
      workExperience,
      projects,
      hobbies,
      personalGoals,
    } = req.body;

    // Tạo hồ sơ mới
    const profile = new Profile({
      fullName,
      dob,
      placeOfBirth,
      nationality,
      education,
      skills,
      workExperience,
      projects,
      hobbies,
      personalGoals,
      userId: req.userId, // Gắn ID của người dùng vào hồ sơ
    });

    const savedProfile = await profile.save();
    await User.findByIdAndUpdate(req.userId, { profile: savedProfile._id });
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: savedProfile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - Lấy tất cả hồ sơ
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Lấy một hồ sơ theo ID
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Cập nhật hồ sơ cá nhân
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      dob,
      placeOfBirth,
      nationality,
      education,
      skills,
      workExperience,
      projects,
      hobbies,
      personalGoals,
    } = req.body;

    // Chỉ cập nhật nếu user là chủ sở hữu của hồ sơ
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Kiểm tra quyền truy cập
    if (profile.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this profile" });
    }

    // Cập nhật hồ sơ
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      {
        fullName,
        dob,
        placeOfBirth,
        nationality,
        education,
        skills,
        workExperience,
        projects,
        hobbies,
        personalGoals,
      },
      { new: true } // Trả về đối tượng mới sau khi cập nhật
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Xóa hồ sơ cá nhân
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Chỉ xóa nếu user là chủ sở hữu của hồ sơ
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Kiểm tra quyền truy cập
    if (profile.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this profile" });
    }

    await Profile.findByIdAndDelete(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
