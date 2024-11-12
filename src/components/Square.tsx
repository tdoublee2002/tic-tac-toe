"use client"

import React, { useState} from "react";
import Image from "next/image";
import xIcon from "../../public/assets/icon-x.svg";
import xOutlineIcon from "../../public/assets/icon-x-outline.svg";
import oIcon from "../../public/assets/icon-o.svg";
import oOutlineIcon from "../../public/assets/icon-o-outline.svg";
import xWinIcon from "../../public/assets/icon-x-win.svg";
import oWinIcon from "../../public/assets/icon-o-win.svg";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
  winner: string | null;
  isXNext: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, winner,isXNext }) => {
  const [hovered, setHovered] = useState(false);

  const icon = value === "X" ? xIcon : oIcon;
  const winningIcon = winner === "X" ? xWinIcon : oWinIcon;
  const winningColor = winner === "X" ? "#31C3BD" : "#F2B137";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={isWinningSquare ? { backgroundColor: winningColor } : {}}
      className={`aspect-square flex items-center justify-center rounded-[10px] md:rounded-[15px] shadow-inner-custom ${!isWinningSquare ? "bg-[#1F3641]" : ""
      }`}
    >
      { isWinningSquare ? (
        <Image className="w-10 md:w-16" src={winningIcon} alt={winner ?? ""} />
      ) : value ? (
        <Image className="w-10 md:w-16" 
          src={icon} 
          alt={value}  
        />
      ) : (
        hovered && (
          <Image 
            className="w-10 md:w-16" 
            src={isXNext ? xOutlineIcon: oOutlineIcon} 
            alt={isXNext ? "X Outline" : "O Outline"}  
          />
        )
      )}
    </button>
  );
};

export default Square;