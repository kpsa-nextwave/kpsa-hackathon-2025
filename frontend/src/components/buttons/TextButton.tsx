import React from "react";

interface TextButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export default function TextButton({
  text,
  onClick,
  variant = "primary",
}: TextButtonProps) {
  const baseClasses = "w-full h-full flex items-center justify-center font-bold transition-colors py-2";

  const variants = {
    primary: "bg-main text-white hover:bg-hover",
    secondary: "bg-white text-main hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
      type="button"
    >
      {text}
    </button>
  );
}
