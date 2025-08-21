import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShieldCheck, Download, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Головна', path: '/' },
    { name: 'Переваги', path: '/#features' },
    { name: 'Завантажити', path: '/download' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/50 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <ShieldCheck className="w-8 h-8 text-brand-accent-light" />
          <span>Shado</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-gray-300 hover:text-white transition-colors duration-300 ${isActive && link.path !== '/#features' ? 'text-brand-accent-light' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center">
            <Link 
              to="/download" 
              className="bg-[length:200%_auto] bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 hover:animate-background-pan transform hover:scale-105 flex items-center gap-2"
            >
                <Download size={20} />
                <span>Завантажити</span>
            </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-gray/80 backdrop-blur-lg">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-lg"
              >
                {link.name}
              </NavLink>
            ))}
             <Link 
                to="/download" 
                onClick={() => setIsOpen(false)} 
                className="bg-[length:200%_auto] bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 hover:animate-background-pan flex items-center gap-2 mt-4"
              >
                <Download size={20} />
                <span>Завантажити</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;