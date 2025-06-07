import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent("Let's Connect!");
    const body = encodeURIComponent("Hi Noah,\n\nI'd love to connect with you.\n\nBest regards,");
    window.location.href = `mailto:noah.sehman@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-indigo-900 flex items-center justify-center p-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl max-w-6xl w-full grid md:grid-cols-2 overflow-hidden"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white/30 p-12 flex flex-col justify-center space-y-6 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
          
          <div className="flex items-center space-x-4">
            <Mail className="text-white" size={32} />
            <div>
              <p className="font-semibold">Email</p>
              <p>noah.sehman@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Phone className="text-white" size={32} />
            <div>
              <p className="font-semibold">Phone</p>
              <p>+1 (480) 338-5997</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <MapPin className="text-white" size={32} />
            <div>
              <p className="font-semibold">Location</p>
              <p>Fountain Hills, AZ</p>
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <a href="https://www.linkedin.com/in/noah-sehman-1a6494258/" className="hover:text-green-300 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/k-v09" className="hover:text-green-300 transition-colors">
              GitHub
            </a>
            <a href="https://www.instagram.com/namheshaon/" className="hover:text-green-300 transition-colors">
              Instagram
            </a>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="p-12 flex flex-col justify-center items-center space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Let's Connect</h2>
            <p className="text-white/80 text-lg">Ready to start a conversation? Send me an email!</p>
          </div>
          
          <motion.button
            onClick={handleMailto}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 flex items-center space-x-4 text-xl font-semibold"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <MessageCircle size={28} className="relative z-10" />
            <span className="relative z-10">Send Email</span>
            <Send size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm">or reach out directly at</p>
            <motion.a 
              href="mailto:noah.sehman@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="text-green-300 hover:text-green-200 font-medium text-lg transition-colors underline decoration-green-300 hover:decoration-green-200"
            >
              noah.sehman@gmail.com
            </motion.a>
          </div>
          
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm">Available for new opportunities</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
