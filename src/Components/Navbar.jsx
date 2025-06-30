import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Code, User, Mail, AudioWaveform, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
    },
    {
      path: '/fun',
      label: "Fun",
      icon: AudioWaveform
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl text-white font-bold"
          >
            Noah Ivyl
          </motion.h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
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

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden text-white/70 hover:text-pink-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/90 backdrop-blur-md z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <h2 className="text-xl text-white font-bold">Navigation</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMenu}
                    className="text-white/70 hover:text-pink-300 transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 py-6">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={closeMenu}
                          className={`
                            flex items-center space-x-4 px-6 py-4 
                            ${isActive 
                              ? 'text-pink-400 bg-pink-400/10 border-r-2 border-pink-400' 
                              : 'text-white/70'
                            } 
                            hover:text-pink-300 hover:bg-white/5 transition-all duration-200
                          `}
                        >
                          <Icon size={20} />
                          <span className="text-lg font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <p className="text-white/50 text-sm text-center">
                    © 2024 Noah Ivyl
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
