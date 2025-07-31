import { 
  Stethoscope, 
  CalendarCheck, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <BadgeCheck className="mr-2 h-4 w-4" />
              Trusted by 500+ clinics nationwide
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Book Your Doctor's Appointment <span className="text-blue-600">Easily</span>
            </h1>

            <p className="text-lg text-gray-600">
              Connect with certified healthcare professionals in minutes. 
              Our platform makes healthcare accessible, convenient, and reliable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/book-appointment"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/doctors"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
              >
                Find Doctors
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>
                <p className="ml-3 text-sm text-gray-700">Verified Doctors</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <p className="ml-3 text-sm text-gray-700">24/7 Availability</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <CalendarCheck className="h-5 w-5 text-blue-600" />
                </div>
                <p className="ml-3 text-sm text-gray-700">Instant Booking</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <p className="ml-3 text-sm text-gray-700">50+ Specialties</p>
              </div>
            </div>
          </div>

          {/* Right side - Image/Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 bg-blue-100 rounded-xl overflow-hidden">
              {/* Placeholder for doctor illustration - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Stethoscope className="mx-auto h-24 w-24 text-blue-400" />
                  <p className="mt-4 text-blue-500">Doctor illustration</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-8 left-8 bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CalendarCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500">Next Available</p>
                    <p className="text-sm font-medium">Today, 4:30 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500">Certified</p>
                    <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;