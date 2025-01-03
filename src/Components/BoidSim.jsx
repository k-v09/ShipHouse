import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Settings, Pause, Play } from 'lucide-react';

class Boid {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  update(width, height) {
    this.x = (this.x + this.dx + width) % width;
    this.y = (this.y + this.dy + height) % height;
  }
}

const BoidSimulation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [boids, setBoids] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [settings, setSettings] = useState({
    cohesion: 0.005,
    separation: 0.05,
    alignment: 0.05,
    numBoids: 50,
  });
  const [showSettings, setShowSettings] = useState(false);

  // Handle resize
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = Math.min(containerWidth * 0.75, window.innerHeight * 0.6);
      
      setDimensions({
        width: containerWidth,
        height: containerHeight
      });
      const canvas = canvasRef.current;
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    };
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const initializeBoids = () => {
      const initialBoids = Array.from({ length: settings.numBoids }, () => {
        return new Boid(
          Math.random() * dimensions.width,
          Math.random() * dimensions.height,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
      });
      setBoids(initialBoids);
    };

    initializeBoids();
  }, [dimensions.width, dimensions.height]);
  useEffect(() => {
    if (boids.length === settings.numBoids) return;
    
    const initialBoids = Array.from({ length: settings.numBoids }, () => {
      return new Boid(
        Math.random() * dimensions.width,
        Math.random() * dimensions.height,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
    });
    setBoids(initialBoids);
  }, [settings.numBoids, dimensions.width, dimensions.height]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const newBoids = boids.map(boid => {
        const newBoid = new Boid(boid.x, boid.y, boid.dx, boid.dy);
        
        let cohesionX = 0, cohesionY = 0;
        let separationX = 0, separationY = 0;
        let alignmentX = 0, alignmentY = 0;
        let neighbors = 0;

        boids.forEach(other => {
          const dx = other.x - boid.x;
          const dy = other.y - boid.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < 50) {
            cohesionX += other.x;
            cohesionY += other.y;
            separationX -= dx / distance;
            separationY -= dy / distance;
            alignmentX += other.dx;
            alignmentY += other.dy;
            neighbors++;
          }
        });

        if (neighbors > 0) {
          newBoid.dx += (cohesionX / neighbors - boid.x) * settings.cohesion;
          newBoid.dy += (cohesionY / neighbors - boid.y) * settings.cohesion;
          newBoid.dx += separationX * settings.separation;
          newBoid.dy += separationY * settings.separation;
          newBoid.dx += (alignmentX / neighbors - boid.dx) * settings.alignment;
          newBoid.dy += (alignmentY / neighbors - boid.dy) * settings.alignment;
        }

        const speed = Math.sqrt(newBoid.dx * newBoid.dx + newBoid.dy * newBoid.dy);
        if (speed > 2) {
          newBoid.dx = (newBoid.dx / speed) * 2;
          newBoid.dy = (newBoid.dy / speed) * 2;
        }

        newBoid.update(dimensions.width, dimensions.height);
        
        // Draw boid as a circle for now... just you wait for triangles ooh wow
        ctx.beginPath();
        ctx.arc(newBoid.x, newBoid.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        
        return newBoid;
      });

      setBoids(newBoids);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [boids, isPaused, settings, dimensions]);

  return (
    <Card className="w-full max-w-4xl bg-gradient-to-b from-[#1E90FF] to-[#4682B4]">
      <CardHeader className="flex justify-between items-center">
        <h4 className="text-lg font-bold">Boid Simulation</h4>
        <div className="flex gap-2">
          <Button 
            isIconOnly
            onClick={() => setIsPaused(!isPaused)}
            size="sm"
            className="bg-[#FFB347]"
          >
            {isPaused ? <Play /> : <Pause />}
          </Button>
          <Button
            isIconOnly
            onClick={() => setShowSettings(!showSettings)}
            size="sm"
            className="bg-[#FFCC33]"
          >
            <Settings />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div ref={containerRef} className="w-full">
          <canvas
            ref={canvasRef}
            className="bg-gradient-to-b from-[#FFCC33] to-[#FFB347] rounded-lg"
            style={{
              width: '100%',
              height: dimensions.height,
            }}
          />
        </div>
        
        {showSettings && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Boids ({settings.numBoids})</label>
              <Slider 
                value={settings.numBoids}
                onChange={value => setSettings(prev => ({ ...prev, numBoids: value }))}
                maxValue={100}
                minValue={1}
                step={1}
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cohesion ({settings.cohesion.toFixed(3)})</label>
              <Slider
                value={settings.cohesion}
                onChange={value => setSettings(prev => ({ ...prev, cohesion: value }))}
                step={0.001}
                maxValue={0.01}
                minValue={0}
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Separation ({settings.separation.toFixed(3)})</label>
              <Slider
                value={settings.separation}
                onChange={value => setSettings(prev => ({ ...prev, separation: value }))}
                step={0.001}
                maxValue={0.1}
                minValue={0}
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alignment ({settings.alignment.toFixed(3)})</label>
              <Slider
                value={settings.alignment}
                onChange={value => setSettings(prev => ({ ...prev, alignment: value }))}
                step={0.001}
                maxValue={0.1}
                minValue={0}
                className="max-w-md"
              />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BoidSimulation;
