import type { ContextSync } from "../../../context/ContextSync";
import { maybeUseHookSync } from "../../../hook/interop/maybeUseHookSync";
import type { UseHookCallbackSync } from "../../../hook/interop/UseHookCallbackSync";
import type { SystemHooksSync } from "../SystemHooksSync";
import type { SystemHookUIDSync } from "../uid/SystemHookUIDSync";

export function maybeUseSystemHookSync<
  T_HookUID extends SystemHookUIDSync = SystemHookUIDSync,
  T_Callback extends UseHookCallbackSync<SystemHooksSync[T_HookUID]> = UseHookCallbackSync<SystemHooksSync[T_HookUID]>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextSync,
  hookUID: T_HookUID,
  callback: T_Callback,
): T_ReturnType
{
  return maybeUseHookSync(
    context,
    hookUID,
    callback,
  );
}
