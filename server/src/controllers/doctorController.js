import Doctor from '../models/doctorModel.js';

export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      location,
      languages,
      available_days,
      time_slots,
      description
    } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      experience: experience ? Number(experience) : 0,
      location,
      languages: languages ? JSON.parse(languages) : [],
      description,
      time_slots,
      available_days
    });

    await doctor.save();

    res.status(201).json({
      message: 'Doctor created successfully',
      success: true,
      status: 'success',
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({
      message: 'Doctors fetched successfully',
      success: true,
      status: 'success',
      data: doctors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    res.status(200).json({
      message: 'Doctor fetched successfully',
      success: true,
      status: 'success',
      data: doctor
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    await doctor.deleteOne();

    res.status(200).json({
      message: 'Doctor deleted successfully',
      success: true,
      status: 'success',
      data: doctor
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const {
      name,
      specialization,
      experience,
      languages,
      location,
      description,
      available_days,
      time_slots
    } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    if (name) doctor.name = name;
    if (specialization) doctor.specialization = specialization;
    if (experience) doctor.experience = Number(experience);
    if (languages) doctor.languages = JSON.parse(languages);
    if (description) doctor.description = description;
    if (location) doctor.location = location;
    if (available_days) doctor.available_days = available_days;
    if (time_slots) doctor.time_slots = time_slots;

    await doctor.save();

    res.status(200).json({
      message: 'Doctor updated successfully',
      success: true,
      status: 'success',
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
