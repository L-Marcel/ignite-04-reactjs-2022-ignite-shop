import { useKeenSlider } from "keen-slider/react";
import { SliderKeyboardControls } from "../../services/accessibility";

export function useSlider() {
  return useKeenSlider({
    slides: {
      perView: 1.5,
      spacing: 36,
      origin: .1
    },
    breakpoints: {
      "(min-width: 650px)": {
        slides: {
          perView: 1.8,
          spacing: 36,
          origin: .1
        }
      },
      "(min-width: 860px)": {
        slides: {
          perView: 2,
          spacing: 36,
          origin: .1
        }
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 2.8,
          spacing: 36,
          origin: .1
        }
      }
    }
  }, [SliderKeyboardControls]);
}