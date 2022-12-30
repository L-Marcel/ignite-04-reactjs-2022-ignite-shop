
import { useContextSelector } from "use-context-selector";
import { appContext } from "../providers/AppProvider";

export function useCartValue() {
  return useContextSelector(appContext, value => ({
    totalValue: value.cart.totalValue,
    formattedTotalValue: value.cart.formattedTotalValue,
  }));
}