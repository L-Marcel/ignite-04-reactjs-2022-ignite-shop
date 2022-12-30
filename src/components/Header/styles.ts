import { w } from "windstitch";

export const HeaderContainer = w.header(`
  py-12
  md:py-10
  w-full
  my-0
  flex
  mx-auto
  items-center
  px-8
`, {
  variants: {
    mode: {
      normal: `
        max-w-[1180px]
        justify-between
      `,
      alt: `
        max-w-full
        justify-center
      `
    }
  },
  defaultVariants: {
    mode: "normal"
  }
});