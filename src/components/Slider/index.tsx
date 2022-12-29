"use client";

import Image from "next/image";
import { SliderContainer, Product, ProductFooter } from "./styles";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { ProductType } from "../../services/stripe";

interface SliderProps {
  products: ProductType[];
}

export function Slider({
  products
}: SliderProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.5,
      spacing: 36,
      origin: .1
    },
    breakpoints: {
      "(min-width: 650px)": {
        slides: {
          perView: 1.8,
          spacing: 36,
          origin: .1
        }
      },
      "(min-width: 860px)": {
        slides: {
          perView: 2,
          spacing: 36,
          origin: .1
        }
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 3.8,
          spacing: 36,
          origin: .1
        }
      }
    }
  });

  return (
    <SliderContainer className="keen-slider" ref={sliderRef}>
      {
        products.map(({ id, name, price, imageUrl }) => {
          return (
            <Link key={id} href={`/product/${id}`}>
              <Product className="keen-slider__slide" >
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
                  <strong>{name}</strong>
                  <span>{price}</span>
                </ProductFooter>
              </Product>
            </Link>
          );
        })
      }
    </SliderContainer>
  );
}