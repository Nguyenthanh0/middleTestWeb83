import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }, // Kết nối với hồ sơ cá nhân
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
