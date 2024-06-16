declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.ForwardedRef<T>) => React.ReactNode,
  ): {
    (props: P & React.RefAttributes<T>): React.ReactNode;
    displayName: string;
  };
}

export {};
