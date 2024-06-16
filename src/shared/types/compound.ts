import type { ReactNode } from 'react';

type RenderProps<P extends object = object> = (payload: P) => ReactNode;

type PropsWithRenderProps<P = object, R extends object = object> = Omit<P, 'children'> & {
  children?: ReactNode | RenderProps<R>;
};

export type { PropsWithRenderProps, RenderProps };
