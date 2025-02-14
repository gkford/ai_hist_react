import type { DiscoveryState } from "@/store/useCardsStore";

interface DiscoveryViewerProps {
  discoveryState: DiscoveryState;
  cardId: string;
}

export function DiscoveryViewer({ discoveryState, cardId }: DiscoveryViewerProps) {
  return (
    <div className="p-2 border-t border-gray-200">
      Discovery Viewer
    </div>
  );
}
