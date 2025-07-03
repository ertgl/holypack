import type { ContextSync } from "../../../context/ContextSync";
import { maybeUseExtensionSync } from "../../../extension/interop/maybeUseExtensionSync";
import type { UseExtensionCallbackSync } from "../../../extension/interop/UseExtensionCallbackSync";
import type { SystemExtensions } from "../SystemExtensions";
import type { SystemExtensionUID } from "../uid/SystemExtensionUID";

export function maybeUseSystemExtensionSync<
  T_ExtensionUID extends SystemExtensionUID = SystemExtensionUID,
  T_Callback extends UseExtensionCallbackSync<SystemExtensions[T_ExtensionUID]> = UseExtensionCallbackSync<SystemExtensions[T_ExtensionUID]>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextSync,
  extensionUID: T_ExtensionUID,
  callback: T_Callback,
): T_ReturnType
{
  return maybeUseExtensionSync<
    T_Callback,
    T_ReturnType
  >(
    context,
    extensionUID,
    callback,
  );
}
