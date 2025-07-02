import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { UseHookCallbackMaybeAsync } from "../../../hook/interop/UseHookCallbackMaybeAsync";
import type { HookUID } from "../../../hook/uid/HookUID";
import { maybeAwait } from "../../../lib/promise/maybeAwait";
import type { Extension } from "../../Extension";
import { requireExtensionHook } from "../registry/requireExtensionHook";

export async function useExtensionHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Callback extends UseHookCallbackMaybeAsync<T_Hook> = UseHookCallbackMaybeAsync<T_Hook>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> = Awaited<ReturnType<T_Callback>>,
>(
  extension: Extension,
  hookUID: HookUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const hook = requireExtensionHook<T_Hook>(
    extension,
    hookUID,
  );

  return await maybeAwait(callback(hook)) as T_ReturnType;
}
