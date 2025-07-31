// booking.controller.js
import Booking from '../models/bookingModel.js';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { fullName, email, phoneNo, address, reasonForVisit, symptoms, doctorId } = req.body;
    const userId = req.user._id;

    if (!doctorId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const booking = new Booking({
      fullName,
      email,
      phoneNo,
      address,
      reasonForVisit,
      symptoms,
      doctorId,
      userId,
      status: 'pending'
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('doctorId')
      .populate('userId');

    res.status(200).json({
      success: true,
      message: 'All bookings fetched',
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('doctorId')
      .populate('userId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking fetched',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings for logged in user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId }).populate('doctorId');

    res.status(200).json({
      success: true,
      message: 'User bookings fetched',
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm booking
export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = 'confirmed';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking confirmed',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
