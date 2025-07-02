import type { ContextSync } from "../../context/ContextSync";
import type { AnyHookSync } from "../AnyHookSync";
import { getHook } from "../registry/getHook";
import type { HookUID } from "../uid/HookUID";

import type { UseHookCallbackSync } from "./UseHookCallbackSync";

export function maybeUseHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Callback extends UseHookCallbackSync<T_Hook> = UseHookCallbackSync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextSync,
  hookUID: HookUID,
  callback: T_Callback,
): T_ReturnType
{
  const hook = getHook<T_Hook>(
    context,
    hookUID,
  );

  if (hook != null)
  {
    return callback(hook) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
