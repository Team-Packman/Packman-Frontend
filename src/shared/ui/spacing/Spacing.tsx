import styled from '@emotion/styled';

const Root = styled.div<{ gap: number }>`
  height: ${({ gap }) => `${gap}px`};
`;

const Spacing = ({ gap }: { gap: number }) => <Root gap={gap} />;

export { Spacing };
