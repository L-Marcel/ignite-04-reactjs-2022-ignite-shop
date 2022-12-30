import * as Dialog from "@radix-ui/react-dialog";
import { useCartValue } from "../../context/hooks/useCartValue";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useProducts } from "../../context/hooks/useProducts";
import { usePurchase } from "../../context/hooks/usePurchase";
import Image from "next/image";
import { Formatter } from "../../utils/formatter";
import { ChangeAmountButtons } from "../ChangeAmountButtons";

interface DrawerProps {
  onClose: () => void;
}

export function Drawer({
  onClose
}: DrawerProps) {
  const { onConfirmPurchase, isCreatingCheckoutSession } = usePurchase();
  const { products, productsAmount, removeProduct, setProductAmount } = useProducts();
  const { formattedTotalValue } = useCartValue();

  const productsInBag = products.filter(product => product.amount > 0);

  function handleOnClose() {
    if(!isCreatingCheckoutSession) {
      onClose();
    }
  }

  function handleOnConfirmPurchase() {
    onConfirmPurchase(productsInBag);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay onClick={handleOnClose} className="overlay"/>
      <Dialog.Content tabIndex={-1} className="drawer">
        <div className="flex flex-col gap-6 mb-10">
          <header>
            <Dialog.Close disabled={isCreatingCheckoutSession} onClick={handleOnClose}>
              <Icon 
                name="X"
                size={24}
              />
            </Dialog.Close>  
            <Dialog.Title>Sacola de compras</Dialog.Title>
          </header>

          <main>
            <ul>
              {
                productsInBag.map((product) => {
                  const { id, name, amount, price, imageUrl } = product;
                  const formattedTotalPrice = Formatter.price(amount * (price/100));

                  const canDecrement = amount > 1;
                  const canIncrement = amount < 25;

                  function handleOnIncrementAmount(returnMax: (amount: number) => number) {
                    setProductAmount(id, returnMax(amount + 1));
                  }
                
                  function handleOnDecrementAmount(returnMin: (amount: number) => number) {
                    setProductAmount(id, returnMin(amount - 1));
                  }

                  function handleOnRemoveProduct() {
                    removeProduct(id);
                  }

                  return (
                    <li key={id}>
                      <div className="relative">
                        <ChangeAmountButtons
                          containerProps={{
                            orientation: "vertical",
                            className: "absolute bottom-1 right-1 buttons-with-low-opacity"
                          }}
                          onDecrement={handleOnDecrementAmount}
                          onIncrement={handleOnIncrementAmount}
                          canDecrement={canDecrement}
                          canIncrement={canIncrement}
                        />
                        <Image
                          alt=""
                          src={imageUrl}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="drawer-product-info">
                        <h3>{name}</h3>
                        <p><strong>{formattedTotalPrice}</strong></p>
                        <div>
                          <p>{amount}</p>
                          <span>—</span>
                          <button 
                            disabled={isCreatingCheckoutSession}
                            onClick={handleOnRemoveProduct}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </main>
        </div>
        
        <footer>
          <div className="footer-details">
            <div>
              <p>Quantidade</p>
              <p>{productsAmount} itens</p>
            </div>

            <div>
              <p><strong>Valor total</strong></p>
              <p><strong>{formattedTotalValue}</strong></p>
            </div>
          </div>

          <Button disabled={isCreatingCheckoutSession} onClick={handleOnConfirmPurchase}>
            Finalizar compra
          </Button>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
}