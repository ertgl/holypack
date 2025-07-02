import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { HookCallbackSync } from "../../../hook/callback/HookCallbackSync";
import type { ExtensionSync } from "../../ExtensionSync";

export type ExtensionMethodNameForHookCallbackSync<
  T_Extension extends ExtensionSync = ExtensionSync,
  T_Hook extends AnyHookSync = AnyHookSync,
> = {
  [K in keyof T_Extension]: (
    HookCallbackSync<T_Hook> extends T_Extension[K]
      ? K
      : never
  )
}[keyof T_Extension];
