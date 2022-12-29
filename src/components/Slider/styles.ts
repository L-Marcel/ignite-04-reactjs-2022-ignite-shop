
import { w } from "windstitch";

export const SliderContainer = w.main(`
  flex
  w-screen
`, {});

export const Product = w.article(`
  bg-gradient-to-b
  from-[#1ea483]
  to-[#7465d4]
  rounded-2xl
  md:rounded-xl
  xl:rounded-lg
  p-1
  cursor-pointer
  relative
  flex
  items-center
  justify-center
  min-w-[520px]
  product-item
  mb-10
`, {});

export const ProductFooter = w.footer(`
  absolute
  flex
  bottom-1
  left-1
  right-1
  p-4
  xl:p-5
  2xl:p-8
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