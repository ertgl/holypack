export type ErrorProneFunctionAsync<
  T_Parameters extends any[],
  T_ReturnType,
> = (
  ...args: T_Parameters
) => Promise<T_ReturnType>;
