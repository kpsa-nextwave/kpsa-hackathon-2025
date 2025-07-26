import React from "react";

export interface NavButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function NavButton({ icon, text, onClick, isSelected }: NavButtonProps) {
  const color = isSelected ? '#0064E0' : '#75757A';

  return (
    <button
      onClick={onClick}
      type="button"
      className="flex flex-col items-center justify-center gap-1"
      style={{ color }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          color, // 아이콘 내부도 이 색상을 상속 받음
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </button>
  );
}
