import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { HookCallbackMaybeAsync } from "../../../hook/callback/HookCallbackMaybeAsync";
import type { ExtensionMaybeAsync } from "../../ExtensionMaybeAsync";

export type ExtensionMethodNameForHookCallbackAsync<
  T_Extension extends ExtensionMaybeAsync = ExtensionMaybeAsync,
  T_Hook extends AnyHookAsync = AnyHookAsync,
> = {
  [K in keyof T_Extension]: (
    HookCallbackMaybeAsync<T_Hook> extends T_Extension[K]
      ? K
      : never
  )
}[keyof T_Extension];
