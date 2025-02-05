import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function PopulationProgress() {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-1 text-xs">
        <span>👥</span>
        <span>:</span>
        <span>5</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>👶</span>
        <Progress value={50} className="h-2 w-full" />
      </div>
    </div>
  );
}
