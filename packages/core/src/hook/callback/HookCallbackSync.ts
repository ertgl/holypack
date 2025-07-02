import type { AnyHookSync } from "../AnyHookSync";

export type HookCallbackSync<
  T_Hook extends AnyHookSync,
> = Parameters<T_Hook["tap"]>[1];
