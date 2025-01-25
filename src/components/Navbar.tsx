import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('user') || '';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="bg-[#E6F4FF] p-2 rounded-lg">
              <img 
                src="assets/images/logo.png" 
                alt="إعلانيكس" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-gray-600">مرحباً،</span>
              <span className="font-semibold">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
