import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true
  },
  phoneNo: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  address: {
    type: String,
    default: ""
  },
  reasonForVisit: {
    type: String,
    required: [true, "Reason for visit is required"]
  },
  symptoms: {
    type: String,
    default: ""
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, "Doctor ID is required"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID (patient) is required"]
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
