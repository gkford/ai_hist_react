import * as React from "react";
import { MasterCard } from "./MasterCard";
import { PopulationProgress } from "./PopulationProgress";

export function HominidCard(props: { imageSrc?: string }) {
  const header = (
    <div className="flex items-center justify-between p-4">
      <h3 className="text-xl font-semibold">Hominid</h3>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">👤</div>
    </div>
  );

  const containerContent = (
    <div className="h-16 rounded-lg border border-t border-b border-gray-200 flex flex-col ml-2 mr-2 my-1">
      <PopulationProgress />
    </div>
  );

  return (
    <MasterCard imageSrc={props.imageSrc} header={header}>
      {containerContent}
    </MasterCard>
  );
}
