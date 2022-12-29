import "keen-slider/keen-slider.min.css";
import { Slider } from "../src/components/Slider";
import { getProducts } from "../src/services/stripe";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <Slider
      products={products}
    />
  );
}