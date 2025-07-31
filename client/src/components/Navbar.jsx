import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  CalendarCheck, 
  UserCircle, 
  Menu, 
  X,
  Home,
  Search,
  HeartPulse,
  Info
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">MediBook</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <Link
                to="/doctors"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Search className="mr-1 h-4 w-4" />
                Find Doctors
              </Link>
              <Link
                to="/appointments"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <CalendarCheck className="mr-1 h-4 w-4" />
                My Appointments
              </Link>
              <Link
                to="/services"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <HeartPulse className="mr-1 h-4 w-4" />
                Services
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Info className="mr-1 h-4 w-4" />
                About
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserCircle className="mr-1 h-4 w-4" />
              Login
            </Link>
            <Link
              to="/book-appointment"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CalendarCheck className="mr-1 h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Home
            </div>
          </Link>
          <Link
            to="/doctors"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Find Doctors
            </div>
          </Link>
          <Link
            to="/appointments"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              My Appointments
            </div>
          </Link>
          <Link
            to="/services"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <HeartPulse className="mr-2 h-5 w-5" />
              Services
            </div>
          </Link>
          <Link
            to="/about"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <Info className="mr-2 h-5 w-5" />
              About
            </div>
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Login
                </div>
              </Link>
              <Link
                to="/book-appointment"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Appointment
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;