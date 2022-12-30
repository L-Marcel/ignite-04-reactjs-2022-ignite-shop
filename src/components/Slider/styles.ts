
import { w } from "windstitch";

export const SliderContainer = w.main(`
  flex
  w-screen
`, {});

export const Product = w.article(`
  bg-gradient
  responsive-rounded-xl
  p-1
  cursor-pointer
  flex
  items-center
  justify-center
  min-w-[vw30]
  h-[70vh]
  product-item
`, {});

export const ProductFooter = w.footer(`
  absolute
  flex
  bottom-1
  left-1
  right-1
  p-3
  xl:p-4
  2xl:p-6
  rounded-xl
  md:rounded-lg
  xl:rounded-md
  items-center
  justify-between
  bg-black/60
  product-footer
  translate-y-0
  opacity-100
  md:translate-y-[110%]
  md:opacity-0
  transition-all
  ease-in-out
`, {});