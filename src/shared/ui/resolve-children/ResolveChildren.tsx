import { resolveChildren } from '@/shared/lib/resolve-children';
import type { PropsWithRenderProps } from '@/shared/types/compound';

const ResolveChildren = <P extends object>(props: PropsWithRenderProps<P, P>) => {
  const { children, ...restProps } = props;

  return <>{resolveChildren(children, restProps as P)}</>;
};

export { ResolveChildren };
