import type { MaybePromise } from "../promise/MaybePromise";

export type ErrorProneFunctionMaybeAsync<
  T_Parameters extends any[],
  T_ReturnType,
> = (
  ...args: T_Parameters
) => MaybePromise<T_ReturnType>;
