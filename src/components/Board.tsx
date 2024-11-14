import React from 'react';
import { Square } from './Square';
import { motion } from 'framer-motion';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

export function Board({ squares, onClick, winningLine }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinning={winningLine?.includes(i)}
        />
      ))}
    </div>
  );
}