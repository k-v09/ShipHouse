import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Code, Zap, Music, Calculator } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Geometric Fourier Transform",
      description: "An attempt to make the fourier transform a little easier for humans and harder for computers.",
      technologies: ["Trigonometry", "Geometric Sequences", "Boolean Logic", "Complex Analysis"],
      type: "visual",
      icon: Calculator,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Sweet Portfolio Website",
      description: "So there's this website you should totally check out it's super cool...",
      technologies: ["React", "Tailwind", "Node.js", "Framer Motion"],
      type: "link",
      link: "https://noahivyl.com",
      linkLabel: "View Live Site"
    },
    {
      title: "VYL (Very Yucky Lang)",
      description: "My own language, based on a combination of APL and set theory to give myself the ideal development experience!",
      technologies: ["GoLang", "Interpreters", "Compilers", "Semantic Analysis", "AST", "Unit Testing"],
      type: "link",
      link: "https://github.com/k-v09/VYL",
      linkLabel: "View on GitHub"
    },
    {
      title: "Synage",
      description: "This is my playground for testing and modeling synthesizer ideas.",
      technologies: ["GoLang", "Python", "Unix Pipes", "Binary Encoding", "Harmonic Motion"],
      type: "link",
      link: "https://github.com/k-v09/Jen-R-8-R",
      linkLabel: "View Repository"
    },
    {
      title: "Fundamentals",
      description: "A 3D audio visualization environment for immersive audio systems. Soon to have the optimal mix of math and music!",
      technologies: ["Rust", "Bevy", "Linear Algebra", "Acoustics", "Game Development", "Compute Shaders"],
      type: "link",
      link: "https://github.com/k-v09/funding",
      linkLabel: "View on GitHub"
    },
    {
      title: "Readme Generator",
      description: "Readmes are just the worst. This isn't a perfect solution, but it does make a nice template to build on.",
      technologies: ["JavaScript", "Inquirer", "File Generation", "Content Automation"],
      type: "link",
      link: "https://github.com/k-v09/ReadMe-Generator",
      linkLabel: "View Repository"
    },
    {
      title: "Instantaneous Interaction",
      description: "This paper describes what a reference frame moving at c relative to the universe would observe.",
      technologies: ["Field Theory", "Special Relativity", "Vector Calculus", "Lagrangian Mechanics", "Minkowski Geometry"],
      type: "visual",
      icon: Zap,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Ivy Files",
      description: "To work in tandem with my music projects, I created a custom file type to encode specific harmonic information.",
      technologies: ["Java", "Digital Audio", "Signal Processing", "Acoustic Modeling"],
      type: "link",
      link: "https://github.com/k-v09/ivy-filer",
      linkLabel: "View on GitHub"
    },
    {
      title: "Plus-Side",
      description: "My attempt at brute-forcing the collatz conjecture (to no avail, of course).",
      technologies: ["Zig", "Lookup Tables", "Conjecture Analysis", "Iterative Algorithms"],
      type: "link",
      link: "https://github.com/k-v09/plus-side",
      linkLabel: "View Repository"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-900 via-pink-700 to-yellow-200 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 pt-10"
        >
          Projects
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                {project.title}
              </h2>
              <p className="text-white/80 mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h3 className="font-medium text-white/70 mb-2">Technologies:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="bg-white/10 px-2 py-1 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.type === "link" ? (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <ExternalLink size={18} />
                  <span>{project.linkLabel}</span>
                </motion.a>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                  >
                    <project.icon size={32} className="text-white" />
                  </motion.div>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                      <FileText size={14} />
                      <span>Research Project</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
