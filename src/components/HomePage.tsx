"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import xIcon from "../../public/assets/icon-x.svg";
import oIcon from "../../public/assets/icon-o.svg";

interface HomePageProps  {
  onStartGame: (mark: string, mode: "cpu" | "player") => void;
}

const HomePage: React.FC<HomePageProps > = ({ onStartGame }) => {
  const [playerMark, setPlayerMark] = useState("X");

  const handleMarkSelection = (mark: string) => {
    setPlayerMark(mark);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A2A33] text-white">
      {/* Logo */}
      <Image src={logo} alt="Game Logo" className="mb-6" />

      {/* Mark Selection */}
      <div className="bg-[#1F3641] p-4 rounded-lg shadow-lg w-[328px] md:w-[460px] flex flex-col items-center mb-6">
        <h2 className="text-sm md:text-base mb-4">PICK PLAYER 1&apos;S MARK</h2>
        <div className="flex bg-[#1A2A33] p-2 rounded-md w-full justify-center">
          <button
            onClick={() => handleMarkSelection("X")}
            className={`w-1/2 p-2 flex items-center justify-center rounded-md ${
              playerMark === "X" ? "bg-[#A8BFC9]" : "bg-[#1F3641]"
            }`}
          >
            <Image src={xIcon} alt="X Mark" width={24} height={24} />
          </button>
          <button
            onClick={() => handleMarkSelection("O")}
            className={`w-1/2 p-2 flex items-center justify-center rounded-md ${
              playerMark === "O" ? "bg-[#A8BFC9]" : "bg-[#1F3641]"
            }`}
          >
            <Image src={oIcon} alt="O Mark" width={24} height={24} />
          </button>
        </div>
        <p className="text-xs mt-4 text-[#A8BFC9]">REMEMBER: X GOES FIRST</p>
      </div>

      {/* New Game Buttons */}
      <button 
        onClick={() => onStartGame(playerMark, "cpu")}
        className="w-[328px] md:w-[460px] p-4 bg-[#F2B137] text-[#1A2A33] text-lg font-bold rounded-xl mb-4"
        style={{ boxShadow: "inset 0px -8px 2px rgba(0, 0, 0, 0.2)" }}
      >
        NEW GAME (VS CPU)
      </button>
      <button 
        onClick={() => onStartGame(playerMark, "player")}
        className="w-[328px] md:w-[460px] p-4 bg-[#31C3BD] text-[#1A2A33] text-lg font-bold rounded-xl"
        style={{ boxShadow: "inset 0px -8px 2px rgba(0, 0, 0, 0.2)" }}
      >
        NEW GAME (VS PLAYER)
      </button>
    </div>
  );
};

export default HomePage;