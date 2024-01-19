import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';

import { ButtonSize, ButtonType } from './Button.types';

export const Button = styled.button<{
  variant: ButtonType;
  size: ButtonSize;
}>`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;

  height: 4rem;

  border-radius: 8px;

  transition: 0.2s;

  &:active {
    transform: scale(0.98);
  }

  ${({ theme: { typo } }) => typo.body4}

  ${({ variant, theme: { color } }) => {
    switch (variant) {
      case 'primary':
        return css`
          color: ${color.pmBlack};

          background-color: ${color.white};
          border: 1px solid ${color.pmBlack};

          &:active {
            background-color: ${darken(0.1, color.white)};
            border-color: ${darken(0.1, color.pmBlack)};
          }
        `;

      case 'active':
        return css`
          color: ${color.white};

          background-color: ${color.pmPink};
          border: 1px solid ${color.pmPink};

          &:active {
            color: ${darken(0.1, color.white)};

            background-color: ${darken(0.1, color.pmPink)};
            border-color: ${darken(0.1, color.pmPink)};
          }
        `;

      case 'inactive':
        return css`
          color: ${color.white};

          background-color: ${color.pmGray};
          border: 1px solid ${color.pmGray};
        `;
      default:
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'auto':
        return css`
          width: 100%;
        `;

      case 'small':
        return css`
          width: 13.5rem;
          height: 3.4rem;
        `;

      case 'middle':
        return css`
          width: 16.3rem;
        `;

      case 'big':
        return css`
          width: 100%;
        `;
      default:
    }
  }}
`;
