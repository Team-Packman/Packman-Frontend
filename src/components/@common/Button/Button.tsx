import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'outlined' | 'contained';
  size?: 'small' | 'middle' | 'big' | 'auto';
  icon?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

type LayoutProps = Pick<ButtonProps, 'variant' | 'size'>;

const Layout = styled.button<LayoutProps>`
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

  &:disabled {
    ${({ theme: { color } }) => css`
      color: ${color.white};

      background-color: ${color.pmGray};
      border: 1px solid ${color.pmGray};
    `}
  }

  ${({ theme: { typo } }) => typo.body4}

  ${({ variant, theme: { color } }) => {
    switch (variant) {
      case 'outlined':
        return css`
          color: ${color.pmBlack};

          background-color: ${color.white};
          border: 1px solid ${color.pmBlack};

          &:active {
            background-color: ${darken(0.1, color.white)};
            border-color: ${darken(0.1, color.pmBlack)};
          }
        `;

      case 'contained':
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

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { variant = 'outlined', size = 'auto', icon, children, ...restProps } = props;

  return (
    <Layout type="button" variant={variant} size={size} {...restProps}>
      {icon}
      {children}
    </Layout>
  );
};

export default Button;
