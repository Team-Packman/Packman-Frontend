export const useRefCallback = () => {
  const refCallback =
    (callback: (instance: HTMLElement) => void) => (instance: HTMLElement | null) => {
      instance && callback(instance);
    };

  return refCallback;
};
