import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// import './App.css'; // optional, if you want to separate out your CSS

// 1. Define the item type for react-dnd
const ItemTypes = {
  CARD: 'card',
};

interface CardData {
  id: number;
  emoji: string;
  // For the free-floating area, store x/y positions
  x: number;
  y: number;
}

// 2. A component for a draggable Card
const Card: React.FC<{
  card: CardData;
  onMove: (id: number, x: number, y: number) => void;
}> = ({ card, onMove: _onMove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id, from: 'available' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // We position the card absolutely within the "Available Cards" area
  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
      // For free movement, update the card's position in onMove when dropped
      // (react-dnd will handle the actual dragging logic).
    >
      {card.emoji}
    </div>
  );
};

// 3. Each cell on the board can be a drop target
const DraggableCard: React.FC<{
  row: number;
  col: number;
  card: CardData;
}> = ({ row, col, card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id, from: 'board', fromRow: row, fromCol: col },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));
  
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {card.emoji}
    </div>
  );
};

const BoardCell: React.FC<{
  row: number;
  col: number;
  cardInCell?: CardData | null;
  onDropCard: (cardId: number, row: number, col: number, oldPosition?: { row: number; col: number }) => void;
}> = ({ row, col, cardInCell, onDropCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number; from: string; fromRow?: number; fromCol?: number }) => {
      if (item.from === 'board' && typeof item.fromRow === 'number' && typeof item.fromCol === 'number') {
        onDropCard(item.id, row, col, { row: item.fromRow, col: item.fromCol });
      } else {
        onDropCard(item.id, row, col);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: 140,
        height: 80,
        border: '2px dotted #777',
        borderRadius: '6px',
        margin: '8px',
        backgroundColor: isOver ? '#eef' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
      }}
    >
      {cardInCell ? (
        <DraggableCard row={row} col={col} card={cardInCell} />
      ) : null}
    </div>
  );
};

const Apptwo: React.FC = () => {
  // 4. Track the board state. Let's store which card (if any) occupies each cell.
  //    null means the cell is empty.
  const [board, setBoard] = useState<Array<Array<CardData | null>>>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  // 5. Track the cards in the “available” section. Each has an (x,y) for absolute positioning.
  const availableRef = useRef<HTMLDivElement>(null);
  
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, emoji: '😃', x: 20, y: 20 },
    { id: 2, emoji: '🚀', x: 120, y: 20 },
    { id: 3, emoji: '🌟', x: 220, y: 20 },
    { id: 4, emoji: '⚡➡️🍗', x: 320, y: 20 },
    { id: 5, emoji: '🍗➡️⚡', x: 420, y: 20 },
    { id: 6, emoji: '!⚡', x: 520, y: 20 },
  ]);

  // 6. When a card is dropped onto a board cell
  const handleDropOnBoard = (cardId: number, row: number, col: number, oldPosition?: { row: number; col: number }) => {
    // For board-moves:
    if (oldPosition) {
      setBoard((prev) => {
        const newBoard = prev.map((r) => r.slice());
        newBoard[oldPosition.row][oldPosition.col] = null;
        newBoard[row][col] = prev[oldPosition.row][oldPosition.col];
        return newBoard;
      });
    } else {
      // Find the card data in "cards" 
      const card = cards.find((c) => c.id === cardId);
      if (!card) return;

      // Place that card in the board cell
      setBoard((prev) => {
        const newBoard = prev.map((boardRow) => boardRow.slice());
        newBoard[row][col] = card;
        return newBoard;
      });

      // Remove the card from the "available" area
      setCards((prev) => prev.filter((c) => c.id !== cardId));
    }
  };

  // 7. The bottom “available cards” section itself can be a large drop target
  //    so that cards can be re-dropped anywhere in the bottom area (to reposition).
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number, from: string, fromRow?: number, fromCol?: number }, monitor) => {
      if (item.from === 'board') {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;
        let foundCard: CardData | undefined;
        const newBoard = board.map(row => row.slice());
        for (let i = 0; i < newBoard.length; i++) {
          for (let j = 0; j < newBoard[i].length; j++) {
            if (newBoard[i][j]?.id === item.id) {
              foundCard = newBoard[i][j]!;
              newBoard[i][j] = null;
            }
          }
        }
        setBoard(newBoard);
        if (foundCard) {
          if (availableRef.current) {
            const rect = availableRef.current.getBoundingClientRect();
            const newX = clientOffset.x - rect.left;
            const newY = clientOffset.y - rect.top;
            setCards(prev => [...prev, { ...foundCard, x: newX, y: newY }]);
          } else {
            setCards(prev => [...prev, foundCard]);
          }
        }
      } else {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (!delta) return;
        setCards((prev) => {
          const cardIndex = prev.findIndex((c) => c.id === item.id);
          if (cardIndex < 0) return prev;
          const updatedCards = [...prev];
          const card = { ...updatedCards[cardIndex] };
          card.x += delta.x;
          card.y += delta.y;
          updatedCards[cardIndex] = card;
          return updatedCards;
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {/* Top: 3x3 Board */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          {/* We’ll stack 3 columns side-by-side, each containing 3 cells */}
          {board[0].map((_, colIndex) => (
            <div  
              key={colIndex}  
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                marginRight: colIndex < board[0].length - 1 ? 280 : 0 
              }}
            >
              {board.map((rowArray, rowIndex) => (
                <BoardCell
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  cardInCell={rowArray[colIndex]}
                  onDropCard={handleDropOnBoard}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom: “Available Cards” area */}
        <div
          ref={(node) => {
            drop(node);
            availableRef.current = node;
          }}
          style={{
            position: 'relative',
            width: 600,
            height: 200,
            border: '2px solid #ddd',
            marginTop: 30,
            backgroundColor: '#f0f0f0',
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onMove={(_id, _x, _y) => {
                // intentionally left empty
              }}
            />
          ))}
        </div>
      </div>
  );
};

export default Apptwo;
