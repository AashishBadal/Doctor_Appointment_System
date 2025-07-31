import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  ChevronDown,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

import doctorsData from "../assets/assets.js";

const AppointmentForm = () => {
  // Get doctorId from URL parameters
  const { doctorId } = useParams();
  
  // Find the specific doctor
  const doctor = doctorsData.find(doc => doc.id === parseInt(doctorId));

  // Form state
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
    address: "",
    insuranceProvider: "",
    insuranceId: "",
    previousPatient: false,
    symptoms: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Load available time slots (mock data)
  useEffect(() => {
    const mockSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
    ];
    setAvailableSlots(mockSlots);
  }, [doctorId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Appointment booked:", formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Appointment Booked!
        </h2>
        <p className="text-gray-600 mb-6">
          Your appointment with {doctor.name} has been confirmed for{" "}
          {formData.date} at {formData.time}.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg text-left">
          <h3 className="font-medium text-gray-800 mb-2">
            Appointment Details
          </h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Doctor:</span> {doctor.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {formData.date}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time:</span> {formData.time}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Reason:</span> {formData.reason}
          </p>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          A confirmation has been sent to {formData.email}. Please arrive 15
          minutes early.
        </p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Doctor Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the doctor you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        {/* Doctor Info Sidebar */}
        <div className="md:w-1/3 bg-blue-50 p-6">
          <div className="flex items-center mb-6">
            <img
              className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
              src={doctor.image}
              alt={doctor.name}
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">
                {doctor.name}
              </h2>
              <p className="text-blue-600 font-medium">
                {doctor.specialty}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">
                  Available Days
                </h3>
                <p className="text-sm text-gray-600">{doctor.availability}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">
                  Next Available
                </h3>
                <p className="text-sm text-gray-600">{doctor.nextAvailable}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Stethoscope className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">
                  Specializations
                </h3>
                <p className="text-sm text-gray-600">
                  {doctor.specialty}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-100">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Appointment Policy
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 24-hour cancellation policy</li>
                <li>• Please bring your insurance card</li>
                <li>• Arrive 15 minutes early for paperwork</li>
                <li>• Late arrivals may be rescheduled</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.patientName ? "border-red-300" : "border-gray-300"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />{" "}
                    {errors.patientName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="(123) 456-7890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main St"
                  />
                </div>
              </div>

              {/* Appointment Date */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.date ? "border-red-300" : "border-gray-300"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.date}
                  </p>
                )}
              </div>

              {/* Appointment Time */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.time ? "border-red-300" : "border-gray-300"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10`}
                  >
                    <option value="">Select a time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.time}
                  </p>
                )}
              </div>

              {/* Reason for Visit */}
              <div className="col-span-2">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.reason ? "border-red-300" : "border-gray-300"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Describe your symptoms or reason for appointment"
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.reason}
                  </p>
                )}
              </div>

              {/* Symptoms */}
              <div className="col-span-2">
                <label
                  htmlFor="symptoms"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Symptoms (if any)
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows={2}
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List any symptoms you're experiencing"
                />
              </div>



            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
