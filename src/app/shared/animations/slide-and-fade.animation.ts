import {animate, animation, style} from "@angular/animations";

export const slideAndFadeAnimation = animation([
  style({
    transform: 'translateX(-100%)',
    opacity: '0',
    'background-color': '{{startColor}}',
  }),
  animate('{{time}} ease-in-out',style({
    opacity: '1',
    transform: 'translateX(0)',
    'background-color': 'white',
  })),
])
