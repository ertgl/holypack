import type { Context } from "../../../context/Context";
import { requireExtension } from "../../../extension/registry/requireExtension";
import type { SystemExtensions } from "../SystemExtensions";

export function requireSystemExtension<
  T_ExtensionUID extends keyof SystemExtensions = keyof SystemExtensions,
  T_ReturnType extends SystemExtensions[T_ExtensionUID] = SystemExtensions[T_ExtensionUID],
>(
  context: Context,
  extensionUID: T_ExtensionUID,
): T_ReturnType
{
  return requireExtension<T_ReturnType>(
    context,
    extensionUID,
  );
}
