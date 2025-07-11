import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { UseHookCallbackMaybeAsync } from "../../../hook/interop/UseHookCallbackMaybeAsync";
import type { UseHookFallbackMaybeAsync } from "../../../hook/interop/UseHookFallbackMaybeAsync";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Optional } from "../../../lib/object/Optional";
import { maybeAwait } from "../../../lib/promise/maybeAwait";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

export async function maybeUseExtensionHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Callback extends UseHookCallbackMaybeAsync<T_Hook> = UseHookCallbackMaybeAsync<T_Hook>,
  T_Fallback extends UseHookFallbackMaybeAsync = UseHookFallbackMaybeAsync,
  T_ReturnType extends ReturnType<T_Callback> | ReturnType<T_Fallback> | undefined = ReturnType<T_Callback> | ReturnType<T_Fallback> | undefined,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
  fallback?: Optional<T_Fallback>,
): Promise<T_ReturnType>
{
  const hook = getExtensionHook<T_Hook>(
    extension,
    hookUID,
  );

  if (hook != null)
  {
    return await maybeAwait(callback(hook)) as T_ReturnType;
  }

  else if (fallback != null)
  {
    return await maybeAwait(fallback()) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
