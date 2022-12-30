import { ProductType } from "../../services/stripe";
import { Formatter } from "../../utils/formatter";
import { Cart } from "../providers/AppProvider";

enum CartReducerActionType {
  ADD_PRODUCT_AMOUNT = "ADD_PRODUCT_AMOUNT",
  SET_PRODUCT_AMOUNT = "SET_PRODUCT_AMOUNT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT"
}

type CartReducerActionAddProduct = {
  type: CartReducerActionType.ADD_PRODUCT_AMOUNT;
  product: ProductType;
};

type CartReducerActionRemoveProduct = {
  type: CartReducerActionType.REMOVE_PRODUCT;
  id: string;
};

type CartReducerActionSetProductAmount = {
  type: CartReducerActionType.SET_PRODUCT_AMOUNT;
  id: string;
  amount: number;
};

export class CartReducer {
  static reducer(
    state: Cart, 
    action: 
      CartReducerActionAddProduct | 
      CartReducerActionRemoveProduct | 
      CartReducerActionSetProductAmount
  ) {
    let productsInCart = [...state.products];

    const isAddingOrIncrementSameProduct = action.type === "ADD_PRODUCT_AMOUNT";
    const productId = isAddingOrIncrementSameProduct? action.product.id:action.id;

    let actionProductIndex = productsInCart.findIndex(product => product.id === productId);

    if(actionProductIndex === -1 && isAddingOrIncrementSameProduct) {
      productsInCart.push({
        ...action.product,
        amount: 0
      });
    
      actionProductIndex = productsInCart.length - 1;
    } 

    const oldAmount = productsInCart[actionProductIndex]?.amount ?? 0;
    let newAmount = oldAmount;

    switch(action.type) {
    case CartReducerActionType.ADD_PRODUCT_AMOUNT:
      newAmount += 1;
      break;
    case CartReducerActionType.REMOVE_PRODUCT:
      newAmount = 0;
      break;
    case CartReducerActionType.SET_PRODUCT_AMOUNT:
      newAmount = action.amount;
      break;
    default:
      break;
    }

    //productsInCart[actionProductIndex]=newAmount -> run twice
    productsInCart = productsInCart.map((product, index) => {
      const isTheSameProduct = index == actionProductIndex;

      return {
        ...product,
        amount: isTheSameProduct? newAmount:product.amount
      };
    });

    const { productsAmount, totalPrice } = productsInCart.reduce((cartParams, product) => {
      const price = product.price;
      const amount = product.amount;
      
      cartParams.productsAmount += amount;
      cartParams.totalPrice += (price * amount);

      return cartParams;
    }, {
      productsAmount: 0,
      totalPrice: 0 
    });

    const totalValue = totalPrice/100;

    return {
      products: productsInCart,
      productsAmount,
      totalValue,
      formattedTotalValue: Formatter.price(totalValue)
    };
  }

  static addProductAmountAction(product: ProductType) {
    return {
      type: CartReducerActionType.ADD_PRODUCT_AMOUNT,
      product
    } as CartReducerActionAddProduct;
  }

  static removeProductAction(id: string) {
    return {
      type: CartReducerActionType.REMOVE_PRODUCT,
      id
    } as CartReducerActionRemoveProduct;
  }

  static setProductAmountAction(id: string, amount: number) {
    return {
      type: CartReducerActionType.SET_PRODUCT_AMOUNT,
      id,
      amount
    } as CartReducerActionSetProductAmount;
  }
}