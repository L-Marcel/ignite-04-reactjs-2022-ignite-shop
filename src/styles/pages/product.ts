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

export const ImageTopRightCut = w.div(`
  z-10
  absolute
  -top-1
  -right-1
  border-x-[8rem]
  border-y-[8rem]
  border-b-transparent
  border-l-transparent
  border-r-gray-900
  border-t-gray-900
  lg:border-x-[10rem]
  lg:border-y-[10rem]
`, {});

export const ImageContainer = w.div(`
  w-min
  absolute
  right-0
  top-0
  -mt-36
  -z-10
  -mr-[calc(2rem+3px)]
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
  bg-gradient
  min-w-[270px]
  min-h-[270px]
  rounded-lg
  p-1
  bg-transparent
  items-center
  justify-center
  overflow-visible
  md:overflow-hidden
`, {});

export const ProductDetails = w.div(`
  flex
  flex-col
  product-details
`, {});
