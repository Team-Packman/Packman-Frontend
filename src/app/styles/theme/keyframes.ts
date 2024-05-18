import { keyframes as emotionKeyframes } from '@emotion/react';

const keyframes = {
  bottomSheetAppear: emotionKeyframes`
   from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0%);
    }
  `,

  shiny: emotionKeyframes`
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

  shimmer: emotionKeyframes`
    to {
        background-position: 200% 0;
      }
  `,
} as const;

export default keyframes;
