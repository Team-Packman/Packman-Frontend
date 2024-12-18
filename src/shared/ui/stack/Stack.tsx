import styled from '@emotion/styled';
import type { CSSProperties } from 'react';

type StackProps = {
  gap?: number;
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
};

const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  gap: ${({ gap }) => (gap != null ? `${gap}px` : 0)};
`;

export { Stack };
