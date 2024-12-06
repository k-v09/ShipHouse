import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight 
} from 'lucide-react';

const Portfolio = () => {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createRipple = (x, y) => {
      ripples.current.push({
        x, y,
        radius: 0,
        opacity: 0.5
      });
    };

    const animateRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ripples.current = ripples.current.filter(ripple => {
        ripple.radius += 2;
        ripple.opacity -= 0.01;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return ripple.opacity > 0;
      });

      requestAnimationFrame(animateRipples);
    };

    const handleMouseMove = (e) => {
      if (Math.random() < 0.42) {
        createRipple(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateRipples();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center text-center"
      >
        <div>
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-extrabold mb-4"
          >
            Hi, I'm Noah!
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl text-white/80 mb-8"
          >
            Developer | Designer | Debugger
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <a href="https://github.com/k-v09" className="hover:text-pink-400 transition-colors">
              <Github size={36} />
            </a>
            <a href="https://www.linkedin.com/in/noah-sehman-1a6494258/" className="hover:text-pink-400 transition-colors">
              <Linkedin size={36} />
            </a>
            <a href="mailto:noah.sehman@gmail.com" className="hover:text-pink-400 transition-colors">
              <Mail size={36} />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio;
