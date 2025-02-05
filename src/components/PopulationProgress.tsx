import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function PopulationProgress() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden border border-gray-200 m-2">
      <div className="flex items-center space-x-2 flex-1">
        <span className="m-2">👶</span>
        <Progress 
          value={50} 
          className="h-2 flex-1 bg-blue-100" 
          barClassName="bg-blue-300"
        />
      </div>
    </div>
  );
}
