import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';

import CaretIcon from '@/shared/assets/images/svg/caret-icon.svg';

const CaratBtn = styled.button<{ isExpanded?: boolean }>`
  cursor: pointer;

  transform: ${({ isExpanded }) => (isExpanded ? 1 : 'rotate(-180deg)')};

  flex-shrink: 0;

  width: 2.4rem;
  height: 2.4rem;

  text-align: center;

  transition: transform 0.2s;
`;

const CaratIcon = styled.img`
  width: 100%;
  height: 100%;
`;

type CaratProps = {
  isExpanded?: boolean;
} & ComponentPropsWithoutRef<'button'>;

const Carat = ({ isExpanded = false, ...restProps }: CaratProps) => (
  <CaratBtn type="button" isExpanded={isExpanded} {...restProps}>
    <CaratIcon src={CaretIcon} alt="짐 목록 펼치기 및 접기 아이콘" />
  </CaratBtn>
);

export { Carat };
