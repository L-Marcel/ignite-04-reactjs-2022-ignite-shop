import { w } from "windstitch";

export const ChangeAmountButtonsContainer = w.div(`
  flex
`, {
  variants: {
    orientation: {
      horizontal: `
        flex-row
        buttons-horizontal-group
      `,
      vertical: `
        flex-col
        buttons-vertical-group
      `
    }
  }
});