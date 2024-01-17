let swiping = false;

export const isSwiping = () => swiping;

export const startSwiping = () => {
  swiping = true;
};
export const stopSwiping = () => {
  swiping = false;
};
