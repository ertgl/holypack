import type { ContextAsync } from "../../../context/ContextAsync";
import { maybeUseHookAsync } from "../../../hook/interop/maybeUseHookAsync";
import type { UseHookCallbackAsync } from "../../../hook/interop/UseHookCallbackAsync";
import type { SystemHooksAsync } from "../SystemHooksAsync";
import type { SystemHookUIDAsync } from "../uid/SystemHookUIDAsync";

export async function maybeUseSystemHookAsync<
  T_HookUID extends SystemHookUIDAsync = SystemHookUIDAsync,
  T_Callback extends UseHookCallbackAsync<SystemHooksAsync[T_HookUID]> = UseHookCallbackAsync<SystemHooksAsync[T_HookUID]>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextAsync,
  hookUID: T_HookUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  return await maybeUseHookAsync(
    context,
    hookUID,
    callback,
  ) as T_ReturnType;
}
