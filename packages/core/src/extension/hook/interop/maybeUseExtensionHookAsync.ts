import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { UseHookCallbackMaybeAsync } from "../../../hook/interop/UseHookCallbackMaybeAsync";
import type { HookUID } from "../../../hook/uid/HookUID";
import { maybeAwait } from "../../../lib/promise/maybeAwait";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

export async function maybeUseExtensionHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Callback extends UseHookCallbackMaybeAsync<T_Hook> = UseHookCallbackMaybeAsync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
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

  return undefined as T_ReturnType;
}
