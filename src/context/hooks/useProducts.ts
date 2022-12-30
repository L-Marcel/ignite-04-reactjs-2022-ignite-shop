import { useContextSelector } from "use-context-selector";
import { appContext } from "../providers/AppProvider";

export function useProducts() {
  return useContextSelector(appContext, value => ({
    addProductAmount: value.addProductAmount,
    removeProduct: value.removeProduct,
    setProductAmount: value.setProductAmount,
    products: value.cart.products,
    productsAmount: value.cart.productsAmount
  }));
}