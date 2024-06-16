import styled from '@emotion/styled';

type StackProps = {
  direction?: 'row' | 'column';
  gap?: number;
};

const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  gap: ${({ gap }) => (gap != null ? `${gap}px` : 0)};
`;

export { Stack };
