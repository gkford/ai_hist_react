import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function PopulationProgress() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden border border-gray-200">
      <div className="flex items-center space-x-1 text-xs p-2">
        <span>👥</span>
        <span>:</span>
        <span>5</span>
      </div>
      <div className="flex items-center space-x-2 flex-1">
        <span className="p-1 m-1">👶</span>
        <Progress value={50} className="h-2 flex-1" />
      </div>
    </div>
  );
}
