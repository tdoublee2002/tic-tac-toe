"use client";

import React, { useEffect, useState} from "react";
import HomePage from "../components/HomePage";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerMark, setPlayerMark] = useState("X");
  const [gameMode, setGameMode] = useState<"cpu" | "player">("player");

  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedGameStarted = localStorage.getItem("gameStarted");
    const savedPlayerMark = localStorage.getItem("playerMark");
    const savedGameMode = localStorage.getItem("gameMode");

    if (savedGameStarted === "true") {
      setPlayerMark(savedPlayerMark || "X");
      setGameMode((savedGameMode as "cpu" | "player") || "player");
      setGameStarted(true);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gameStarted", JSON.stringify(gameStarted));
    localStorage.setItem("playerMark", playerMark);
    localStorage.setItem("gameMode", gameMode);
  }, [gameStarted, playerMark, gameMode]);

  // Function to start the game and switch to GameBoard
  const handleStartGame = (mark: string, mode: "cpu" | "player") => {
    setPlayerMark(mark);
    setGameMode(mode);
    setGameStarted(true);
  };

  // Function to reset the game and go back to the HomePage
  const resetGame = () => {
    setGameStarted(false);
    setPlayerMark("X");
    setGameMode("player");
    // Clear saved game state
    localStorage.removeItem("gameStarted");
    localStorage.removeItem("playerMark");
    localStorage.removeItem("gameMode");
    localStorage.removeItem("ticTacToe_cpu"); 
    localStorage.removeItem("ticTacToe_player");  
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      { gameStarted ? (
        <GameBoard playerMark={playerMark} gameMode={gameMode} onQuit={resetGame}/>
      ) : (
        <HomePage onStartGame={handleStartGame}/>
      )}
    </div>
  );
}
