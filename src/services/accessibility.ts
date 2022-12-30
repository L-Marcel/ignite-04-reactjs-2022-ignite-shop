import { KeenSliderHooks, KeenSliderInstance, KeenSliderOptions, SliderInstance } from "keen-slider";

export function SliderKeyboardControls(
  slider: 
    SliderInstance<KeenSliderOptions<unknown, unknown, KeenSliderHooks>, 
    KeenSliderInstance<unknown, unknown, KeenSliderHooks>, KeenSliderHooks>
) {
  let focused = false;

  function eventFocus(index: number) {
    if(slider.track.details.abs !== index && focused) {
      slider.moveToIdx(index);
    }
  }

  function eventBlur() {
    focused = false;
  }

  function eventKeydown(e: globalThis.KeyboardEvent) {
    focused = true;

    switch (e.key) {
    default:
      break;
    case "Left":
    case "ArrowLeft":
      slider.prev();
      break;
    case "Right":
    case "ArrowRight":
      slider.next();
      break;
    }
  }

  slider.on("slideChanged", (props) => {
    props.slides[props.track.details.abs].focus();
  });

  slider.on("created", (props) => {
    props.slides.forEach((sliderItem, index) => {
      sliderItem.addEventListener("focus", () => {
        eventFocus(index);
      });
      sliderItem.addEventListener("blur", eventBlur);
      sliderItem.addEventListener("keydown", eventKeydown);
    });
  });
}
