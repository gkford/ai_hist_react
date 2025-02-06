import React, { useEffect, useState, useRef } from "react"

interface FallingFoodProps {
  rate: number
}

export function FallingFood({ rate }: FallingFoodProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [drumsticks, setDrumsticks] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  const [counter, setCounter] = useState(0)

  // Spawns "rate" drumsticks each second at random x-positions along the top
  useEffect(() => {
    const interval = setInterval(() => {
      if (rate > 0) {
        setDrumsticks((prev) => {
          const width = containerRef.current?.clientWidth || 400
          const newDrumsticks = Array.from({ length: rate }).map((_, i) => {
            const randomX = Math.floor(Math.random() * width)
            return { id: counter + i, x: randomX, y: 0, vx: 0, vy: 0 }
          })
          return [...prev, ...newDrumsticks]
        })
        setCounter((prev) => prev + rate)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [rate, counter])

  // Moves the drumsticks downward with physics including horizontal movement
  useEffect(() => {
    const g = 1.0;
    const restitution = 0.5;
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
        for (let i = 0; i < newDrumsticks.length; i++) {
          for (let j = i + 1; j < newDrumsticks.length; j++) {
            let a = newDrumsticks[i];
            let b = newDrumsticks[j];
            if (a.x < b.x + drumWidth && a.x + drumWidth > b.x &&
                a.y < b.y + drumHeight && a.y + drumHeight > b.y) {
              if (a.y < b.y) {
                a.y = b.y - drumHeight;
                a.vy = -a.vy * restitution;
                const dx = (a.x + drumWidth/2) - (b.x + drumWidth/2);
                a.vx += (dx < 0 ? -1 : 1) * (Math.random() * 2 + 1);
              } else {
                b.y = a.y - drumHeight;
                b.vy = -b.vy * restitution;
                const dx = (b.x + drumWidth/2) - (a.x + drumWidth/2);
                b.vx += (dx < 0 ? -1 : 1) * (Math.random() * 2 + 1);
              }
            }
          }
        }
        // handle collision with container floor
        newDrumsticks.forEach(d => {
          if (d.y + drumHeight >= containerHeight) {
            d.y = containerHeight - drumHeight;
            if (Math.abs(d.vy) < 1) {
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
    </div>
  )
}
