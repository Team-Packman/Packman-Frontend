import { css } from 'styled-components';

import keyframes from './keyframes';

const animation = {
  skeleton: css`
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 8px;

    animation: ${keyframes.shimmer} 1.5s infinite;
  `,
} as const;

export default animation;
