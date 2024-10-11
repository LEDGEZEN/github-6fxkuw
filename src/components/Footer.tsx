import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Sports Analytics Portfolio</h3>
            <p className="text-sm mt-2">Bringing data-driven insights to sports</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><Github /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Sports Analytics Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;