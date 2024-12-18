import styled from '@emotion/styled';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

import type { Theme } from '@/shared/styles/theme/theme';

type Typo = keyof Theme['typo'];

type Color = keyof Theme['color'];

type TextProps = PropsWithChildren<
  {
    typo: Typo;
    color?: Color;
  } & ComponentPropsWithRef<'div'>
>;

const Root = styled.div<{ typo: Typo; color?: Color }>`
  ${({ theme, typo }) => theme.typo[typo]}

  color: ${({ theme, color }) => (color != null ? theme.color[color] : 'inherit')};
`;

const Text = (props: TextProps) => <Root {...props} />;

export { Text };
