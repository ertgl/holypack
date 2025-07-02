import type { AnyHook } from "../AnyHook";

export type HookCallbackParameters<
  T_Hook extends AnyHook,
> = Parameters<T_Hook["promise"]>;
