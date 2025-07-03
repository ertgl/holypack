import { maybeAwait } from "../promise/maybeAwait";
import type { MaybePromise } from "../promise/MaybePromise";

export async function suppressErrorMaybeAsync<
  T = unknown,
  F extends ((...args: any) => MaybePromise<T>) = ((...args: any) => MaybePromise<T>),
  T_ReturnType = ReturnType<F> | undefined,
>(
  f: F,
  ...args: NoInfer<Parameters<F>>
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
