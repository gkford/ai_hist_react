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
}> = ({ row, col, cardInCell }) => {
  return (
    <div style={{
      width: 140,
      height: 80,
      border: '2px dotted #777',
      borderRadius: '6px',
      margin: '8px 160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px'
    }}>
      {cardInCell ? (<DraggableCard row={row} col={col} card={cardInCell} />) : null}
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
  const canvasRef = useRef<HTMLDivElement | null>(null);
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number; from: string; fromRow?: number; fromCol?: number }, monitor) => {
      if (!canvasRef.current) return;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const dropX = clientOffset.x - canvasRect.left;
      const dropY = clientOffset.y - canvasRect.top;
      
      if (dropY < 300) {
        const cellWidth = 1200 / 3;
        const cellHeight = 300 / 3;
        const row = Math.floor(dropY / cellHeight);
        const col = Math.floor(dropX / cellWidth);
        
        if (item.from === 'available') {
          const card = cards.find(c => c.id === item.id);
          if (!card) return;
          setBoard(prev => {
            const newBoard = prev.map(r => r.slice());
            newBoard[row][col] = card;
            return newBoard;
          });
          setCards(prev => prev.filter(c => c.id !== item.id));
        } else if (item.from === 'board') {
          setBoard(prev => {
            const newBoard = prev.map(r => r.slice());
            for (let r = 0; r < newBoard.length; r++) {
              for (let c = 0; c < newBoard[r].length; c++) {
                if (newBoard[r][c]?.id === item.id) {
                  newBoard[r][c] = null;
                }
              }
            }
            const card = board.flat().find(c => c?.id === item.id) || cards.find(c => c.id === item.id);
            if (card) {
              newBoard[row][col] = card;
            }
            return newBoard;
          });
        }
      } else {
        if (item.from === 'board') {
          setBoard(prev => {
            const newBoard = prev.map(r => r.slice());
            for (let r = 0; r < newBoard.length; r++) {
              for (let c = 0; c < newBoard[r].length; c++) {
                if (newBoard[r][c]?.id === item.id) {
                  newBoard[r][c] = null;
                }
              }
            }
            return newBoard;
          });
          const card = board.flat().find(c => c?.id === item.id) || cards.find(c => c.id === item.id);
          if (card) {
            setCards(prev => [...prev, { ...card, x: dropX, y: dropY }]);
          }
        } else {
          setCards(prev => prev.map(c => c.id === item.id ? { ...c, x: dropX, y: dropY } : c));
        }
      }
    }
  }));

  const [cards, setCards] = useState<CardData[]>([
    { id: 1, emoji: '😃', x: 40, y: 320 },
    { id: 2, emoji: '🚀', x: 240, y: 320 },
    { id: 3, emoji: '🌟', x: 440, y: 320 },
    { id: 4, emoji: '⚡➡️🍗', x: 640, y: 320 },
    { id: 5, emoji: '🍗➡️⚡', x: 840, y: 320 },
    { id: 6, emoji: '!⚡', x: 1040, y: 320 },
  ]);




    return (
      <div
        ref={(node) => {
          drop(node);
          // Safe way to update the ref
          canvasRef.current = node;
        }}
        style={{ 
          position: 'relative', 
          width: '1200px',
          height: 500, 
          margin: '50px auto',
          border: '2px solid #ccc' 
        }}
      >
        {/* Board region: top 300px */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 300, borderBottom: '2px solid #000' }}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((cell, colIndex) => (
                <BoardCell
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  cardInCell={cell}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Available Cards: rendered as absolute items */}
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onMove={() => {}}
          />
        ))}
      </div>
  );
};

export default Apptwo;
