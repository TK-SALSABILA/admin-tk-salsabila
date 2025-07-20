import React from "react";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";

interface ButtonOpenModalProps {
  onClick?: () => void;
  text?: React.ReactNode;
  className?: string;
  iconPosition?: "left" | "right";
}

const ButtonOpenModal: React.FC<ButtonOpenModalProps> = ({
  onClick,
  text,
  className,
  iconPosition,
}) => {
  return (
    <Button className={className} onClick={onClick}>
      {iconPosition == "left" && <SquarePlus />}
      {text}
      {iconPosition == "right" && <SquarePlus />}
    </Button>
  );
};

export default ButtonOpenModal;
