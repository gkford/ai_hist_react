import * as React from "react";

interface WorkerBarProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function WorkerBar({ value, onChange, min = 0, max = 10 }: WorkerBarProps) {
  const [hovered, setHovered] = React.useState(false);

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
        onClick={handleDecrease}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="text-lg font-medium">-</span>
      </button>
      
      <div className="flex-1 flex gap-1">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center"
          >
            {i < value && (
              <div className="w-4 h-4 bg-blue-500 rounded-sm" />
            )}
          </div>
        ))}
      </div>

      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
        onClick={handleIncrease}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
}
