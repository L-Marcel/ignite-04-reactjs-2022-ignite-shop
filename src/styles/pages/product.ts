import { w } from "windstitch";

export const ProductContainer = w.main(`
  relative
  flex
  md:flex-row
  gap-16
  max-w-[1180px]
  my-0
  mx-auto
  justify-center
  px-8
  flex-col
  product-container
`, {});

export const ImageContainer = w.div(`
  w-min
  absolute
  right-0
  top-0
  -mt-36
  -mr-8
  scale-50
  md:relative
  md:mt-0
  md:mr-0
  md:scale-100
  md:w-full
  lg:max-w-[376px]
  lg:h-[calc(376px-0.5rem)]
  2xl:max-w-[576px]
  2xl:h-[calc(476px-0.5rem)]
  bg-gradient-to-b
  from-[#1ea483]
  to-[#7465d4]
  min-w-[270px]
  min-h-[270px]
  rounded-lg
  p-1
  items-center
  justify-center
`, {});

export const ProductDetails = w.div(`
  flex
  flex-col
  product-details
`, {});
