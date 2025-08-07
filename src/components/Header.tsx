import React from 'react';
import { Dumbbell, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FitPlan AI</span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;