import type { ContextSync } from "../../../context/ContextSync";
import type { UseHookCallbackSync } from "../../../hook/interop/UseHookCallbackSync";
import { useHookSync } from "../../../hook/interop/useHookSync";
import type { SystemHooksSync } from "../SystemHooksSync";
import type { SystemHookUIDSync } from "../uid/SystemHookUIDSync";

export function useSystemHookSync<
  T_HookUID extends SystemHookUIDSync = SystemHookUIDSync,
  T_Callback extends UseHookCallbackSync<SystemHooksSync[T_HookUID]> = UseHookCallbackSync<SystemHooksSync[T_HookUID]>,
  T_ReturnType extends ReturnType<T_Callback> = ReturnType<T_Callback>,
>(
  context: ContextSync,
  hookUID: T_HookUID,
  callback: UseHookCallbackSync<SystemHooksSync[T_HookUID]>,
): T_ReturnType
{
  return useHookSync(
    context,
    hookUID,
    callback,
  );
}
