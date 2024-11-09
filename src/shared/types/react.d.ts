declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: ForwardedRef<T>) => ReactNode,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
}

export {};
