import { composeFunctions } from './compose-functions';

const debounce = (fn: VoidFunction, delay: number) => {
  let timerId: NodeJS.Timeout;

  const start = () => {
    timerId = setTimeout(fn, delay);
  };

  const cancel = () => clearTimeout(timerId);

  const update = composeFunctions<void>(cancel, start);

  const isExecuting = () => timerId != null;

  const _exe = () => {
    isExecuting() ? update() : start();
  };

  const exe = Object.assign(_exe, { cancel, isExecuting });

  return exe;
};

export { debounce };
