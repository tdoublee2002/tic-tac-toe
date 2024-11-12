import React from "react";

interface ModalProps {
  winner: string | null;
  onQuit: () => void;
  onNextRound: () => void;
}

const Modal: React.FC<ModalProps> = ({ winner, onQuit, onNextRound }) => {
  // Determine the content and style based on the winner
  let title, subtitle, winnerColor, winnerIcon;

  if (winner === "X") {
    title = "PLAYER 1 WINS!";
    subtitle = "TAKES THE ROUND";
    winnerColor = "#31C3BD"; // Cyan color for X
    winnerIcon = "X";
  } else if (winner === "O") {
    title = "PLAYER 2 WINS!";
    subtitle = "TAKES THE ROUND";
    winnerColor = "#F2B137"; // Yellow color for O
    winnerIcon = "O";
  } else {
    title = "ROUND TIED";
    subtitle = "";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center bg-[#1F3641] text-center p-8 w-full h-[228px] md:h-[266px]">
        
        {winner && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-[#A8BFC9]">{title}</p>
            <div className="flex items-center space-x-4">
              <div
                className="text-6xl md:text-7xl font-bold"
                style={{ color: winnerColor }}
              >
                {winnerIcon}
              </div>
              <p
                className="text-2xl md:text-3xl font-bold"
                style={{ color: winnerColor }}
              >
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {!winner && (
          <p className="text-lg md:text-2xl font-bold mb-6 text-[#A8BFC9]">
            {subtitle}
          </p>
        )}

        <div className="flex justify-around mt-6 gap-4">
          <button
            onClick={onQuit}
            className="px-4 py-2 bg-[#A8BFC9] text-[#1F3641] font-bold rounded-lg"
            style={{ boxShadow: "inset 0px -4px 2px rgba(0, 0, 0, 0.4)" }}
          >
            Quit
          </button>
          <button
            onClick={onNextRound}
            className="px-4 py-2 bg-[#F2B137] text-[#1F3641] font-bold rounded-lg"
            style={{ boxShadow: "inset 0px -4px 2px rgba(0, 0, 0, 0.4)" }}
          >
            Next Round
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
