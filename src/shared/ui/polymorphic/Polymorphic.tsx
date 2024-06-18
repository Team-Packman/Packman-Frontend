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

type PropsWithElement<E extends ElementType, P = object> = P & {
  as?: E;
};

type PropsWithAsChild<P = object> = P & {
  asChild?: boolean;
};

type ValidComponentProps<E extends ElementType, P extends object = object> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P>;

type PolymorphicProps<E extends ElementType, P extends object> = ValidComponentProps<E, P> &
  PropsWithElement<E, P> &
  PropsWithAsChild<P>;

const _Polymorphic = <E extends ElementType = 'div'>(
  props: PolymorphicProps<E, { asChild?: boolean }>,
  forwardedRef: ForwardedRef<ElementRef<E>>,
) => {
  const { asChild, as = 'div', ...restProps } = props;
  const Component: ReactElement | ElementType = asChild ? Slot : as;

  return <Component {...restProps} ref={forwardedRef} />;
};

const Polymorphic = forwardRef(_Polymorphic);

const polymorphic = <P extends PropsWithRenderProps<object, never>, _E extends ElementType = 'div'>(
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

export type { PolymorphicProps, ValidComponentProps };
