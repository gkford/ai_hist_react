import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ProcessParticle {
  id: number;
  x: number;
  content: string;
  isOutput: boolean;
}

interface EatDrumstickProcessProps {
  workerCount: number;
}

export function EatDrumstickProcess({ workerCount }: EatDrumstickProcessProps) {
  const [particles, setParticles] = useState<ProcessParticle[]>([]);

  const triggerProcessAnimation = (inbound: string[], outbound: string[]) => {
    const startX = -50; // Start position off-screen left
    const transformX = 32; // Position where transformation occurs (matches grey box left edge)
    const endX = 100; // End position (percentage of container width)
    
    // Create initial particles from inbound items
    const initialParticles = inbound.map((content, index) => ({
      id: Date.now() + index,
      x: startX,
      content,
      isOutput: false
    }));
    
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => {
        return prev.map(particle => {
          const newX = particle.x + 2; // Move 2% per frame
          
          // Transform particles when they reach the grey box
          if (!particle.isOutput && newX >= transformX) {
            const outputIndex = prev.filter(p => p.isOutput).length;
            return {
              ...particle,
              content: outbound[outputIndex] || '',
              isOutput: true
            };
          }
          
          return {
            ...particle,
            x: newX
          };
        }).filter(particle => particle.x <= endX); // Remove particles that are off-screen right
      });
    }, 50);

    // Cleanup interval when all particles are gone
    const cleanup = setInterval(() => {
      setParticles(prev => {
        if (prev.length === 0) {
          clearInterval(interval);
          clearInterval(cleanup);
        }
        return prev;
      });
    }, 100);
  };

  // Example usage triggered by worker count changes
  useEffect(() => {
    if (workerCount > 0) {
      triggerProcessAnimation(['⚡'], ['🍗']);
    }
  }, [workerCount]);

  return (
    <div className={cn(
      "h-24",
      "border-y border-gray-100",
      "flex items-center justify-center",
      "bg-white",
      "px-4",
      "relative" // Added for absolute positioning of particles
    )}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            left: '32%',
            right: '32%'
          }}
        />
        {/* Render particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${particle.x}%`,
              transition: 'left 50ms linear',
              fontSize: '1.2rem'
            }}
          >
            {particle.content}
          </div>
        ))}
      </div>
    </div>
  );
}
