import React, { useState, useEffect, useRef } from 'react';
import Intro from '../Components/Intro.jsx';
import ContactCard from '../Components/Mobile.jsx';

const LabshipUI = () => {
  const [temp, setTemp] = useState(73.2);
  const [power, setPower] = useState(98.7);
  const [flux, setFlux] = useState(1.247);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', content: 'user@lab-IV:~$ ls current_projects/' },
    { type: 'output', content: '- relativistic_mechanics.tex' },
    { type: 'output', content: '- set_theory_foundations.pdf' },
    { type: 'output', content: '- acoustic_metamaterials/' },
    { type: 'output', content: '- altoids_synth_modules/' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        'Available commands:',
        '  help              - Show this help message',
        '  about             - Learn about my research',
        '  projects          - View current projects',
        '  papers            - Access research papers',
        '  synth             - Explore synthesizer modules',
        '  music             - Navigate to music projects',
        '  math              - View mathematical work',
        '  contact           - Get contact information',
        '  clear             - Clear terminal screen',
        '  ls                - List directory contents',
        '  whoami            - Display current user',
        '  date              - Show current date/time',
        '  status            - Show lab status'
      ]
    },
    about: {
      description: 'Learn about my research',
      action: () => [
        'Noah Ivyl - Researcher & Creator',
        'Exploring the intersection of mathematics and music',
        'Specializing in:',
        '  • Relativistic mechanics',
        '  • Set theory foundations',
        '  • Acoustic metamaterials',
        '  • Electronic music synthesis',
        '',
        'Type "projects" to see current work.'
      ]
    },
    projects: {
      description: 'View current projects',
      action: () => [
        'Current active projects:',
        '',
        '1. Relativistic Mechanics Research',
        '   Status: In progress - 2 papers submitted',
        '',
        '2. Set Theory Foundations',
        '   Status: Under review',
        '',
        '3. Acoustic Metamaterials Lab',
        '   Status: Prototype testing phase',
        '',
        '4. Altoids Synth Modules',
        '   Status: 7 units completed',
        '',
        'Use "papers", "synth", or specific project names for details.'
      ]
    },
    papers: {
      description: 'Access research papers',
      action: () => {
        return [
          'Opening research papers archive...',
          'Redirecting to /papers in 3 seconds...',
          '',
          'Recent writings:',
          '• "Supersymmetric Quantum Mechanics and the Complete Theory of Acoustic Metamaterial Transfer Functions"',
          '• "On Incompleteness’ Separation from Corporeality"',
          '• "Mathematical Realism and the Problem of Unobservable Mathematical Objects"',
          '• "Proper Time and the Light-Speed Reference Frame: Implications for Temporal Experience"'
        ];
      }
    },
    synth: {
      description: 'Explore synthesizer modules',
      action: () => {
        return [
          'Launching synthesizer interface...',
          'Loading Altoids modules...',
          '',
          '🎛️ Current modules:',
          '  • FF Synthoid: Oscillator',
          '  • Filter Matrix: Envelope', 
          '  • Base-Origin: FX 1',
          '  • In-Effect: FX-2',
          '',
          'Redirecting to /synthesizer...'
        ];
      }
    },
    music: {
      description: 'Navigate to music projects',
      action: () => [
        'Accessing music project directory...',
        'Loading compositions and recordings...',
        'Redirecting to /music in 3 seconds...'
      ]
    },
    math: {
      description: 'View mathematical work',
      action: () => [
        'Loading mathematical research...',
        'Current focus areas:',
        '• Differential Geometry',
        '• Abstract Algebra',
        '• Topology',
        '• Applied Mathematics',
        'Redirecting to /mathematics...'
      ]
    },
    contact: {
      description: 'Get contact information',
      action: () => [
        'Contact Information:',
        '━━━━━━━━━━━━━━━━━',
        'Email: noah.sehman@gmail.com',
        'Lab: Interdisciplinary Research Facility',
        'Office Hours: Mon-Fri 9:00-17:00',
        'Research Collaborations: Open to inquiry'
      ]
    },
    clear: {
      description: 'Clear terminal screen',
      action: () => 'CLEAR'
    },
    ls: {
      description: 'List directory contents',
      action: () => [
        'current_projects/',
        'research_papers/',
        'synthesizer_modules/',
        'mathematical_proofs/',
        'acoustic_experiments/',
        'music_compositions/',
        'lab_notes.txt',
        'README.md'
      ]
    },
    whoami: {
      description: 'Display current user',
      action: () => ['noah@lab-IV']
    },
    date: {
      description: 'Show current date/time',
      action: () => [new Date().toLocaleString()]
    },
    status: {
      description: 'Show lab status',
      action: () => [
        'Lab Status Report:',
        '━━━━━━━━━━━━━━━━',
        `Temperature: ${temp.toFixed(1)}°F`,
        `Power Level: ${power.toFixed(1)}%`,
        `Flux Rate: ${flux.toFixed(3)} kHz`,
        'All systems operational ✓'
      ]
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(70 + Math.random() * 10);
      setPower(95 + Math.random() * 5);
      setFlux(1.2 + Math.random() * 0.1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    
    const newHistory = [...terminalHistory, { 
      type: 'input', 
      content: `user@lab-IV:~$ ${command}` 
    }];

    if (cmd === '') {
      setTerminalHistory([...newHistory, { type: 'prompt', content: '' }]);
      return;
    }

    if (commands[cmd]) {
      const output = commands[cmd].action();
      if (output === 'CLEAR') {
        setTerminalHistory([]);
      } else {
        const outputLines = output.map(line => ({ type: 'output', content: line }));
        setTerminalHistory([...newHistory, ...outputLines]);
      }
    } else {
      setTerminalHistory([...newHistory, { 
        type: 'error', 
        content: `Command not found: ${command}. Type 'help' for available commands.` 
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
    setIsInputFocused(true);
  };

  const DataCell = ({ label, value, valueColor = "text-white", onClick }) => (
    <div 
      className="bg-blue-900/60 border border-cyan-400 p-5 relative cursor-pointer transition-all duration-300 hover:bg-cyan-400/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 group"
      style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
      onClick={onClick}
    >
      <div 
        className="absolute top-0 left-0 w-5 h-5 bg-cyan-400"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div className="font-mono text-xs opacity-70 mb-2">{label}</div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
    </div>
  );

  const OrbitalIcon = ({ children, delay = 0 }) => (
    <div 
      className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-cyan-400/10 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400"
      style={{ 
        animation: `spin 10s linear infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 overflow-hidden relative font-mono">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      <div 
        className="fixed w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 pointer-events-none z-50"
        style={{ animation: 'scan 3s linear infinite' }}
      />

      <div 
        className="fixed top-0 left-0 w-full h-1 z-40"
        style={{
          background: 'linear-gradient(90deg, #ff0080, #00ffff, #8000ff)',
          animation: 'pulse 2s ease-in-out infinite alternate'
        }}
      />

      <div 
        className="fixed top-8 right-8 w-15 h-15 bg-cyan-400/10 border-2 border-cyan-400 cursor-pointer transition-all duration-300 hover:bg-cyan-400/30 hover:rotate-60 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400 z-30"
        style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}
      />

      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 flex flex-col gap-8 z-20">
        <OrbitalIcon delay={0}>⚡</OrbitalIcon>
        <OrbitalIcon delay={2.5}>🔮</OrbitalIcon>
        <OrbitalIcon delay={5}>🛸</OrbitalIcon>
        <OrbitalIcon delay={7.5}>⚙️</OrbitalIcon>
      </div>

      <div className="relative z-10 pt-20 pb-10 px-5">
        <div className="max-w-6xl mx-auto">
          <div 
            className="bg-blue-900/80 border-2 border-cyan-400 p-10 relative backdrop-blur-lg shadow-2xl shadow-cyan-400/20"
            style={{ 
              borderRadius: '0 20px 0 20px',
              boxShadow: 'inset 0 0 50px rgba(0, 255, 255, 0.1), 0 0 50px rgba(0, 255, 255, 0.2)'
            }}
          >
            <div 
              className="absolute inset-0 -m-0.5 rounded-none opacity-75 -z-10"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff0080, #8000ff, #00ffff)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 3s ease infinite',
                borderRadius: '0 20px 0 20px'
              }}
            />

            <h1 
              className={`text-5xl md:text-6xl font-black text-center mb-8 transition-all duration-100 ${
                isGlitching ? 'transform translate-x-1 translate-y-1' : ''
              }`}
              style={{ 
                textShadow: '0 0 20px #00ffff',
                fontFamily: 'Orbitron, monospace'
              }}
            >
              NOAH IVYL'S LAB
              {isGlitching && (
                <span 
                  className="absolute inset-0 text-pink-500 opacity-50 -z-10"
                  style={{ transform: 'translate(2px, -1px)' }}
                >
                  NOAH IVYL'S LAB
                </span>
              )}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <DataCell 
                label="ACTIVE_RESEARCH" 
                value="4 PAPERS"
                onClick={() => setTemp(70 + Math.random() * 10)}
              />
              <DataCell 
                label="SYNTH_MODULES" 
                value="7 UNITS" 
                valueColor="text-green-400"
              />
              <DataCell 
                label="CODE_PROJECTS" 
                value={`${Math.floor(power)}+`}
                onClick={() => setPower(95 + Math.random() * 5)}
              />
              <DataCell 
                label="FREQ_RANGE" 
                value={`${flux.toFixed(1)} kHz`}
                onClick={() => setFlux(1.2 + Math.random() * 0.1)}
              />
            </div>

            <div 
              className="bg-black/80 border-2 border-green-400 rounded-lg p-5 relative font-mono cursor-text"
              onClick={handleTerminalClick}
            >
              <div className="absolute top-3 left-4 text-pink-500 text-xl">●●●</div>
              <div 
                ref={terminalRef}
                className="mt-6 text-green-400 space-y-1 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-green-400"
              >
                {terminalHistory.map((line, index) => (
                  <div key={index} className={`${
                    line.type === 'input' ? 'text-cyan-400' :
                    line.type === 'error' ? 'text-red-400' :
                    'text-green-400'
                  }`}>
                    {line.content}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-3">user@lab-IV:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="bg-transparent border-none outline-none text-green-400 font-mono flex-1"
                    placeholder="Type 'help' for commands..."
                    autoComplete="off"
                  />
                  <div 
                    className={`w-2 h-5 bg-green-400 ml-1 ${
                      isInputFocused ? 'animate-pulse' : ''
                    }`}
                    style={{ animation: 'blink 1s infinite' }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="font-mono text-sm opacity-70">
                &gt;&gt; ENTERING THE INTERSECTION OF MATH & MUSIC &lt;&lt;
              </p>
              <p className="font-mono text-xs opacity-50 mt-2">
                Interactive terminal active - Type 'help' to begin exploration
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100vh; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-track-black {
          scrollbar-color: #22c55e #000000;
        }
      `}</style>
    </div>
  );
};

const Port = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div>
      <div className="hidden md:block">
        {showIntro && <Intro onComplete={handleIntroComplete} />}
        {!showIntro && <LabshipUI />}
      </div>
      
      <div className="block md:hidden">
        <ContactCard />
      </div>
    </div>
  );
};

export default Port;
