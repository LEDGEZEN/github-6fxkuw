import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, FileText, Home } from 'lucide-react';
import Login from './Login';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-gray-100 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <BarChart2 className="mr-2" /> Sports Analytics
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="flex items-center hover:text-blue-400">
              <Home className="mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="flex items-center hover:text-blue-400">
              <BarChart2 className="mr-1" /> Projects
            </Link>
          </li>
          <li>
            <Link to="/blog" className="flex items-center hover:text-blue-400">
              <FileText className="mr-1" /> Blog
            </Link>
          </li>
          <li>
            <Login />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;