import { useState, useEffect } from 'react';
import { 
  User,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';

// Mock data for booked appointments
const mockAppointments = [
  {
    id: 1,
    doctorId: 1,
    patientName: 'John Smith',
    patientEmail: 'john.smith@example.com',
    patientPhone: '(555) 123-4567',
    date: '2023-06-15',
    time: '10:00 AM',
    reason: 'Annual checkup',
    symptoms: 'None reported',
    address: '123 Main St, New York, NY',
    previousPatient: true,
    status: 'confirmed'
  },
  {
    id: 2,
    doctorId: 1,
    patientName: 'Emily Johnson',
    patientEmail: 'emily.j@example.com',
    patientPhone: '(555) 987-6543',
    date: '2023-06-16',
    time: '02:30 PM',
    reason: 'Chest pain evaluation',
    symptoms: 'Occasional chest discomfort, shortness of breath',
    address: '456 Oak Ave, Brooklyn, NY',
    previousPatient: false,
    status: 'confirmed'
  },
  {
    id: 3,
    doctorId: 1,
    patientName: 'Michael Chen',
    patientEmail: 'michael.chen@example.com',
    patientPhone: '(555) 456-7890',
    date: '2023-06-17',
    time: '09:15 AM',
    reason: 'Follow-up for hypertension',
    symptoms: 'Occasional headaches',
    address: '789 Pine Rd, Queens, NY',
    previousPatient: true,
    status: 'pending'
  },
  {
    id: 4,
    doctorId: 1,
    patientName: 'Sarah Williams',
    patientEmail: 'sarah.w@example.com',
    patientPhone: '(555) 789-0123',
    date: '2023-06-18',
    time: '11:45 AM',
    reason: 'Diabetes management',
    symptoms: 'Increased thirst, frequent urination',
    address: '321 Elm Blvd, Bronx, NY',
    previousPatient: true,
    status: 'confirmed'
  },
  {
    id: 5,
    doctorId: 1,
    patientName: 'David Rodriguez',
    patientEmail: 'david.r@example.com',
    patientPhone: '(555) 234-5678',
    date: '2023-06-19',
    time: '03:00 PM',
    reason: 'Sports physical',
    symptoms: 'None',
    address: '654 Maple Dr, Staten Island, NY',
    previousPatient: false,
    status: 'pending'
  },
  {
    id: 6,
    doctorId: 1,
    patientName: 'Lisa Thompson',
    patientEmail: 'lisa.t@example.com',
    patientPhone: '(555) 345-6789',
    date: '2023-06-20',
    time: '01:30 PM',
    reason: 'Allergy consultation',
    symptoms: 'Seasonal allergies, itchy eyes',
    address: '987 Cedar Ln, Jersey City, NJ',
    previousPatient: false,
    status: 'confirmed'
  },
  {
    id: 7,
    doctorId: 1,
    patientName: 'Robert Kim',
    patientEmail: 'robert.k@example.com',
    patientPhone: '(555) 456-7891',
    date: '2023-06-21',
    time: '10:30 AM',
    reason: 'Back pain evaluation',
    symptoms: 'Chronic lower back pain, occasional numbness',
    address: '159 Birch St, Hoboken, NJ',
    previousPatient: true,
    status: 'cancelled'
  }
];

const DoctorsDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Load appointments (in a real app, this would be an API call)
  useEffect(() => {
    // Filter by doctorId if you have multiple doctors
    const doctorAppointments = mockAppointments.filter(app => app.doctorId === 1);
    setAppointments(doctorAppointments);
  }, []);

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle viewing appointment details
  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle going back to list view
  const handleBackToList = () => {
    setSelectedAppointment(null);
  };

  if (selectedAppointment) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <button
          onClick={handleBackToList}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to appointments
        </button>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{selectedAppointment.patientName}'s Appointment</h2>
          <div className="flex items-center mt-2 text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{selectedAppointment.date} at {selectedAppointment.time}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              selectedAppointment.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : selectedAppointment.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {selectedAppointment.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <User className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.patientName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.patientEmail}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.patientPhone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Appointment Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Reason for Visit</p>
                <p className="text-sm text-gray-900 mt-1">{selectedAppointment.reason}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Symptoms</p>
                <p className="text-sm text-gray-900 mt-1">{selectedAppointment.symptoms || 'None reported'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Previous Patient</p>
                <p className="text-sm text-gray-900 mt-1">{selectedAppointment.previousPatient ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Reschedule
          </button>
          {selectedAppointment.status !== 'confirmed' && (
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Confirm Appointment
            </button>
          )}
          {selectedAppointment.status === 'confirmed' && (
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancel Appointment
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Appointments Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">View and manage your upcoming appointments</p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <li key={appointment.id}>
                <button
                  onClick={() => handleViewAppointment(appointment)}
                  className="block w-full text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="flex-shrink-0 h-10 w-10 text-gray-400" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-blue-600">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patientEmail}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-left mr-6">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.date}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.time}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                          <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-6 flex items-center text-sm text-gray-500">
                          <Stethoscope className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                          {appointment.reason}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                          View details
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-12 text-center">
              <div className="text-gray-500">
                No appointments found matching your criteria
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsDashboard;