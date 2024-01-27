export const sum = (a: number, b: number) => {
  return a + b;
};

export const sub = (a: number, b: number) => {
  return a - b;
};

export const mul = (a: number, b: number) => {
  return a * b;
};

export const div = (a: number, b: number) => {
  return a / b;
};

export const random = (options = { min: 0, max: 1 }) => {
  return Math.random() * (options.max - options.min) + options.min;
};
