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
      margin: '8px',
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
  const canvasRef = useRef<HTMLDivElement>(null);
  
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
        const cellWidth = 600 / 3;
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
    { id: 1, emoji: '😃', x: 20, y: 20 },
    { id: 2, emoji: '🚀', x: 120, y: 20 },
    { id: 3, emoji: '🌟', x: 220, y: 20 },
    { id: 4, emoji: '⚡➡️🍗', x: 320, y: 20 },
    { id: 5, emoji: '🍗➡️⚡', x: 420, y: 20 },
    { id: 6, emoji: '!⚡', x: 520, y: 20 },
  ]);


  // 7. The bottom “available cards” section itself can be a large drop target
  //    so that cards can be re-dropped anywhere in the bottom area (to reposition).
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number, from: string, fromRow?: number, fromCol?: number }, monitor) => {
      if (item.from === 'board') {
        const clientOffset = monitor.getClientOffset();
        const initialClientOffset = monitor.getInitialClientOffset();
        if (!clientOffset || !initialClientOffset || !availableRef.current) return;

        const containerRect = availableRef.current.getBoundingClientRect();
        const dropX = clientOffset.x - containerRect.left;
        const dropY = clientOffset.y - containerRect.top;

        let foundCard: CardData | undefined;
        setBoard(prev => {
          const newBoard = prev.map(row => row.slice());
          for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[i].length; j++) {
              if (newBoard[i][j]?.id === item.id) {
                foundCard = newBoard[i][j]!;
                newBoard[i][j] = null;
              }
            }
          }
          return newBoard;
        });

        if (foundCard) {
          const newCard: CardData = {
            id: foundCard.id,
            emoji: foundCard.emoji,
            x: dropX,
            y: dropY
          };
          setCards(prev => [...prev, newCard]);
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
          ref={drop}
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
