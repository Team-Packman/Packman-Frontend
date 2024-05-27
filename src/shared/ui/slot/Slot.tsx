/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-pascal-case */

import {
  Children,
  cloneElement,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
  type RefCallback,
} from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { composeRefs } from '@/shared/lib/compose-refs';

type SlotProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  return (
    <_Slot {...slotProps} ref={forwardedRef}>
      {children}
    </_Slot>
  );
});

Slot.displayName = 'Slot';

type _SlotProps = {
  children: ReactNode;
};

type WithRef<T = object> = T & {
  ref: HTMLElement | RefCallback<HTMLElement>;
};

const _Slot = forwardRef<HTMLElement, _SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (isValidElement<WithRef>(children)) {
    return cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
    });
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
});

_Slot.displayName = '_Slot';

type AnyProps = Record<string, any>;

const mergeProps = (slotProps: AnyProps, childProps: AnyProps) => {
  const overrideProps = { ...childProps };

  Object.keys(childProps).forEach(propName => {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = composeFunctions(childPropValue, childPropValue);
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  });

  return { ...slotProps, ...overrideProps };
};

const Root = Slot;

export { Root, Slot };

export type { SlotProps };
