
import { useContextSelector } from "use-context-selector";
import { appContext } from "../providers/AppProvider";

export function usePurchase() {
  return useContextSelector(appContext, value => ({
    onConfirmPurchase: value.onConfirmPurchase,
    isCreatingCheckoutSession: value.isCreatingCheckoutSession
  }));
}