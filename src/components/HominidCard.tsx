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
    <div className="flex items-center justify-center w-full h-16">
      <PopulationProgress />
    </div>
  );

  return (
    <MasterCard imageSrc={props.imageSrc} header={header}>
      {containerContent}
    </MasterCard>
  );
}
