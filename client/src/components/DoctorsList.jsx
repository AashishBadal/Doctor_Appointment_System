import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  CalendarCheck,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../assets/assets.js";

const DoctorsList = () => {
  const navigate = useNavigate();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Get unique specialties and locations for filters
  const specialties = [
    "All",
    ...new Set(doctorsData.map((doctor) => doctor.specialty)),
  ];
  const locations = [
    "All",
    ...new Set(doctorsData.map((doctor) => doctor.location)),
  ];

  // Filter doctors based on search and filters
  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "All" || doctor.specialty === specialtyFilter;
    const matchesLocation =
      locationFilter === "All" || doctor.location === locationFilter;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find the Right Doctor for You
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Connect with experienced healthcare professionals in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Stethoscope className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "All" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "All" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img
                      className="h-20 w-20 rounded-full object-cover border-2 border-blue-100"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold text-gray-900">
                          {doctor.name}
                        </h3>
                        {doctor.verified && (
                          <BadgeCheck className="ml-2 h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-blue-600 font-medium">
                        {doctor.specialty}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {doctor.experience} years of experience
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="flex-shrink-0 h-4 w-4 text-gray-500" />
                      <span className="ml-2">{doctor.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="flex-shrink-0 h-4 w-4 text-gray-500" />
                      <span className="ml-2">{doctor.availability}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarCheck className="flex-shrink-0 h-4 w-4 text-gray-500" />
                      <span className="ml-2 font-medium text-blue-600">
                        {doctor.nextAvailable}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language) => (
                        <span
                          key={language}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/appointment-form/${doctor.id}`)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No doctors found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;