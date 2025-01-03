import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";

const WavePropagation = () => {
  const [fundamentalAmplitude, setFundamentalAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [speed, setSpeed] = useState(0.3);
  const [points, setPoints] = useState([]);
  const [harmonicPoints, setHarmonicPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [showHarmonics, setShowHarmonics] = useState(true);
  const [harmonicAmplitudes, setHarmonicAmplitudes] = useState([0.5, 0.3, 0.2]);

  const numPoints = 40;
  const spacing = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02 * speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    const newPoints = [];
    const harmonics = [[], [], []];
    
    for (let i = 0; i < numPoints; i++) {
      const x = i * spacing;
      let y = 0;
      
      const fundamentalPhase = (2 * Math.PI * frequency * (x / 200 - time));
      y = fundamentalAmplitude * Math.sin(fundamentalPhase);
      
      for (let h = 0; h < 3; h++) {
        const harmonicPhase = (2 * Math.PI * frequency * (h + 2) * (x / 200 - time));
        const harmonicY = fundamentalAmplitude * harmonicAmplitudes[h] * Math.sin(harmonicPhase);
        harmonics[h].push({ x, y: harmonicY });
        if (showHarmonics) {
          y += harmonicY;
        }
      }
      
      newPoints.push({ x, y });
    }
    
    setPoints(newPoints);
    setHarmonicPoints(harmonics);
  }, [fundamentalAmplitude, frequency, time, harmonicAmplitudes, showHarmonics]);

  return (
    <Card 
      className="w-full bg-gradient-to-br from-gray-900 to-gray-800"
      radius="lg"
    >
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Wave Propagation Playground
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-8 h-64 relative rounded-lg bg-gray-900 p-4">
          <div className="absolute left-0 right-0 top-1/2 border-t border-gray-700" />
          <svg className="w-full h-full">
            {harmonicPoints.map((harmonic, index) => (
              <motion.path
                key={`harmonic-${index}`}
                d={`M ${harmonic.map(p => `${p.x},${p.y + 128}`).join(' L ')}`}
                fill="none"
                stroke={`rgba(244, 114, 182, ${0.2 * (index + 1)})`}
                strokeWidth="1"
                animate={{ d: `M ${harmonic.map(p => `${p.x},${p.y + 128}`).join(' L ')}` }}
                transition={{ duration: 0 }}
              />
            ))}
            
            <motion.path
              d={`M ${points.map(p => `${p.x},${p.y + 128}`).join(' L ')}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              animate={{ d: `M ${points.map(p => `${p.x},${p.y + 128}`).join(' L ')}` }}
              transition={{ duration: 0 }}
            />
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            
            {points.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y + 128}
                r="3"
                fill="#EC4899"
                animate={{ cx: point.x, cy: point.y + 128 }}
                transition={{ duration: 0 }}
              />
            ))}
          </svg>
        </div>

        <div className="space-y-6 text-gray-300">
          <div className="flex items-center space-x-2">
            <Switch 
              isSelected={showHarmonics}
              onValueChange={setShowHarmonics}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-purple-500"
              }}
            >
              Show Harmonics
            </Switch>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Fundamental Amplitude</label>
            <Slider 
              value={fundamentalAmplitude}
              onChange={setFundamentalAmplitude}
              min={10}
              max={100}
              step={1}
              className="max-w-md"
              classNames={{
                track: "bg-gray-700",
                filledTrack: "bg-gradient-to-r from-purple-500 to-pink-500"
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Frequency</label>
            <Slider 
              value={frequency}
              onChange={setFrequency}
              min={0.5}
              max={3}
              step={0.1}
              className="max-w-md"
              classNames={{
                track: "bg-gray-700",
                filledTrack: "bg-gradient-to-r from-purple-500 to-pink-500"
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Speed</label>
            <Slider 
              value={speed}
              onChange={setSpeed}
              min={0.1}
              max={0.5}
              step={0.05}
              className="max-w-md"
              classNames={{
                track: "bg-gray-700",
                filledTrack: "bg-gradient-to-r from-purple-500 to-pink-500"
              }}
            />
          </div>

          {[0, 1, 2].map((index) => (
            <div key={`harmonic-${index}`} className="space-y-2">
              <label className="text-sm">{`${index + 2}nd Harmonic Amplitude`}</label>
              <Slider 
                value={harmonicAmplitudes[index]}
                onChange={(value) => {
                  const newAmplitudes = [...harmonicAmplitudes];
                  newAmplitudes[index] = value;
                  setHarmonicAmplitudes(newAmplitudes);
                }}
                min={0}
                max={1}
                step={0.1}
                className="max-w-md"
                classNames={{
                  track: "bg-gray-700",
                  filledTrack: "bg-gradient-to-r from-purple-500 to-pink-500"
                }}
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default WavePropagation;
