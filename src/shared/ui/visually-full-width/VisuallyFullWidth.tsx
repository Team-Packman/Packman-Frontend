import { css } from '@emotion/react';
import { Children } from 'react';

import { invariant } from '@/shared/lib/invariant';
import { refCallback } from '@/shared/lib/ref-callback';
import { Slot } from '@/shared/ui/slot/Slot';

const VisuallyFullWidth = (props: { children: React.ReactNode }) => {
  invariant(Children.only(props.children), 'Absolute must have one child');

  return (
    <section css={{ position: 'relative' }}>
      <div
        css={css`
          width: 100dvw;
          max-width: var(--mw);
          position: absolute;
          transform: translateX(calc(var(--app-side-padding) * -1));
        `}
      >
        <Slot
          ref={refCallback(node => {
            // eslint-disable-next-line no-param-reassign
            node.closest('section')!.style.height = `${node.offsetHeight}px`;
          })}
        >
          {Children.only(props.children)}
        </Slot>
      </div>
    </section>
  );
};

export { VisuallyFullWidth };
