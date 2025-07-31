import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  patientName: { 
    type: String, 
    required: true 
  },
  patientEmail: { 
    type: String, 
    required: true 
  },
  patientPhone: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  reason: { 
    type: String 
  },
  symptoms: { 
    type: String 
  },
  address: { 
    type: String 
  },
  previousPatient: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;
