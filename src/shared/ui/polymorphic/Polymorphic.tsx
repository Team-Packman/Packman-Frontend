/* eslint-disable space-before-function-paren */
/* eslint-disable react/display-name */
/* eslint-disable indent */

import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ForwardRefRenderFunction,
  ReactElement,
} from 'react';
import { forwardRef } from 'react';

import type { PropsWithRenderProps } from '@/shared/types/compound';

import { Slot } from '../slot/Slot';

type PropsWithElement<T extends ElementType, P = object> = P & {
  as?: T;
};

type PropsWithAsChild<P = object> = P & {
  asChild?: boolean;
};

type PropsToOmit<T extends ElementType, P = object> = keyof (T & P);

type ValidComponentProps<E extends ElementType, P extends object = object> = P &
  Omit<ComponentPropsWithoutRef<E>, PropsToOmit<E, P>>;

type PolymorphicProps<T extends ElementType, P extends object> = ValidComponentProps<T, P> &
  PropsWithElement<T, P> &
  PropsWithAsChild<P>;

const _Polymorphic = <E extends ElementType = 'div'>(
  props: PolymorphicProps<E, { asChild?: boolean }>,
  forwardedRef: ForwardedRef<ElementRef<E>>,
) => {
  const { asChild, as = 'div', ...restProps } = props;
  const Component: ReactElement | ElementType = asChild ? Slot : as;

  return <Component {...restProps} ref={forwardedRef} />;
};

const Polymorphic = forwardRef(_Polymorphic) as <E extends ElementType = 'div'>(
  props: PolymorphicProps<E, { asChild?: boolean }> & { ref?: ForwardedRef<ElementRef<E>> },
) => ReactElement;

const polymorphic = <
  P extends PropsWithRenderProps<object, never>,
  _E extends ElementType = ElementType,
>(
  BaseComponent: ForwardRefRenderFunction<ElementRef<_E>, PolymorphicProps<_E, P>>,
) => {
  const ForwardedBaseComponent = forwardRef(BaseComponent);

  const OuterComponent = <E extends _E>(
    props: PolymorphicProps<E, P>,
    forwardedRef: ForwardedRef<ElementRef<E>>,
  ) => (
    <ForwardedBaseComponent
      ref={forwardedRef}
      {...(props as ComponentProps<typeof ForwardedBaseComponent>)}
    />
  );

  return forwardRef(OuterComponent) as unknown as <E extends _E>(
    props: PolymorphicProps<E, P> & { ref?: ForwardedRef<ElementRef<E>> },
  ) => ReactElement;
};

export { Polymorphic, polymorphic };

export type { PolymorphicProps };
