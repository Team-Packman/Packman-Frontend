import type { PropsWithChildren } from 'react';

import { Slot } from '../slot/Slot';

const VisuallyHidden = ({ children }: PropsWithChildren) => (
  <Slot
    style={{
      position: 'absolute',
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    }}
  >
    {children}
  </Slot>
);

export { VisuallyHidden };
