"use client";

import React, { useEffect, useState, useCallback } from "react";
import Square from "./Square";
import Image from "next/image";
import ScoreDisplay from "./ScoreDisplay";
import Modal from "./Modal";
import logo from "../../public/assets/logo.svg"
import resetIcon from "../../public/assets/icon-restart.svg"
import xIcon from "../../public/assets/icon-x.svg";
import oIcon from "../../public/assets/icon-o.svg";

interface GameBoardProps {
  playerMark: string;
  gameMode: "cpu" | "player";
  onQuit: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ playerMark, gameMode, onQuit }) => {
  const localStorageKey = `ticTacToe_${gameMode}`;
  // Load initial state from localStorage if available
  const [board, setBoard] = useState<(string | null)[]>(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState).board : Array(9).fill(null);
  });

  const [isXNext, setIsXNext] = useState(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState).isXNext : true;
  });

  const [winner, setWinner] = useState<string | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);

  const [xWins, setXWins] = useState(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState).xWins : 0;
  });
  const [oWins, setOWins] = useState(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState).oWins : 0;
  });
  const [ties, setTies] = useState(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState).ties : 0;
  });

  const [showModal, setShowModal] = useState(false);

  // Effect to save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = { board, isXNext, xWins, oWins, ties };
    localStorage.setItem(localStorageKey, JSON.stringify(gameState));
  }, [board, isXNext, xWins, oWins, ties, localStorageKey]);

  const isBotTurn = useCallback(() => {
    return gameMode === "cpu" && ((isXNext && playerMark === "O") || (!isXNext && playerMark === "X"));
  }, [gameMode, isXNext, playerMark]);

  const handleSquareClick = (index: number, isBot: boolean = false) => {
    // Prevent updating if square is already filled
    if (board[index] || winner || (!isBot && isBotTurn())) return;

    // Copy board and update the clicked square
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    // Check for a winner after the move
    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningSquares(result.combination);
      setShowModal(true);
      if (result.winner === "X") {
        setXWins((prevWins: number) => prevWins + 1);
      } else if (result.winner === "O") {
        setOWins((prevWins: number) => prevWins + 1);
      }
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      setTies((prevTies: number) => prevTies + 1);
      setShowModal(true);
    } else {
      setIsXNext(!isXNext); // Switch turns
    }
  };

  //Helper function to check for a winner 
  const checkWinner = (board: (string | null)[]): { winner: string | null; combination: number[] }=> {
    // Define winning combinations for Tic Tac Toe
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combination: [a, b, c] };
      }
    }
    return { winner: null, combination: []};
  };

  const findBestMove = (mark: string): number | undefined => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = mark;
        if (checkWinner(testBoard).winner === mark) {
          return i; // Return winning or blocking move
        }
      }
    }
    return undefined;
  };
  
  const botMove: () => void = useCallback(() => {
    const botMark = playerMark === "X" ? "O" : "X";
    const emptySquares = board.map((value, index) => (value === null ? index : null)).filter((val) => val !== null) as number[];

    // Priority 1: Take a winning move if available
    let move = findBestMove(botMark);

    // Priority 2: Block the opponent's winning move
    if (move === undefined) move = findBestMove(playerMark);

    // Priority 3: Take the center if it's available
    if (move === undefined && board[4] === null) move = 4;

    // Priority 4: Take any available corner
    const corners = [0, 2, 6, 8];
    if (move === undefined) {
      move = corners.find((corner) => board[corner] === null);
    }

    // Priority 5: Pick any remaining empty square
    if (move === undefined) {
      move = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    if (move !== undefined) {
      setTimeout(() => handleSquareClick(move, true), 0); 
    }
  }, [board, playerMark, findBestMove]);

  useEffect(() => {
    if (gameMode === "cpu" && isBotTurn() && !winner) {
      botMove();
    }
  }, [isXNext, winner, gameMode, isBotTurn, botMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header Flex Container */}
      <div className="relative flex items-center justify-between w-[328px] md:w-[460px] h-[40px] md:h-[52px] mb-14 md:mb-5">
        <Image src={logo} alt="Logo" />
        

        {/* Turn Indicator */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#1F3641] text-[#A8BFC9] font-bold rounded-lg px-4 py-1 text-sm p-4 w-[96px] md:w-[140px] h-[40px] md:h-[52px]"
          style={{ boxShadow: "inset 0px -4px 2px rgba(0, 0, 0, 0.4)" }}
        >
          <Image src={isXNext ? xIcon : oIcon} alt="Turn Icon" className="w-4 h-4 mr-1" />
          <span> TURN</span>
        </div>

        {/* Reset Button */}
        <button 
          className="bg-[#A8BFC9] rounded-lg p-3 md:p-4" 
          onClick={resetGame}
          style={{ boxShadow: "inset 0px -4px 2px rgba(0, 0, 0, 0.4)" }}
          >
          <Image src={resetIcon} alt="Reset" className="w-4 md:w-5 h-4 md:h-5" />
        </button>
      </div>
      
      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-[20px] w-[328px] md:w-[460px]">
        {board.map((value, i) => (
          <Square 
            key={i} 
            value={value} 
            onClick={() => handleSquareClick(i)} 
            isWinningSquare={winningSquares.includes(i)}
            winner={winner}
            isXNext={isXNext}
            />
        ))}
      </div>
      
      {/* Score Display */}
      <ScoreDisplay xWins={xWins} oWins={oWins} ties={ties}/>

      {/* Result Modal */}
      {showModal && (
        <Modal
          winner={winner}
          onQuit={onQuit}
          onNextRound={() => {
            resetGame();
            setShowModal(false); 
          }}
        />
      )}
    </div>
  );
};

export default GameBoard;
