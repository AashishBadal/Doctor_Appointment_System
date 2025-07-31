import { deleteFile, uploadFile } from '../middleware/file-upload-middleware.js';
import userModel from '../models/userModel.js';
const user_folder = "/users";


export const getUserData = async (req, res,next) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true,userData:{
        username: user.name,
        isAccountVerified: user.isVerified,
    } });
  } catch (error) {
    next(error)
  }
};





export const updateProfile = (async (req, res, next) => {
  const { firstName, lastName, phone, gender } = req.body;
  const { userId } = req.params;
  const profile_image = req.file;

  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phone) user.phone = phone;
  if (gender) user.gender = gender;

  if (profile_image) {
    if (user.profile_image?.public_id) {
      await deleteFile([user.profile_image.public_id]);
    }
    user.profile_image = await uploadFile(profile_image.path, user_folder);
  }

  await user.save();

  res.status(200).json({
    message: "Profile updated successfully",
    success: true,
    status: "success",
    data: user,
  });
});
