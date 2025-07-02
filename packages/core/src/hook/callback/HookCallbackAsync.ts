import type { AnyHookAsync } from "../AnyHookAsync";

export type HookCallbackAsync<
  T_Hook extends AnyHookAsync,
> = Parameters<T_Hook["tapPromise"]>[1];
