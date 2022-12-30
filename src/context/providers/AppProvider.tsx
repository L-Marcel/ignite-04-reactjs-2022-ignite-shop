import { ReactNode, useCallback, useReducer, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../../services/api";
import { ProductType } from "../../services/stripe";
import { CartReducer } from "../reducers/CartReducer";

interface AppProviderProps {
  children: ReactNode;
}

export interface CartProduct extends ProductType {
  amount: number;
}

export type Cart = {
  products: CartProduct[];
  productsAmount: number;
  totalValue: number;
  formattedTotalValue: string;
};

type AppContext = {
  cart: Cart,
  setProductAmount: (id: string, amount: number) => void;
  addProductAmount: (product: ProductType) => void;
  removeProduct: (id: string) => void;
  onConfirmPurchase: (products: CartProduct[]) => void;
  isCreatingCheckoutSession: boolean;
};

type CheckoutResponse = {
  checkoutUrl: string;
};

export const appContext = createContext({} as AppContext);

export function AppProvider({ children }: AppProviderProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  
  const [cart, dispatch] = useReducer(CartReducer.reducer, {
    products: [],
    productsAmount: 0,
    totalValue: 0,
    formattedTotalValue: "R$ 0,00",
  });

  const addProductAmount = useCallback((product: ProductType) => {
    dispatch(CartReducer.addProductAmountAction(product));
  }, [dispatch]);

  const removeProduct = useCallback((id: string) => {
    dispatch(CartReducer.removeProductAction(id));
  }, [dispatch]);

  const setProductAmount = useCallback((id: string, amount: number) => {
    dispatch(CartReducer.setProductAmountAction(id, amount));
  }, [dispatch]);

  const onConfirmPurchase = useCallback(async(products: CartProduct[]) => {
    setIsCreatingCheckoutSession(true);

    try {
      const { checkoutUrl } = await api.post<CheckoutResponse>("checkout", {
        products
      }).then(res => res.data);
      
      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Falha ao redirecionar para o checkout!");
      setIsCreatingCheckoutSession(false);
    }

    return () => undefined;
  }, []);

  return (
    <appContext.Provider
      value={{
        cart,
        addProductAmount,
        setProductAmount,
        removeProduct,
        onConfirmPurchase,
        isCreatingCheckoutSession
      }}
    >
      {children}
    </appContext.Provider>
  );
}