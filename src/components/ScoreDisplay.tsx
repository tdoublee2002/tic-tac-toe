import React from "react";

interface ScoreDisplayProps {
  xWins: number;
  ties: number;
  oWins: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ xWins, ties, oWins }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-[460px] mx-auto mt-6 md:mt-5">
      {/* X (P2) Score */}
      <div className="flex flex-col items-center bg-[#31C3BD] text-[#1F3641] font-bold rounded-lg py-2 px-4">
        <p className="text-xs md:text-xl">X (P2)</p>
        <p className="text-lg md:text-2xl">{xWins}</p>
      </div>

      {/* Ties Score */}
      <div className="flex flex-col items-center bg-[#A8BFC9] text-[#1F3641] font-bold rounded-lg py-2 px-4">
        <p className="text-xs md:text-xl">TIES</p>
        <p className="text-lg md:text-2xl">{ties}</p>
      </div>

      {/* O (P1) Score */}
      <div className="flex flex-col items-center bg-[#F2B137] text-[#1F3641] font-bold rounded-lg py-2 px-4">
        <p className="text-xs md:text-xl">O (P1)</p>
        <p className="text-lg md:text-2xl">{oWins}</p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
