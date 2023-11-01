import { keyframes as styledKeyframes } from 'styled-components';

const keyframes = {
  bottomSheetAppear: styledKeyframes`
   from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0%);
    }
  `,

  shiny: styledKeyframes`
    0% {
        transform: scale(0) rotate(45deg);
        opacity: 0;
    }

    80% {
      transform: scale(0) rotate(45deg);
      opacity: 0.5;
    }

    81% {
      transform: scale(4) rotate(45deg);
      opacity: 1;
    }

    100% {
      transform: scale(50) rotate(45deg);
      opacity: 0;
    }
  `,

  shimmer: styledKeyframes`
    to {
        background-position: 200% 0;
      }
  `,
} as const;

export default keyframes;
