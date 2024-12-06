import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('Form validation errors:', errors);
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        process.env.EMAILJS_PUBLIC_KEY
      );

      // Success handling
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      // Error handling
      console.error('Email send error:', error);
      setStatus('error');
    } finally {
      // Reset submission state
      setIsSubmitting(false);
    }
  };

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
          className="p-12"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your Email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your Message"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`
                w-full flex items-center justify-center p-3 rounded-lg transition-colors
                ${isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
                } 
                text-white
              `}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Message */}
            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded flex items-center">
                <CheckCircle className="mr-2" /> 
                Message sent successfully!
              </div>
            )}
            
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded flex items-center">
                <AlertCircle className="mr-2" /> 
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
