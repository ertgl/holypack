import { maybeAwait } from "../promise/maybeAwait";

import type { ErrorProneFunction } from "./ErrorProneFunction";

export async function suppressErrorMaybeAsync<
  T = unknown,
  T_Function extends ErrorProneFunction<any, T> = ErrorProneFunction<any, T>,
  T_Parameters extends Parameters<T_Function> = Parameters<T_Function>,
  T_ReturnType = Awaited<ReturnType<T_Function>> | undefined,
>(
  f: T_Function,
  ...args: NoInfer<T_Parameters>
): Promise<T_ReturnType>
{
  try
  {
    return await maybeAwait(f(...args)) as T_ReturnType;
  }
  catch
  {
    return undefined as T_ReturnType;
  }
}
