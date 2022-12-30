import { CartAmountContainer } from "./styles";

interface CartAmountProps {
  amount: number;
}

export function CartAmount({
  amount
}: CartAmountProps) {
  if(amount === 0) {
    return null;
  }

  return (
    <CartAmountContainer>
      <p className="pt-[2px] pr-[1px]">{amount}</p>
    </CartAmountContainer>
  );
}