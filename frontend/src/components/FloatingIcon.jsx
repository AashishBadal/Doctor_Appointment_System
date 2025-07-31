import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';

const FloatingChatIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTipsPage = location.pathname === '/tips-page';

  const handleClick = () => {
    isTipsPage ? navigate('/') : navigate('/tips-page');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hover tooltip */}
      { !isTipsPage && (
        <div className=" text-center absolute bottom-full right-0 mb-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md shadow-lg animate-fade-in w-15">
          Get health tips
          <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-blue-700"></div>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={handleClick}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isTipsPage 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isTipsPage ? "Close tips" : "Get health tips"}
      >
        {isTipsPage ? (
          <X className="w-6 h-6 text-white" strokeWidth={2.5} />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
};

export default FloatingChatIcon;