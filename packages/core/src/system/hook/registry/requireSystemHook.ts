import type { Context } from "../../../context/Context";
import { requireHook } from "../../../hook/registry/requireHook";
import type { SystemHooks } from "../SystemHooks";

export function requireSystemHook<
  T_HookUID extends keyof SystemHooks = keyof SystemHooks,
  T_ReturnType extends SystemHooks[T_HookUID] = SystemHooks[T_HookUID],
>(
  context: Context,
  hookUID: T_HookUID,
): T_ReturnType
{
  return requireHook<T_ReturnType>(
    context,
    hookUID,
  );
}
