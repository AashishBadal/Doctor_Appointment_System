import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  Stethoscope,
  HeartPulse,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("patient"); // 'patient' or 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    licenseNumber: "", // for doctors
    specialization: "", // for doctors
    yearsOfExperience: "", // for doctors
    hospitalAffiliation: "", // for doctors
    dob: "", // for patients
    gender: "", // for patients
    address: "", // for patients
    insuranceProvider: "", // for patients
    insurancePolicyNumber: "", // for patients
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // ... existing validation ...

    if (!isLogin && userType === "doctor") {
      if (!formData.licenseNumber)
        newErrors.licenseNumber = "License number is required";
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required";
      if (!formData.yearsOfExperience)
        newErrors.yearsOfExperience = "Years of experience is required";
      if (!formData.hospitalAffiliation)
        newErrors.hospitalAffiliation = "Hospital affiliation is required";
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.availability)
        newErrors.availability = "Availability is required";
      if (!formData.nextAvailable)
        newErrors.nextAvailable = "Next available appointment is required";
      if (!formData.languages)
        newErrors.languages = "Languages spoken is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would make an API call here
      console.log("Form submitted:", { ...formData, userType });

      // Simulate successful authentication
      setTimeout(() => {
        if (userType === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/");
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {userType === "doctor" ? (
            <Stethoscope className="h-12 w-12 text-blue-600" />
          ) : (
            <HeartPulse className="h-12 w-12 text-blue-600" />
          )}
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Or{" "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Selector */}
          <div className="mb-6">
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => handleUserTypeChange("patient")}
                className={`flex-1 py-2 px-4 border rounded-l-md text-sm font-medium ${
                  userType === "patient"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Patient
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange("doctor")}
                className={`flex-1 py-2 px-4 border rounded-r-md text-sm font-medium ${
                  userType === "doctor"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Doctor
                </div>
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 block w-full shadow-sm ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 block w-full shadow-sm ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Sign Up Additional Fields */}
            {!isLogin && (
              <>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 block w-full shadow-sm ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`pl-10 block w-full shadow-sm ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Doctor Specific Fields */}
                {userType === "doctor" && (
                  <>
                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Medical License Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="licenseNumber"
                          name="licenseNumber"
                          type="text"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.licenseNumber
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.licenseNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.licenseNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="specialization"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Specialization
                      </label>
                      <div className="mt-1">
                        <select
                          id="specialization"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.specialization
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        >
                          <option value="">Select a specialization</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="General Practice">
                            General Practice
                          </option>
                          <option value="Radiology">Radiology</option>
                          <option value="Oncology">Oncology</option>
                          <option value="Psychiatry">Psychiatry</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Anesthesiology">Anesthesiology</option>
                        </select>
                      </div>
                      {errors.specialization && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.specialization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="yearsOfExperience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Years of Experience
                      </label>
                      <div className="mt-1">
                        <input
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          type="number"
                          min="0"
                          max="50"
                          value={formData.yearsOfExperience}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.yearsOfExperience
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.yearsOfExperience && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.yearsOfExperience}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hospitalAffiliation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hospital Affiliation
                      </label>
                      <div className="mt-1">
                        <input
                          id="hospitalAffiliation"
                          name="hospitalAffiliation"
                          type="text"
                          value={formData.hospitalAffiliation}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.hospitalAffiliation
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.hospitalAffiliation && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.hospitalAffiliation}
                        </p>
                      )}
                    </div>

                    {/* New fields from the provided data */}
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location (City, State)
                      </label>
                      <div className="mt-1">
                        <input
                          id="location"
                          name="location"
                          type="text"
                          placeholder="e.g., El Paso, TX"
                          value={formData.location}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.location
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="availability"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Available Days
                      </label>
                      <div className="mt-1">
                        <input
                          id="availability"
                          name="availability"
                          type="text"
                          placeholder="e.g., Mon-Fri, 8am-4pm"
                          value={formData.availability}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.availability
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.availability && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.availability}
                        </p>
                      )}
                    </div>

                   

                    <div>
                      <label
                        htmlFor="languages"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Languages Spoken (comma separated)
                      </label>
                      <div className="mt-1">
                        <input
                          id="languages"
                          name="languages"
                          type="text"
                          placeholder="e.g., English, Spanish"
                          value={formData.languages}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.languages
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.languages && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.languages}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Patient Specific Fields */}
                {userType === "patient" && (
                  <>
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <div className="mt-1">
                        <input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.dob ? "border-red-300" : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        />
                      </div>
                      {errors.dob && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dob}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <div className="mt-1">
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`block w-full shadow-sm ${
                            errors.gender ? "border-red-300" : "border-gray-300"
                          } focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Remember me and Forgot password (login only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? "Sign in" : "Sign up"} as {userType}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
