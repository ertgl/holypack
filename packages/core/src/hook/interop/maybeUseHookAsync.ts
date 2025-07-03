import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { AnyHookAsync } from "../AnyHookAsync";
import { getHook } from "../registry/getHook";
import type { HookUID } from "../uid/HookUID";

import type { UseHookCallbackMaybeAsync } from "./UseHookCallbackMaybeAsync";

export async function maybeUseHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Callback extends UseHookCallbackMaybeAsync<T_Hook> = UseHookCallbackMaybeAsync<T_Hook>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextAsync,
  hookUID: HookUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const hook = getHook<T_Hook>(
    context,
    hookUID,
  );

  if (hook != null)
  {
    return await maybeAwait(callback(hook)) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
