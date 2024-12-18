const refCallback =
  <T extends HTMLElement>(onMount?: (node: T) => void, onUnmount?: (node: null) => void) =>
  (node: T | null) => {
    node ? onMount?.(node) : onUnmount?.(node);
  };

export { refCallback };
