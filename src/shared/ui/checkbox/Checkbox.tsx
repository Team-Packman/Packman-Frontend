import { type ComponentPropsWithoutRef } from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { resolveChildren } from '@/shared/lib/resolve-children';
import { useControllableState } from '@/shared/lib/use-controllable-state';
import type { PropsWithRenderProps } from '@/shared/types/compound';
import type { NonNullableObject } from '@/shared/types/utility';

import { Polymorphic, polymorphic } from '../polymorphic/Polymorphic';
import { getDataState } from './model/dataAttr';
import { CheckboxProvider, useCheckboxContext } from './providers/CheckboxProvider';

type CheckboxProps = PropsWithRenderProps<
  {
    onCheckedChange?: (checked: boolean) => void;
  } & ComponentPropsWithoutRef<'input'>,
  { checked: boolean; toggle: VoidFunction }
>;

type SharedProps = NonNullableObject<Pick<CheckboxProps, 'checked'>> & { toggle: VoidFunction };

const Root = polymorphic<CheckboxProps>((props, forwardedRef) => {
  const {
    children,
    disabled,
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

  const toggle = () => !disabled && setChecked(prev => !prev);

  return (
    <CheckboxProvider value={{ checked, toggle }}>
      <input
        type="checkbox"
        {...restProps}
        disabled={disabled}
        checked={checked}
        aria-hidden
        hidden
      />
      <Polymorphic
        {...restProps}
        ref={forwardedRef}
        onClick={composeFunctions(toggle, onClickProp)}
        data-state={getDataState(checked)}
        data-disabled={disabled}
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
    <Polymorphic {...restProps} ref={forwardedRef} data-state={getDataState(checked)}>
      {resolveChildren(children, { checked })}
    </Polymorphic>
  ) : null;
});

const Checkbox = { Root, Indicator };

export { Checkbox };

export type { CheckboxProps, SharedProps };
