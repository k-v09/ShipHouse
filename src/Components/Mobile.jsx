import React, { useState, useEffect } from 'react';

const ContactCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-5 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full animate-pulse`}
            style={{
              width: Math.random() > 0.5 ? '2px' : '1px',
              height: Math.random() > 0.5 ? '2px' : '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent ${scanLine}%, rgba(0, 255, 255, 0.1) ${scanLine + 1}%, transparent ${scanLine + 2}%)`
        }}
      />

      <div className={`
        relative max-w-sm w-full bg-slate-800/90 backdrop-blur-md
        border-2 border-cyan-400 shadow-2xl shadow-cyan-400/20
        transition-all duration-1000 ease-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
      `}>
        
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1"></div>
        
        <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 border-b border-cyan-400/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">ONLINE</span>
          </div>
          <div className="text-xs text-cyan-400 font-mono">CONTACT.EXE</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/30">
              <span className="text-2xl font-bold text-white">NS</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Noah Sehman</h1>
            <p className="text-cyan-400 text-sm font-mono">FULL_TIME_NERD</p>
          </div>

          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-cyan-400/30 rounded p-4 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-cyan-400 font-mono">&gt;</span> For the full interactive experience, 
              <span className="text-cyan-400"> dock with a desktop terminal</span>
            </p>
          </div>

          <div className="space-y-3">
            <a 
              href="tel:+14803385997" 
              className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-cyan-400/50 rounded transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center group-hover:bg-green-500/30">
                <span className="text-green-400 text-sm">📞</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-mono">COMM_LINK</div>
                <div className="text-white font-mono">+1 (480) 338-5997</div>
              </div>
            </a>

            <a 
              href="mailto:noah.sehman@gmail.com" 
              className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-cyan-400/50 rounded transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center group-hover:bg-blue-500/30">
                <span className="text-blue-400 text-sm">📧</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-mono">EMAIL_PROTOCOL</div>
                <div className="text-white font-mono">noah.sehman@gmail.com</div>
              </div>
            </a>

            <a 
              href="https://www.linkedin.com/in/noah-sehman-1a6494258/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-cyan-400/50 rounded transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center group-hover:bg-blue-600/30">
                <span className="text-blue-300 text-sm">💼</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-mono">LINKEDIN_NET</div>
                <div className="text-white font-mono">/in/noah-sehman</div>
              </div>
            </a>

            <a 
              href="https://github.com/k-v09" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-cyan-400/50 rounded transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gray-500/20 rounded flex items-center justify-center group-hover:bg-gray-500/30">
                <span className="text-gray-300 text-sm">⚡</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-mono">CODE_REPOSITORY</div>
                <div className="text-white font-mono">github.com/k-v09</div>
              </div>
            </a>
          </div>

          <div className="text-center pt-4 border-t border-slate-600">
            <p className="text-xs text-gray-400 font-mono">
              <span className="text-cyan-400">&gt;</span> SYSTEM_STATUS: READY_FOR_CONTACT
            </p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
      </div>
    </div>
  );
};

export default ContactCard;
