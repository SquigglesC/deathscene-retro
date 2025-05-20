import React, { useState } from "react";

export enum BUTTON_VARIANTS {
  LIGHT = "bg-light text-dark disabled:bg-gray enabled:hover:underline filter enabled:drop-shadow-[0_0px_5px_rgba(235,235,235,0.4)] enabled:hover:drop-shadow-[0_0px_8px_rgba(255,255,255,0.8)]",
  DARK = "bg-opacity-0 text-light border-[1px] enabled:border-light disabled:border-gray disabled:text-gray enabled:hover:underline filter enabled:drop-shadow-[0_0px_5px_rgba(235,235,235,0.4)] enabled:hover:drop-shadow-[0_0px_8px_rgba(255,255,255,0.8)]",
}

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  fontFamily?: "Inter" | string;
  onClick?: () => void;
  variant?: BUTTON_VARIANTS;
  disabled?: boolean;
  target?: "_blank" | "_self";
}

export default function Button({
  className = "",
  children,
  fontFamily = "Inter",
  onClick,
  variant = BUTTON_VARIANTS.LIGHT,
  disabled = false,
  target = "_self",
}: ButtonProps) {
  const commonClasses = `${className} ${variant} relative whitespace-nowrap pt-3 pb-2 px-4 rounded-xs disabled:opacity-70 transition-all duration-400 ease-in-out`;
  const commonStyles = {
    fontFamily,
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={commonClasses}
      style={commonStyles}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
