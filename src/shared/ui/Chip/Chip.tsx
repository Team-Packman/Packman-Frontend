import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type ChipProps = PropsWithChildren<{
  active?: boolean;
}> &
  ComponentPropsWithoutRef<'span'>;

type LayoutProps = Pick<ChipProps, 'active'>;

const Layout = styled.span<LayoutProps>`
  cursor: pointer;

  width: fit-content;
  padding: 0.8rem 1.2rem;

  ${({ theme }) => theme.typo.body4}
  border-radius: 8px;

  transition: color 0.2s, background-color 0.2s, border 0.2s;

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

const Chip = ({ active = false, ...restProps }: ChipProps) => (
  <Layout active={active} {...restProps} />
);

type TypeBProps = Omit<ChipProps, 'active'>;

const TypeBLayout = styled(Layout)`
  ${({ theme }) => theme.typo.medium12}

  border-radius: 34px;
  padding: 0.2rem 1rem;
`;

const TypeB = (props: TypeBProps) => <TypeBLayout {...props} active />;

const NamedSpaceChip = Object.assign(Chip, { TypeB });

export { NamedSpaceChip as Chip };

export type { ChipProps };
