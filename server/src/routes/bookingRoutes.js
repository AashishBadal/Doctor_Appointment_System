import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getUserBookings,
  cancelBooking,
  confirmBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings (admin)
router.get('/', getAllBookings);

// Get booking by ID
router.get('/:id', getBookingById);

// Get bookings for logged-in user
router.get('/user/me', getUserBookings);

// Cancel a booking by ID
router.put('/:id/cancel', cancelBooking);

// Confirm a booking by ID
router.put('/:id/confirm', confirmBooking);

export default router;
