
"use client";

import { useState } from "react";
import { api } from "../../services/api";

interface BuyProductButtonProps {
  defaultPriceId: string;
}

type CheckoutResponse = {
  checkoutUrl: string;
};

export function BuyProductButton({
  defaultPriceId
}: BuyProductButtonProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  
  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true);

    try {
      const { checkoutUrl } = await api.post<CheckoutResponse>("checkout", {
        defaultPriceId
      }).then(res => res.data);
      
      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Falha ao redirecionar para o checkout!");
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
      Comprar agora
    </button>
  );
}