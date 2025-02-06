import React, { useEffect, useState, useRef } from "react"

interface FallingFoodProps {
  rate: number
}

export function FallingFood({ rate }: FallingFoodProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [drumsticks, setDrumsticks] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [counter, setCounter] = useState(0)

  // Spawns "rate" drumsticks each second at random x-positions along the top
  useEffect(() => {
    const interval = setInterval(() => {
      if (rate > 0) {
        setDrumsticks((prev) => {
          const width = containerRef.current?.clientWidth || 400
          const newDrumsticks = Array.from({ length: rate }).map((_, i) => {
            const randomX = Math.floor(Math.random() * width)
            return { id: counter + i, x: randomX, y: 0 }
          })
          return [...prev, ...newDrumsticks]
        })
        setCounter((prev) => prev + rate)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [rate, counter])

  // Moves the drumsticks downward and lets them sit at the bottom
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setDrumsticks((prev) =>
        prev.map((d) => {
          const height = containerRef.current?.clientHeight || 192
          const newY = d.y + 5
          if (newY + 16 >= height) {
            return { ...d, y: height - 16 }
          }
          return { ...d, y: newY }
        })
      )
    }, 100)
    return () => clearInterval(moveInterval)
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
