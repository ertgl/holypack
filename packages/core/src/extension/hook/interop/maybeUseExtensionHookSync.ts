import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { UseHookCallbackSync } from "../../../hook/interop/UseHookCallbackSync";
import type { UseHookFallbackSync } from "../../../hook/interop/UseHookFallbackSync";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Optional } from "../../../lib/object/Optional";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

export function maybeUseExtensionHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Callback extends UseHookCallbackSync<T_Hook> = UseHookCallbackSync<T_Hook>,
  T_Fallback extends UseHookFallbackSync = UseHookFallbackSync,
  T_ReturnType extends ReturnType<T_Callback> | ReturnType<T_Fallback> | undefined = ReturnType<T_Callback> | ReturnType<T_Fallback> | undefined,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
  fallback?: Optional<UseHookFallbackSync>,
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

  else if (fallback != null)
  {
    return fallback() as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
