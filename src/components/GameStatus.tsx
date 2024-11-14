import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Bot, Loader2 } from 'lucide-react';

interface GameStatusProps {
  winner: string | null;
  xIsNext: boolean;
  onRestart: () => void;
  vsBot?: boolean;
  isProcessing?: boolean;
}

export function GameStatus({ winner, xIsNext, onRestart, vsBot, isProcessing }: GameStatusProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <span className="text-2xl md:text-3xl font-bold text-gray-800">
          {winner
            ? `Winner: ${winner}`
            : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </span>
        {vsBot && !winner && !xIsNext && (
          isProcessing ? (
            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
          ) : (
            <Bot className="w-6 h-6 text-purple-600 animate-bounce" />
          )
        )}
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
          hover:bg-indigo-700 transition-colors duration-200"
        onClick={onRestart}
      >
        <RefreshCw className="w-5 h-5" />
        New Game
      </motion.button>
    </div>
  );
}