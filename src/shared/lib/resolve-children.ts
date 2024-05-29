import type { ReactNode } from 'react';

import { resolveFunctionOrPrimitive } from '@/shared/lib/resolve-function-or-primitive';
import type { RenderProps } from '@/shared/types/compound';

const resolveChildren = <P extends object>(children: ReactNode | RenderProps<P>, props: P) => {
  const resolvedChildren = resolveFunctionOrPrimitive(children, props);

  return resolvedChildren;
};

export { resolveChildren };
