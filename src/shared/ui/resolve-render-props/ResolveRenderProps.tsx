import { resolveFunctionOrPrimitive } from '@/shared/lib/resolve-function-or-primitive';
import type { PropsWithRenderProps } from '@/shared/types/compound';

const ResolveChildren = <P extends object>(props: PropsWithRenderProps<P, P>) => {
  const { children, ...restProps } = props;

  const resolvedChildren = resolveFunctionOrPrimitive(children, restProps as P);

  return resolvedChildren;
};

export { ResolveChildren };
