import React from 'react';;
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Code, Award } from 'lucide-react';
import pimg from '../profile.jpg';

const WavySeparator = ({ color1, color2 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 320" 
    preserveAspectRatio="none"
    className="w-full h-24 md:h-36"
  >
    <path
      fill={color1}
      fillOpacity="1"
      d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
    ></path>
    <path
      fill={color2}
      fillOpacity="0.5"
      d="M0,256L48,250.7C96,245,192,235,288,213.3C384,192,480,160,576,160C672,160,768,192,864,202.7C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
    ></path>
  </svg>
);

const AboutMe = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-green-400 relative pt-24">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-lg pt-12 pb-24 px-6 md:px-12 text-center">
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-8 space-y-4 md:space-y-0"
          >
            <img 
              src={pimg}
              alt="Profile" 
              className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-lg"
            />
            <div>
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl font-bold text-gray-800 mb-2"
              >
                Noah Ivyl Sehman
              </motion.h1>
              <motion.p 
                variants={itemVariants} 
                className="text-xl text-gray-600 mb-4"
              >
                Full Stack Developer | Creative Problem Solver
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* About Me Section */}
        <div className="bg-blue-50 py-16 px-6 md:px-12">
          <motion.div 
            variants={itemVariants} 
            className="max-w-4xl mx-auto flex items-center space-x-8"
          >
            <User className="text-blue-600 hidden md:block" size={64} />
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">About Me</h3>
              <p className="text-gray-700 text-lg">
      I've always been fascinated with how things work. Since my first coding class in high school, technology 
      became more than just a subject—it's a tool for exploring and creating. My journey has taken me through 
      programming languages, robotics, and music technology, always driven by curiosity. Whether I'm building 
      software, designing synthesizers, or diving into complex systems, I approach each project as a puzzle 
      waiting to be solved. My background in computer science and telecommunications has taught me that the 
      most innovative solutions often emerge from connecting different disciplines. I'm happiest when I'm 
      learning, experimenting, and pushing the boundaries of what's possible.
              </p>
            </div>
          </motion.div>
        </div>
        <WavySeparator color1="#dbeafe" color2="#bfdbfe" />

        {/* Skills Section */}
        <div className="bg-purple-50 py-16 px-6 md:px-12">
          <motion.div 
            variants={itemVariants} 
            className="max-w-4xl mx-auto flex items-center space-x-8"
          >
            <div className="text-right md:text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Skills</h3>
              <p className="text-gray-700 text-lg">
      I leverage a versatile tech stack across languages like Java, Python, and Golang, and frameworks 
      including React, Node, and Spring Boot. Proficient in both SQL and NoSQL databases, with experience in 
      machine learning technologies like TensorFlow and PyTorch, I combine technical depth with strong collaborative 
      skills to solve complex engineering challenges.
              </p>
              <div className="mt-6 flex flex-wrap justify-center md:justify-end gap-3">
                {['React', 'Node.js', 'TypeScript', 'Python', 'SQL', 'GoLang', 'ML', 'Advanced Calculus', 'Full-Stack'].map((skill) => (
                  <span key={skill} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Code className="text-purple-600 hidden md:block" size={64} />
          </motion.div>
        </div>
        <WavySeparator color1="#fae6ff" color2="#f3d1ff" />

        {/* Achievements Section */}
        <div className="bg-green-50 py-16 px-6 md:px-12">
          <motion.div 
            variants={itemVariants} 
            className="max-w-4xl mx-auto flex items-center space-x-8"
          >
            <Award className="text-green-600 hidden md:block" size={64} />
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Achievements</h3>
              <p className="text-gray-700 text-lg mb-6">
      Certified full-stack developer from Arizona State University, with advanced technical credentials 
      including Cisco Certified Network Technician (CCT) and a Technical Skills Standards Assessment 
      certification. Beyond my professional achievements, I've cultivated discipline and resilience through 
      earning a third-degree black belt in Taekwondo, demonstrating my commitment to continuous growth and 
      mastery in both technical and personal pursuits.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">6+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">20+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <div className="text-gray-600">Technical Certifications</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Button */}
        <div className="bg-white/80 backdrop-blur-lg py-12 text-center">
          <motion.div variants={itemVariants}>
            <Link 
              to="/contact" 
              className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
