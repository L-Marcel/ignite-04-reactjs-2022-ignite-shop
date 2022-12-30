import { IconButton } from "../IconButton";
import { ChangeAmountButtonsContainer } from "./styles";
import { HTMLAttributes } from "react";

interface ChangeAmountButtonsContainerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

interface ChangeAmountButtonsProps {
  onIncrement: (returnMin: (value: number) => number) => void;
  onDecrement: (returnMax: (value: number) => number) => void;
  canDecrement?: boolean;
  canIncrement?: boolean;
  min?: number;
  max?: number;
  containerProps?: ChangeAmountButtonsContainerProps;
}

export function ChangeAmountButtons({
  onIncrement,
  onDecrement,
  canDecrement = true,
  canIncrement = true,
  min = 1,
  max,
  containerProps
}: ChangeAmountButtonsProps) {
  function returnMax(value: number) {
    if(max === undefined || (max >= (value + 1))) {
      return value;
    }
  
    return max;
  }
  
  function returnMin(value: number) {
    if(min === undefined || (min <= (value - 1))) {
      return value;
    }
  
    return min;
  }
  
  function handleIncrement() {
    onIncrement(returnMax);
  }
  
  function handleDecrement() {
    onDecrement(returnMin);
  }

  return (
    <ChangeAmountButtonsContainer
      orientation={containerProps?.orientation || "horizontal"}
      {...containerProps}
    >
      <IconButton
        icon="Plus"
        size="tiny"
        disabled={!canIncrement}
        onClick={handleIncrement}
      />
      <IconButton
        icon="Minus"
        size="tiny"
        disabled={!canDecrement}
        onClick={handleDecrement}
      />
    </ChangeAmountButtonsContainer>
  );
}