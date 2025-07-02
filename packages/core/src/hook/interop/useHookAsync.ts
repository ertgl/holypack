import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { AnyHookAsync } from "../AnyHookAsync";
import { requireHook } from "../registry/requireHook";
import type { HookUID } from "../uid/HookUID";

import type { UseHookCallbackMaybeAsync } from "./UseHookCallbackMaybeAsync";

export async function useHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Callback extends UseHookCallbackMaybeAsync<T_Hook> = UseHookCallbackMaybeAsync<T_Hook>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> = Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  hookUID: HookUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const hook = requireHook<T_Hook>(
    context,
    hookUID,
  );

  return await maybeAwait(callback(hook)) as T_ReturnType;
}
