import { RTState } from "@/store/useCardsStore";

interface RTViewerProps {
  rtState: RTState;
  cardId: string;
  rtId: string;
}

export function RTViewer({ rtState, cardId, rtId }: RTViewerProps) {
  return (
    <div className="p-2 border-t border-gray-200">
      rtviewer component
    </div>
  );
}
