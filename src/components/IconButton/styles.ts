import { W, w } from "windstitch";

export const IconButtonContainer = w.button(`
  rounded-md
  flex
  justify-center
  items-center
  relative
  cursor-pointer
  border-0
`, {
  variants: {
    size: {
      default: `
        w-10
        h-10
        text-xl
        md:w-12
        md:h-12
        md:text-2xl
        2xl:w-16
        2xl:h-16
        2xl:text-[2rem]
      `,
      small: `
        w-9
        h-9
        text-lg
        md:w-11
        md:h-11
        md:text-xl
        2xl:w-12
        2xl:h-12
        2xl:text-2xl
      `,
      tiny: `
        w-6
        h-6
        text-base
        md:text-lg
        2xl:w-8
        2xl:h-8
      `,
      big: `
        p-4
        font-bold
        text-2xl
      `
    },
    theme: {
      default: `
        bg-gray-800
        text-gray-300
        [&:not(:disabled)]:active:bg-gray-700
        [&:not(:disabled)]:landscape:hover:bg-gray-700
      `,
      green: `
        bg-green-500
        text-white
        [&:not(:disabled)]:active:bg-green-300
        [&:not(:disabled)]:landscape:hover:bg-green-300
      `
    }
  },
  defaultVariants: {
    theme: "default",
    size: "default"
  }
});

export type IconButtonContainerProps = W.Infer<typeof IconButtonContainer>;