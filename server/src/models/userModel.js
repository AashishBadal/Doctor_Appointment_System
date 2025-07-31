import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient"
  },

  profile_image: {
    path: {
      type: String
    },
    public_id: {
      type: String
    }
  },

  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 }
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
