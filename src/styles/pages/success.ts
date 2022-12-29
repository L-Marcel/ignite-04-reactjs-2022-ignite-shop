import { w } from "windstitch";

export const SuccessContainer = w.main(`
  flex
  flex-col
  items-center
  justify-start
  my-0
  mx-auto
  h-[656px]
  success-container
`, {});

export const ImageContainer = w.div(`
  w-full
  max-w-[130px]
  h-[140px]
  bg-gradient-to-b
  from-[#1ea483]
  to-[#7465d4]
  rounded-lg
  flex
  items-center
  justify-center
`, {});