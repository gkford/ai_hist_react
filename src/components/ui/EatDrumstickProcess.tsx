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
    const transformX = 50; // Center of component
    const endX = 150; // End position (percentage of container width)
    const spacing = 10; // Space between particles
    
    // Create initial particles from inbound items with spacing
    const initialParticles = inbound.map((content, index) => ({
      id: Date.now() + index,
      x: startX - (index * spacing), // Space out the particles
      content,
      isOutput: false
    }));
    
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => {
        // Find middle particle's position (for inbound particles)
        const inboundParticles = prev.filter(p => !p.isOutput);
        const middleIndex = Math.floor(inbound.length / 2);
        const middleParticle = inboundParticles[middleIndex];

        // If middle particle reaches center, transform all particles
        if (middleParticle && !prev.some(p => p.isOutput) && middleParticle.x >= transformX) {
          // Create new outbound particles at center
          return outbound.map((content, index) => ({
            id: Date.now() + index,
            x: transformX + (index * spacing), // Space out from center
            content,
            isOutput: true
          }));
        }

        // Normal movement
        return prev.map(particle => ({
          ...particle,
          x: particle.x + 2 // Move 2% per frame
        })).filter(particle => particle.x <= endX); // Remove when off screen
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
      triggerProcessAnimation(['⚡', '⚡', '⚡'], ['🍗', '🍗', '🍗']);
    }
  }, [workerCount]);

  return (
    <div className={cn(
      "h-24",
      "border-y border-gray-100",
      "flex items-center justify-center",
      "bg-white",
      "px-4",
      "relative"
    )}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white" />
        
        {/* Render particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${particle.x}%`,
              transition: 'left 50ms linear',
              fontSize: '1.2rem',
              zIndex: 1
            }}
          >
            {particle.content}
          </div>
        ))}

        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            left: '32%',
            right: '32%',
            zIndex: 2
          }}
        />
      </div>
    </div>
  );
}
