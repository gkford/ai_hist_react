import { useEffect, useState, useRef } from "react"
import { useResource } from "@/store/useResourceStore"

export function FallingFood() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [drumsticks, setDrumsticks] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  const [counter, setCounter] = useState(0)
  const food = useResource('food')

  // Update drumsticks based on food amount every second
  useEffect(() => {
    const interval = setInterval(() => {
      const currentFood = Math.floor(food.amount);
      const currentDrumsticks = drumsticks.length;
      
      if (currentFood > currentDrumsticks) {
        // Need to add drumsticks
        setDrumsticks(prev => {
          const width = containerRef.current?.clientWidth || 400;
          const newDrumsticks = Array.from({ length: currentFood - currentDrumsticks }).map((_, i) => {
            const randomX = Math.floor(Math.random() * width);
            return { id: counter + i, x: randomX, y: 0, vx: 0, vy: 0 };
          });
          setCounter(prev => prev + (currentFood - currentDrumsticks));
          return [...prev, ...newDrumsticks];
        });
      } else if (currentFood < currentDrumsticks) {
        // Remove drumsticks one at a time
        setDrumsticks(prev => {
          const sorted = [...prev].sort((a, b) => {
            const yDiff = a.y - b.y;
            if (Math.abs(yDiff) > 1) return yDiff;
            return Math.abs(a.vy) - Math.abs(b.vy);
          });
          // Remove only one drumstick at a time
          return sorted.slice(0, Math.max(currentDrumsticks - 1, currentFood));
        });
      }
    }, 100); // Changed interval to 100ms for smoother removal
    return () => clearInterval(interval);
  }, [food.amount, drumsticks.length, counter]);

  // Moves the drumsticks downward with physics including horizontal movement
  useEffect(() => {
    // Gravity strength - Lower this value to make drumsticks fall more slowly
    const g = 0.3; 
    // Bounciness on collision - Lower this value to reduce bounce
    const restitution = 0.1;
    const drumWidth = 16;
    const drumHeight = 16;
    const moveInterval = setInterval(() => {
      setDrumsticks(prev => {
        const containerHeight = containerRef.current?.clientHeight || 192;
        const containerWidth = containerRef.current?.clientWidth || 400;
        let newDrumsticks = prev.map(d => ({ ...d }));
        // apply gravity and update positions including horizontal movement
        newDrumsticks.forEach(d => {
          d.vy += g;
          d.y += d.vy;
          d.x += d.vx;
        });
        // handle collisions between drumsticks
        // Apply friction to horizontal movement
        newDrumsticks.forEach(d => {
          d.vx *= 0.98; // Add slight friction to horizontal movement
        });

        // Handle collisions between drumsticks with improved settling
        for (let i = 0; i < newDrumsticks.length; i++) {
          for (let j = i + 1; j < newDrumsticks.length; j++) {
            let a = newDrumsticks[i];
            let b = newDrumsticks[j];
            if (a.x < b.x + drumWidth && a.x + drumWidth > b.x &&
                a.y < b.y + drumHeight && a.y + drumHeight > b.y) {
              if (a.y < b.y) {
                // Stack more cleanly by adjusting position and velocity
                a.y = b.y - drumHeight;
                a.vy = -a.vy * restitution;
                a.vx *= 0.5; // Reduce horizontal velocity on collision
                const dx = (a.x + drumWidth/2) - (b.x + drumWidth/2);
                a.x += (dx < 0 ? -0.5 : 0.5) * Math.abs(dx) * 0.1; // Small nudge
              } else {
                b.y = a.y - drumHeight;
                b.vy = -b.vy * restitution;
                b.vx *= 0.5; // Reduce horizontal velocity on collision
                const dx = (b.x + drumWidth/2) - (a.x + drumWidth/2);
                b.x += (dx < 0 ? -0.5 : 0.5) * Math.abs(dx) * 0.1; // Small nudge
              }
            }
          }
        }
        // handle collision with container floor
        newDrumsticks.forEach(d => {
          if (d.y + drumHeight > containerHeight - 4) { // subtract 4px to account for emoji rendering
            d.y = containerHeight - drumHeight - 4;
            // Threshold for stopping bounce - Lower this value to make drumsticks settle faster
            if (Math.abs(d.vy) < 0.5) {
              d.vy = 0;
            } else {
              d.vy = -d.vy * restitution;
            }
            d.vx *= 0.8;
          }
        });
        // handle collision with container walls
        newDrumsticks.forEach(d => {
          if (d.x < 0) {
            d.x = 0;
            d.vx = -d.vx * restitution;
          } else if (d.x + drumWidth > containerWidth) {
            d.x = containerWidth - drumWidth;
            d.vx = -d.vx * restitution;
          }
        });
        return newDrumsticks;
      });
    }, 100);
    return () => clearInterval(moveInterval);
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-48 border border-gray-300 overflow-hidden">
      {drumsticks.map(({ id, x, y }) => (
        <div
          key={id}
          className="absolute"
          style={{
            left: x,
            top: y,
            transition: "top 0.1s linear"
          }}
        >
          🍗
        </div>
      ))}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        {Math.floor(food.amount)}
      </div>
    </div>
  )
}
