import type { AnyHookSync } from "../AnyHookSync";

export type UseHookCallbackSync<
  T_Hook extends AnyHookSync = AnyHookSync,
> = (
  hook: T_Hook,
) => unknown;
