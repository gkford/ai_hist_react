import { RTState } from "@/store/useCardsStore";
import { ResourceKey } from "@/store/useResourceStore";

interface RTViewerProps {
  rtState: RTState;
}

export function RTViewer({ rtState }: RTViewerProps) {
  return (
    <div className="flex justify-between p-2 border-t border-gray-200">
      <div className="flex-1">
        <h4 className="text-sm font-medium mb-1">Input</h4>
        {Object.entries(rtState.inbound_paid).map(([resource, amount]) => (
          <div key={resource} className="text-sm">
            {resource}: {amount.toFixed(2)}
          </div>
        ))}
      </div>
      <div className="flex-1 text-right">
        <h4 className="text-sm font-medium mb-1">Output</h4>
        {Object.entries(rtState.outbound_owed).map(([resource, amount]) => (
          <div key={resource} className="text-sm">
            {resource}: {amount.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}
