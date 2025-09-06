import React, { useState, useEffect, useMemo } from 'react';

const Intro = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('cockpit');
  const [terminalText, setTerminalText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    '> RESEARCH LAB SYSTEM v3.7.2',
    '> Initializing digital pathways',
    '> Connecting to deep space network',
    '> Biometric scan: AUTHENTICATED',
    '> Welcome, Commander',
    '> Launching research interface',
  ];

  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 2
    }));
  }, []);

  const dustParticles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: Math.random() * 1 + 0.5
    }));
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('zooming');
    }, 1000);
    const timer2 = setTimeout(() => {
      setAnimationPhase('terminal');
    }, 4000);
    const timer3 = setTimeout(() => {
      let currentLine = 0;
      let currentChar = 0;
      const typeInterval = setInterval(() => {
        if (currentLine < terminalLines.length) {
          if (currentChar <= terminalLines[currentLine].length) {
            setTerminalText(prev => {
              const lines = prev.split('\n');
              lines[currentLine] = terminalLines[currentLine].substring(0, currentChar);
              return lines.join('\n');
            });
            currentChar++;
          } else {
            currentLine++;
            currentChar = 0;
            setTerminalText(prev => prev + '\n');
          }
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 1000);
        }
      }, 30);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black overflow-hidden transition-opacity duration-1000 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute bg-white rounded-full ${
              animationPhase === 'zooming' ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      <div className={`absolute inset-0 transition-all duration-[4000ms] ease-in-out ${
        animationPhase === 'zooming' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <div className="absolute inset-8 border-4 border-gray-600 rounded-lg bg-gradient-to-b from-gray-800/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-gray-800 border-t-2 border-cyan-500">
            <div className="flex justify-center items-center h-full space-x-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${
                  i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-green-500' : 'bg-blue-500'
                } animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 bottom-32 w-24 bg-gradient-to-r from-gray-900 to-gray-800 border-r-2 border-cyan-500">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-4 bg-cyan-400/30 m-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-32 w-24 bg-gradient-to-l from-gray-900 to-gray-800 border-l-2 border-cyan-500">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-4 bg-cyan-400/30 m-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>

      <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[4000ms] ease-in-out ${
        animationPhase === 'cockpit' ? 'w-64 h-40 scale-50' :
        animationPhase === 'zooming' ? 'w-96 h-64 scale-100' :
        'w-full h-full scale-100'
      }`}>
        <div className={`w-full h-full bg-black border-4 border-cyan-500 rounded-lg shadow-2xl shadow-cyan-500/50 ${
          animationPhase === 'terminal' ? 'shadow-cyan-500/80' : ''
        } transition-all duration-1000`}>
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg">
            <div className="w-full h-full bg-black rounded border border-cyan-300/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent bg-repeat-y animate-pulse"
                style={{ backgroundSize: '100% 4px' }} />
              
              {animationPhase === 'terminal' && (
                <div className="p-4 h-full font-mono text-green-400 text-sm leading-relaxed">
                  <div className="mb-4 text-cyan-400 text-xl font-bold tracking-wider">
                    ╔═══════════════════════════╗
                    <br />
                    ║    IVY'S RESEARCH LABORATORY    ║
                    <br />
                    ╚═══════════════════════════╝
                  </div>

                  <div className="space-y-1">
                    {terminalText.split('\n').map((line, i) => (
                      <div key={i} className="flex items-center">
                        <span className="text-cyan-400 mr-2">█</span>
                        <span>{line}</span>
                        {i === terminalText.split('\n').length - 1 && (
                          <span className="ml-1 animate-pulse bg-green-400 w-2 h-4 inline-block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {animationPhase !== 'terminal' && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-cyan-400 text-center">
                    <div className="text-6xl mb-4 animate-spin">⟲</div>
                    <div className="text-xl tracking-widest animate-pulse">INITIALIZING...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {animationPhase === 'zooming' && (
        <div className="absolute inset-0">
          {dustParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Intro;
