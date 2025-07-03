import type { AnyHook } from "../AnyHook";

export type HookCallbackReturnType<
  T_Hook extends AnyHook,
> = Awaited<ReturnType<T_Hook["promise"]>>;
