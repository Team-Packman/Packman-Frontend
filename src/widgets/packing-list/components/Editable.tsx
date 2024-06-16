import type { KeyboardEvent } from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { Polymorphic, polymorphic } from '@/shared/ui/polymorphic/Polymorphic';

type EditableItemProps = {
  enabled?: boolean;
};

const Editable = polymorphic<EditableItemProps>((props, forwardRef) => {
  const { enabled, ...restProps } = props;

  const blurOnEnter = composeFunctions((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }, props.onKeyDown);

  return (
    <Polymorphic
      {...restProps}
      ref={forwardRef}
      contentEditable={enabled}
      suppressContentEditableWarning={enabled}
      style={{ outline: 'none' }}
      onKeyDown={blurOnEnter}
    />
  );
});

export { Editable };
