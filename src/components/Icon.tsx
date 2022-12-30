import { CaretLeft, X, Minus, Handbag, Plus, IconProps as PhosphorIconProps } from "phosphor-react";

const icons = {
  CaretLeft,
  X,
  Handbag,
  Plus,
  Minus
};

export type IconName = keyof typeof icons;

export interface IconProps extends PhosphorIconProps {
  name: IconName;
}

export function Icon({
  name,
  ...props
}: IconProps) {
  const CurrentIcon = icons[name];

  return (
    <CurrentIcon {...props}/>
  );
}