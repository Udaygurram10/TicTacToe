import React from 'react';
import { motion } from 'framer-motion';
import { X, Circle } from 'lucide-react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
}

export function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      className={`w-24 h-24 md:w-28 md:h-28 rounded-xl flex items-center justify-center 
        ${isWinning 
          ? 'bg-green-500 text-white' 
          : 'bg-white hover:bg-gray-50'} 
        shadow-md transition-colors duration-200`}
      onClick={onClick}
    >
      {value && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-12 h-12 md:w-16 md:h-16"
        >
          {value === 'X' ? (
            <X className="w-full h-full text-blue-500" strokeWidth={2.5} />
          ) : (
            <Circle className="w-full h-full text-red-500" strokeWidth={2.5} />
          )}
        </motion.div>
      )}
    </motion.button>
  );
}