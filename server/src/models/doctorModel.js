import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Doctor name is required"],
    trim: true,
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
    trim: true,
  },
  experience_years: {
    type: Number,
    required: [true, "Experience in years is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  profile_image: {
    path: {
      type: String,
      required: false,
    },
    public_id: {
      type: String,
      required: false,
    },
  },
  available_days: {
    type: [String], // e.g., ['Monday', 'Wednesday', 'Friday']
    required: [true, "Available days are required"],
  },
  time_slots: {
    type: [String], // e.g., ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM']
    required: [true, "Time slots are required"],
  },
  languages: {
    type: [String], // e.g., ['English', 'Spanish']
    required: [true, "Languages are required"],
  },
  availability: {
    type: String, // e.g., 'Mon-Fri, 8am-4pm'
  },
  nextAvailable: {
    type: String, // e.g., 'Today, 1:00 PM'
  },
  verified: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Doctor = model("Doctor", doctorSchema);
export default Doctor;
