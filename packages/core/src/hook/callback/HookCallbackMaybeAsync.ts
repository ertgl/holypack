import type { AnyHookAsync } from "../AnyHookAsync";

export type HookCallbackMaybeAsync<
  T_Hook extends AnyHookAsync,
> = (
  | Parameters<T_Hook["tap"]>[1]
  | Parameters<T_Hook["tapPromise"]>[1]
);
