import Image from "next/image";
import { SliderContainer, Product, ProductFooter } from "./styles";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { ProductType } from "../../services/stripe";
import { IconButton } from "../IconButton/index";
import { SliderKeyboardControls } from "../../services/accessibility";
import { MouseEvent } from "react";
import { useSlider } from "../../context/hooks/useSlider";
import { useProducts } from "../../context/hooks/useProducts";
interface SliderProps {
  products: ProductType[];
}

export function Slider({
  products
}: SliderProps) {
  const { products: productsInCart, addProductAmount } = useProducts();
  const [sliderRef] = useSlider();

  function handleOnNavigate(e: MouseEvent) {
    e.stopPropagation();
  }

  function handleOnAddInCart(e: MouseEvent, product: ProductType) {
    handleOnNavigate(e);
    e.preventDefault();
    addProductAmount(product);
  }

  return (
    <SliderContainer onClick={handleOnNavigate} className="keen-slider" ref={sliderRef}>
      {
        products.map((product) => {
          const { id, name, formattedPrice, imageUrl } = product;
          const alreadyInCart = productsInCart
            .filter(product => product.amount > 0)
            .some(product => product.id == id);

          function handleOnClickToAddInCart(e: MouseEvent) {
            handleOnAddInCart(e, product);
          }

          return (
            <Link 
              className="product-item-container keen-slider__slide" 
              key={id} 
              href={`/product/${id}`}
            >
              <Product>
                <Image 
                  className="object-contain" 
                  src={imageUrl}
                  blurDataURL={imageUrl}
                  width={1040} 
                  height={960} 
                  alt=""
                  placeholder="blur"
                />
                <ProductFooter>
                  <div>
                    <strong>{name}</strong>
                    <span>{formattedPrice}</span>
                  </div>

                  <IconButton
                    onClick={handleOnClickToAddInCart}
                    icon={alreadyInCart? "Plus":"Handbag"}
                    theme="green"
                    iconProps={{
                      weight: "bold",
                    }}
                  />  
                </ProductFooter>
              </Product>
            </Link>
          );
        })
      }
    </SliderContainer>
  );
}