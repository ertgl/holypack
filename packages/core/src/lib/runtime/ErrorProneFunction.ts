import type { ErrorProneFunctionAsync } from "./ErrorProneFunctionAsync";
import type { ErrorProneFunctionSync } from "./ErrorProneFunctionSync";

export type ErrorProneFunction<
  T_Parameters extends any[],
  T_ReturnType,
> = (
  | ErrorProneFunctionAsync<T_Parameters, T_ReturnType>
  | ErrorProneFunctionSync<T_Parameters, T_ReturnType>
);
