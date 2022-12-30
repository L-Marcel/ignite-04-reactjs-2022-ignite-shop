import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { ButtonContainer } from "./styles";

export function Button({
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <ButtonContainer
      className="default-button"
      {...props}
    />
  );
}