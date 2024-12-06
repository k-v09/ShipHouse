import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code, User, Mail } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: Home 
    },
    { 
      path: '/projects', 
      label: 'Projects', 
      icon: Code 
    },
    { 
      path: '/about', 
      label: 'About Me', 
      icon: User 
    },
    { 
      path: '/contact', 
      label: 'Contact', 
      icon: Mail 
    }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-white font-bold"
        >
          Noah Ivyl
        </motion.h1>
        <div className="flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center space-x-2
                  ${location.pathname === item.path 
                    ? 'text-pink-400 font-bold' 
                    : 'text-white/70'
                  } hover:text-pink-300 transition-colors`}
              >
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-2"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
