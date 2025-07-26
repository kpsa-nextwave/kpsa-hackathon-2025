import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IconButtonProps {
  onClick?: () => void;
}

export default function BackButton({ onClick }: IconButtonProps) {
  const navigate = useNavigate();

  const onButtonClick = () => {
    if(onClick) {
      onClick();
    }
    else {
      navigate(-1);
    }
  }

  return (
    <button
      onClick={onButtonClick}
      className="flex flex-col items-center justify-center text-primary"
      type="button"
    >
      <ArrowLeft width={24} height={24} />
    </button>
  );
}
