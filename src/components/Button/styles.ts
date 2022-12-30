import { w } from "windstitch";

export const ButtonContainer = w.button(`
  bg-green-500
  border-0
  w-full
  text-white
  rounded-lg
  mt-5
  cursor-pointer
  p-5
  font-bold
  text-lg
  [&:not(:disabled)]:hover:bg-green-300
`, {});