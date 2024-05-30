import { type ComponentPropsWithoutRef } from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { resolveChildren } from '@/shared/lib/resolve-children';
import { useControllableState } from '@/shared/lib/use-controllable-state';
import type { PropsWithRenderProps } from '@/shared/types/compound';
import type { NonNullableObject } from '@/shared/types/utility';

import { Polymorphic, polymorphic } from '../polymorphic/Polymorphic';
import { ResolveChildren } from '../resolve-children/ResolveChildren';
import { CheckboxProvider, useCheckboxContext } from './providers/CheckboxProvider';

type CheckboxProps = PropsWithRenderProps<
  {
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  } & ComponentPropsWithoutRef<'input'>,
  { checked: boolean; toggle: VoidFunction }
>;

type SharedProps = NonNullableObject<Pick<CheckboxProps, 'checked'>> & { toggle: VoidFunction };

const Root = polymorphic<CheckboxProps>((props, forwardedRef) => {
  const {
    children,
    checked: checkedProp,
    onClick: onClickProp,
    defaultChecked,
    onCheckedChange,
    ...restProps
  } = props;

  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  const toggle = () => setChecked(prev => !prev);

  return (
    <CheckboxProvider value={{ checked, toggle }}>
      <input type="checkbox" {...restProps} checked={checked} aria-hidden hidden />
      <Polymorphic
        {...restProps}
        ref={forwardedRef}
        onClick={composeFunctions(toggle, onClickProp)}
      >
        {resolveChildren(children, { checked, toggle })}
      </Polymorphic>
    </CheckboxProvider>
  );
});

type IndicatorProps = PropsWithRenderProps<null, Pick<SharedProps, 'checked'>>;

const Indicator = polymorphic<IndicatorProps>((props, forwardedRef) => {
  const { children, ...restProps } = props;

  const { checked } = useCheckboxContext();

  return checked ? (
    <Polymorphic {...restProps} ref={forwardedRef}>
      <ResolveChildren checked={checked}>{children}</ResolveChildren>
    </Polymorphic>
  ) : null;
});

const Checkbox = { Root, Indicator };

export { Checkbox };

export type { CheckboxProps, SharedProps };
