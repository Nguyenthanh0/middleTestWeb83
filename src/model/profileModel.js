import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  startDate: Date,
  endDate: Date,
});

const workExperienceSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  startDate: Date,
  endDate: Date, // Nếu vẫn đang làm thì có thể null
});

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  role: String,
  startDate: Date,
  endDate: Date,
});

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    education: [educationSchema],
    skills: [String],
    workExperience: [workExperienceSchema],
    projects: [projectSchema],
    hobbies: [String],
    personalGoals: [String],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
