import type { AnyHookAsync } from "../AnyHookAsync";

export type UseHookCallbackAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
> = (
  hook: T_Hook,
) => Promise<unknown>;
