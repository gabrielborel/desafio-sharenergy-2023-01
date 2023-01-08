export const wait = (timeInMilliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));

export enum LOADING_SPEED {
  FAST = 1200,
  MEDIUM = 2200,
}
