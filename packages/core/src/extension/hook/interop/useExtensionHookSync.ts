import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { UseHookCallbackSync } from "../../../hook/interop/UseHookCallbackSync";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Extension } from "../../Extension";
import { requireExtensionHook } from "../registry/requireExtensionHook";

export function useExtensionHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Callback extends UseHookCallbackSync<T_Hook> = UseHookCallbackSync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> = ReturnType<T_Callback>,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
): T_ReturnType
{
  const hook = requireExtensionHook<T_Hook>(
    extension,
    hookUID,
  );

  return callback(hook) as T_ReturnType;
}
