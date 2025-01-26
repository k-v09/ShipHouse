import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const Support = () => {
  const launchKofi = () => {
    window.open('https://ko-fi.com/noahivyl', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-rose-400/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-pink-300" size={24} />
          <Coffee className="text-emerald-300" size={24} />
        </div>
        <p className="text-lg mb-4 text-white/90">
          Do you like happiness and dislike sadness? We have so much in common! I'd be so grateful if you'd help support me
        </p>
        <button
          onClick={launchKofi}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-emerald-500 hover:from-pink-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
        >
          <Coffee size={20} />
          <span>Support me on Ko-fi</span>
        </button>
      </div>
    </div>
  );
};

export default Support;
