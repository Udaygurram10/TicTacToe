import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Code2, Bot, Users } from 'lucide-react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { findBestMove } from './utils/minimax';

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [vsBot, setVsBot] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  useEffect(() => {
    if (vsBot && !xIsNext && !winner && !isDraw && !isProcessing) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        const bestMove = findBestMove(squares, 'O', 'X');
        if (bestMove !== -1) {
          const newSquares = squares.slice();
          newSquares[bestMove] = 'O';
          setSquares(newSquares);
          setXIsNext(true);
        }
        setIsProcessing(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [squares, xIsNext, vsBot, winner, isDraw, isProcessing]);

  const handleClick = (i: number) => {
    if (winner || squares[i] || (!xIsNext && vsBot) || isProcessing) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(false);
    setIsProcessing(false);
  };

  const startGame = (withBot: boolean) => {
    setVsBot(withBot);
    setGameStarted(true);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <Gamepad2 className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-800">Tic Tac Toe</h1>
      </motion.div>

      {!gameStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg
              hover:bg-indigo-700 transition-colors duration-200 min-w-[200px]"
            onClick={() => startGame(false)}
          >
            <Users className="w-5 h-5" />
            Play vs Friend
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors duration-200 min-w-[200px]"
            onClick={() => startGame(true)}
          >
            <Bot className="w-5 h-5" />
            Play vs AI Bot
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl"
          >
            <Board
              squares={squares}
              onClick={handleClick}
              winningLine={line}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <GameStatus
              winner={isDraw ? 'Draw!' : winner}
              xIsNext={xIsNext}
              onRestart={handleRestart}
              vsBot={vsBot}
              isProcessing={isProcessing}
            />
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 flex items-center gap-2 text-gray-600 font-medium"
      >
        <Code2 className="w-4 h-4" />
        <span>Built by</span>
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text font-bold">
          UdayGurram
        </span>
      </motion.div>
    </div>
  );
}

export default App;