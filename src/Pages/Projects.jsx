import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Geometric Fourier Transform",
      description: "An attempt to make the fourier transform a little easier for humans and harder for computers.",
      technologies: ["Trigonometry", "Geometric Sequences", "Boolean Logic", "Complex Analysis"],
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Sweet Portfolio Website",
      description: "So there's this website you should totally check out it's super cool...",
      technologies: ["React", "Tailwind", "Node.js", "Framer Motion"],
      githubLink: "https://github.com/k-v09/ShipHouse",
      liveLink: "https://noahivyl.com"
    },
    {
      title: "VYL (Very Yucky Lang)",
      description: "My own language, based on a combination of APL and set theory to give myself the ideal development experience!",
      technologies: ["GoLang", "Interpreters", "Unit Testing", "Semantic Analysis", "AST"],
      githubLink: "https://github.com/k-v09/VYL",
      LiveLink: "#"
    },
    {
      title: "Synage",
      description: "This is my playgroud for testing and modeling synthesizer ideas.",
      technologies: ["GoLang", "Python", "Unix Pipes", "Binary Encoding", "Harmonic Motion"],
      githubLink: "https://github.com/k-v09/Jen-R-8-R",
      liveLink: "https://github.com/k-v09/Jen-R-8-R"
    },
    {
      title: "Readme Generator",
      description: "Readmes are just the worst. This isn't a perfect solution, but it does make a nice template to build on.",
      technologies: ["JavaScript", "Inquirer", "File Generation", "Content Automation"],
      githubLink: "https://github.com/k-v09/ReadMe-Generator",
      liveLink: "https://github.com/k-v09/ReadMe-Generator",
    },
    {
      title: "Instantaneous Interaction",
      description: "This paper describes what a reference frame moving at c relative to the universe would observe.",
      technologies: ["Field Theory", "Special Relativity", "Vector Calculus", "Lagrangian Mechanics", "Minkowski Geometry"],
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Ivy Files",
      description: "To work in tandem with my music projects, I created a custom file type to encode specific harmonic information.",
      technologies: ["Java", "Digital Audio", "Signal Processing", "Acoustic Modeling"],
      githubLink: "https://github.com/k-v09/ivy-filer",
      liveLink: "https://github.com/k-v09/ivy-filer",
    },
    {
      title: "Plus-Side",
      description: "My attempt at brute-forcing the collatz conjecture (to no avail, of course). ",
      technologies: ["Zig", "Lookup Tables", "Conjecture Analysis", "Iterative Algorithms"],
      githubLink: "https://github.com/k-v09/plus-side",
      liveLink: "https://github.com/k-v09/plus-side",
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
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                {project.title}
              </h2>
              <p className="text-white/80 mb-4">
                {project.description}
              </p>
              
              <div className="mb-4">
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

              <div className="flex justify-between mt-6">
                <a 
                  href={project.githubLink} 
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href={project.liveLink} 
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
