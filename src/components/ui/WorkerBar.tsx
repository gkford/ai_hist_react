import { Progress } from "@/components/ui/progress";

interface WorkerBarProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function WorkerBar({ value, onChange, min = 0, max = 10 }: WorkerBarProps) {
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

  const progress = (value / max) * 100;

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
        onClick={handleDecrease}
      >
        <span className="text-lg font-medium">-</span>
      </button>
      
      <div className="flex-1">
        <Progress
          value={progress}
          className="h-8"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>

      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
        onClick={handleIncrease}
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
}
