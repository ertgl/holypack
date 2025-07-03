import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { UseHookCallbackSync } from "../../../hook/interop/UseHookCallbackSync";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

export function maybeUseExtensionHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Callback extends UseHookCallbackSync<T_Hook> = UseHookCallbackSync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
): T_ReturnType
{
  const hook = getExtensionHook<T_Hook>(
    extension,
    hookUID,
  );

  if (hook != null)
  {
    return callback(hook) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
