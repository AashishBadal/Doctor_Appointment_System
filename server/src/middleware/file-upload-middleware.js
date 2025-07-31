import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import multer from "multer";

// Cloudinary upload function
export const uploadFile = async (path, folder = "/") => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(path, {
      folder: "doctor_book" + folder,
      allowed_formats: ["jpg", "png", "gif", "webp", "svg"],
      unique_filename: true,
    });

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    return {
      public_id,
      path: secure_url,
    };
  } catch (error) {
    throw new Error("File upload error", 500);
  }
};

// Cloudinary delete function
export const deleteFile = async (public_ids) => {
  try {
    await Promise.all(
      public_ids.map(async (public_id) => await cloudinary.uploader.destroy(public_id))
    );
    return true;
  } catch (error) {
    throw new Error("File delete error", 500);
  }
};

// Multer middleware setup
export const upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const fileName = file.fieldname + "-" + Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};
