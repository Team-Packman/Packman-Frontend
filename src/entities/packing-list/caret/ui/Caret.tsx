import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';

import CaretIconSVG from '@/shared/assets/images/svg/caret-icon.svg';

const CaretBtn = styled.button<{ isExpanded?: boolean }>`
  cursor: pointer;

  transform: ${({ isExpanded }) => (isExpanded ? 1 : 'rotate(-180deg)')};

  flex-shrink: 0;

  width: 2.4rem;
  height: 2.4rem;

  text-align: center;

  transition: transform 0.2s;
`;

const CaretIcon = styled.img`
  width: 100%;
  height: 100%;
`;

type CaretProps = {
  isExpanded?: boolean;
} & ComponentPropsWithoutRef<'button'>;

const Caret = ({ isExpanded = false, ...restProps }: CaretProps) => (
  <CaretBtn type="button" isExpanded={isExpanded} {...restProps}>
    <CaretIcon src={CaretIconSVG} alt="짐 목록 펼치기 및 접기 아이콘" />
  </CaretBtn>
);

export { Caret };
