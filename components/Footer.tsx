import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray border-t border-brand-light-gray/20">
      <div className="container mx-auto px-6 py-6 text-center text-gray-500 relative">
        <p>&copy; {new Date().getFullYear()} Shado Messenger. Всі права захищені.</p>
        <Link 
          to="/admin" 
          aria-label="Admin Panel"
          className="absolute bottom-2 right-2 p-2 rounded-full text-gray-800 hover:text-gray-500 hover:bg-white/10 transition-all duration-300"
        >
          <Settings size={16} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;