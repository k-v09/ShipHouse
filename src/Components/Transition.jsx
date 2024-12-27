import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children, background = '#000' }) => {
  const location = useLocation();

  const pageVariants = {
    initial: { 
      opacity: 0,
      x: '100%' // Slide in from right
    },
    in: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1] // Smooth, natural easing
      }
    },
    out: { 
      opacity: 0,
      x: '-100%', // Slide out to left
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        backgroundColor: background 
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%',
            backgroundColor: background
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
