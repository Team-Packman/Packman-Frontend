import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type ChipProps = {
  active?: boolean;
} & ComponentPropsWithoutRef<'span'>;

type LayoutProps = Pick<ChipProps, 'active'>;

const Layout = styled.span<LayoutProps>`
  cursor: pointer;

  width: fit-content;
  padding: 0.8rem 1.2rem;

  ${({ theme }) => theme.typo.body4}
  border-radius: 8px;

  transition: color 0.2s;

  ${({ active, theme: { color } }) =>
    active
      ? css`
          color: ${color.pmPink};

          background-color: ${color.white};
          border: 1px solid ${color.pmPink};
        `
      : css`
          color: ${color.pmDarkGray};

          background-color: ${color.pmBlueGray};
          border: 1px solid ${color.pmBlueGray};
        `}
`;

const Chip = ({ active = false, ...restProps }: PropsWithChildren<ChipProps>) => (
  <Layout active={active} {...restProps} />
);

export default Chip;

export type { ChipProps };
