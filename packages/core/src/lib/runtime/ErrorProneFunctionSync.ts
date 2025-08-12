export type ErrorProneFunctionSync<
  T_Parameters extends any[],
  T_ReturnType,
> = (
  ...args: T_Parameters
) => T_ReturnType;
