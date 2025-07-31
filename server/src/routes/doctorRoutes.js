import express from 'express';
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

// Routes
router.post('/', createDoctor);
router.get('/', getAllDoctors);
router.get('/:doctorId', getDoctorById);
router.put('/:doctorId', updateDoctor);
router.delete('/:doctorId', deleteDoctor);

export default router;
