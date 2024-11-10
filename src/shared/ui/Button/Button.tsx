import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import type { Theme } from '@/shared/styles/theme/theme';

type ButtonProps = PropsWithChildren<{
  variant?: 'outlined' | 'contained' | 'dimmed';
  size?: 'small' | 'middle' | 'big' | 'auto';
  icon?: ReactNode;
}> &
  ComponentPropsWithoutRef<'button'>;

type LayoutProps = Pick<ButtonProps, 'variant' | 'size'>;

const typeAVariant = ({
  color,
}: Theme): Record<NonNullable<ButtonProps['variant']>, SerializedStyles> => ({
  outlined: css`
    color: ${color.pmBlack};

    background-color: ${color.white};
    border: 1px solid ${color.pmBlack};

    &:active {
      background-color: ${darken(0.1, color.white)};
      border-color: ${darken(0.1, color.pmBlack)};
    }
  `,
  contained: css`
    color: ${color.white};

    background-color: ${color.pmPink};
    border: 1px solid ${color.pmPink};

    &:active {
      color: ${darken(0.1, color.white)};

      background-color: ${darken(0.1, color.pmPink)};
      border-color: ${darken(0.1, color.pmPink)};
    }
  `,
  dimmed: css`
    border-radius: 8px;
    border: 1px solid ${color.pmGray};
    background: ${color.white};

    color: var(--gray-gray4, #909090);

    &:active {
      background-color: ${darken(0.1, color.white)};
      border-color: ${darken(0.1, color.pmGray)};
    }
  `,
});

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

      &:active {
        background-color: ${darken(0.1, color.pmGray)};
        border-color: ${darken(0.1, color.pmGray)};
      }
    `}
  }

  ${({ theme: { typo } }) => typo.body4}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
        return typeAVariant(theme).outlined;

      case 'contained':
        return typeAVariant(theme).contained;

      case 'dimmed':
        return typeAVariant(theme).dimmed;

      default:
        variant satisfies never | undefined;
    }
  }}

  ${({ size, theme: { typo } }) => {
    switch (size) {
      case 'auto':
        return css`
          width: 100%;
          height: 100%;

          ${typo.medium16}}
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
          height: 4.6rem;
        `;

      default:
        size satisfies never | undefined;
    }
  }}

  &[data-state='checked'] {
    ${({ theme }) => typeAVariant(theme).contained}
  }
`;

const Button = forwardRef((props: ButtonProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { variant = 'outlined', size = 'auto', icon, children, ...restProps } = props;

  return (
    <Layout type="button" variant={variant} size={size} {...restProps} ref={forwardedRef}>
      {icon}
      {children}
    </Layout>
  );
});

Button.displayName = 'Button';

type TypeBProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}> &
  ComponentPropsWithoutRef<'button'>;

type TypeBLayoutProps = Pick<TypeBProps, 'variant'>;

const TypeBLayout = styled.button<TypeBLayoutProps>`
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 2.8rem;
  padding: 0.2rem 1rem;

  ${({ theme: { typo } }) => typo.semibold14}

  border-radius: 4px;

  transition: 0.2s;

  &:active {
    transform: scale(0.98);
  }

  ${({ variant, theme: { color } }) => {
    switch (variant) {
      case 'primary':
        return css`
          color: ${color.pmBlack};

          background-color: #f2f2f2;

          &:active {
            background-color: ${darken(0.1, color.white)};
            border-color: ${darken(0.1, color.pmBlack)};
          }
        `;

      case 'secondary':
        return css`
          color: ${color.white};

          background-color: ${color.pmPink};

          &:active {
            color: ${darken(0.1, color.white)};

            background-color: ${darken(0.1, color.pmPink)};
            border-color: ${darken(0.1, color.pmPink)};
          }
        `;

      default:
        variant satisfies never | undefined;
    }
  }}
`;

const TypeB = forwardRef((props: TypeBProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { variant = 'primary', icon, children, ...restProps } = props;

  return (
    <TypeBLayout type="button" variant={variant} {...restProps} ref={forwardedRef}>
      {icon}
      {children}
    </TypeBLayout>
  );
});

TypeB.displayName = 'TypeB';

const NamedSpaceButton = Object.assign(Button, { TypeB });

export { NamedSpaceButton as Button };
