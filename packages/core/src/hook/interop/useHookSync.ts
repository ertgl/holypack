import type { ContextSync } from "../../context/ContextSync";
import type { AnyHookSync } from "../AnyHookSync";
import { requireHook } from "../registry/requireHook";
import type { HookUID } from "../uid/HookUID";

import type { UseHookCallbackSync } from "./UseHookCallbackSync";

export function useHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Callback extends UseHookCallbackSync<T_Hook> = UseHookCallbackSync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> = ReturnType<T_Callback>,
>(
  context: ContextSync,
  hookUID: HookUID,
  callback: T_Callback,
): T_ReturnType
{
  const hook = requireHook<T_Hook>(
    context,
    hookUID,
  );

  return callback(hook) as T_ReturnType;
}
