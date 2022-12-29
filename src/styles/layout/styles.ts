import { w } from "windstitch";

export const BodyContainer = w.body(`
  flex
  flex-col
  items-start
  max-h-screen
  min-h-screen
`, {});

export const Header = w.header(`
  px-0
  py-12
  md:py-10
  w-full
  max-w-[1180px]
  my-0
  pl-[10%]
`, {});