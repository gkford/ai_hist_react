import { RTState } from "@/store/useCardsStore";

interface RTViewerProps {
  rtState: RTState;
}

export function RTViewer({ rtState }: RTViewerProps) {
  const timeLeft = rtState.last_process_time 
    ? Math.max(0, (rtState.last_process_time + rtState.delay_time.total_ms) - Date.now())
    : 0;
    
  const progress = timeLeft > 0 
    ? ((rtState.delay_time.total_ms - timeLeft) / rtState.delay_time.total_ms) * 100
    : 100;

  return (
    <div className="p-2 border-t border-gray-200">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium mb-1">Paid</h4>
          {Object.entries(rtState.inbound_paid).map(([resource, amount]) => (
            <div key={resource} className="text-sm">
              {resource}: {(amount as number).toFixed(2)}
            </div>
          ))}
        </div>
        <div className="flex-1 text-right">
          <h4 className="text-sm font-medium mb-1">Owed</h4>
          {Object.entries(rtState.outbound_owed).map(([resource, amount]) => (
            <div key={resource} className="text-sm">
              {resource}: {(amount as number).toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
