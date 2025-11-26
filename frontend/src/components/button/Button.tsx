import React, { memo } from "react";

export interface ButtonProps {
  text: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  width?: string;
}

const Button = memo(function Button({
  text,
  icon,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  width = "100%",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} w-[${width}] flex items-center justify-center gap-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-bold disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-xl">{icon}</span>
      {text}
    </button>
  );
});

export default Button;
