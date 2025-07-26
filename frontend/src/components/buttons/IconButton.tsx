import React from "react";

export interface IconButtonProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text?: string;
  onClick: () => void;
}

export default function IconButton({ icon: Icon, text, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center text-primary"
      type="button"
    >
      <Icon width={24} height={24} />
      {text && <span className="text-primary text-small">{text}</span>}
    </button>
  );
}
